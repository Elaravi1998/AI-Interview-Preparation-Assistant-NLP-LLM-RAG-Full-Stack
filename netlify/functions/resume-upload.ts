import { Handler } from '@netlify/functions';
import { extractUserFromHeader } from './_shared/auth';
import { getCollection } from './_shared/mongodb';
import { buildResponse, handleOptions } from './_shared/response';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return buildResponse(405, { success: false, error: 'Method Not Allowed' });
  }

  const decoded = extractUserFromHeader(event.headers);
  const userId = decoded ? decoded.userId : 'guest-' + Date.now();

  try {
    const body = JSON.parse(event.body || '{}');
    const { text, filename, fileData } = body;

    let extractedText = text || '';

    // If base64 file data provided, extract printable ASCII/UTF8 strings safely
    if (fileData && !extractedText) {
      try {
        const buffer = Buffer.from(fileData.split(',')[1] || fileData, 'base64');
        const pdfString = buffer.toString('binary');
        // Simple regex fallback for PDF text streams if pdf-parse fails in serverless
        const matches = pdfString.match(/\(([^\(\)]+)\)\s*TJ|\(([^\(\)]+)\)\s*Tj/g);
        if (matches && matches.length > 0) {
          extractedText = matches.map(m => m.replace(/[\(\)\\\/]/g, '')).join(' ');
        } else {
          extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        }
      } catch (e) {
        console.warn("Base64 text extraction notice:", e);
      }
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return buildResponse(400, {
        success: false,
        error: 'Unable to extract text from file. Please ensure it is a valid PDF or paste raw text.'
      });
    }

    const resumesCol = await getCollection('resumes');
    const resumeDoc = {
      userId,
      filename: filename || 'resume.pdf',
      rawText: extractedText.trim(),
      uploadedAt: new Date().toISOString()
    };

    const res = await resumesCol.insertOne(resumeDoc);
    const resumeId = res.insertedId.toString();

    return buildResponse(200, {
      success: true,
      message: 'Resume text extracted successfully',
      data: {
        resumeId,
        rawText: extractedText.trim()
      }
    });
  } catch (err: any) {
    console.error("Resume Upload Error:", err);
    return buildResponse(500, { success: false, error: err.message || 'Resume upload failed' });
  }
};
