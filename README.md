# 🎯 AI Interview Preparation Assistant

An AI-powered interview preparation platform combining **NLP, LLMs, RAG, semantic matching, and full-stack serverless development**.

Built with **React, TypeScript, Netlify Functions, MongoDB Atlas, and OpenRouter**.

---

## 🚀 Features

* 📄 **Resume NLP Analysis** — Extract skills, experience, projects, education, and technologies.
* 💼 **Job Description Analysis** — Extract required and preferred skills.
* 🎯 **Resume-JD Matching** — Calculate skill and semantic match percentage.
* 📊 **Skill Gap Analysis** — Identify strong, moderate, and missing skills.
* 📚 **7-Day Interview Plan** — Generate a personalized preparation curriculum.
* ❓ **AI Question Generator** — Generate resume and JD-based interview questions.
* 🎙️ **Voice Mock Interview** — Browser Speech-to-Text using Web Speech API.
* 🤖 **AI Answer Evaluation** — Evaluate technical accuracy, relevance, completeness, clarity, and communication.
* 📖 **RAG Study Assistant** — Retrieve technical knowledge and generate grounded answers.
* 📈 **Interview Analytics** — Track scores and interview readiness.

---

## 🧠 AI / NLP Pipeline

```text
Resume PDF
    ↓
Text Extraction
    ↓
NLP / Information Extraction
    ↓
Skill Extraction
    ↓
Job Description Analysis
    ↓
Semantic Matching
    ↓
Skill Gap Analysis
    ↓
LLM Question Generation
    ↓
Mock Interview
    ↓
NLP + LLM Answer Evaluation
    ↓
Interview Report
```

---

## 🏗️ Architecture

```text
                React + TypeScript
                       │
                       ▼
                    Netlify
                       │
              ┌────────┴────────┐
              ▼                 ▼
       React Frontend     Netlify Functions
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
              MongoDB Atlas            OpenRouter
                                            │
                                            ▼
                                           LLM
```

### Stack

| Layer          | Technology                |
| -------------- | ------------------------- |
| Frontend       | React + Vite + TypeScript |
| UI             | Tailwind CSS + Lucide     |
| Backend        | Netlify Functions         |
| Database       | MongoDB Atlas             |
| AI             | OpenRouter                |
| Authentication | JWT + bcryptjs            |
| RAG            | Serverless Retrieval      |
| Charts         | Recharts                  |
| Voice          | Web Speech API            |
| Deployment     | Netlify                   |

---

## ⚡ API Modules

```text
/api/auth-register
/api/auth-login
/api/auth-me
/api/resume-upload
/api/resume-analyze
/api/job-analyze
/api/resume-job-match
/api/skill-gap
/api/interview-plan
/api/questions-generate
/api/interview-start
/api/interview-answer
/api/answer-evaluate
/api/interview-complete
/api/interview-report
/api/study-assistant
```

---

## 🔐 Environment Variables

Create a `.env` file:

```env
OPENROUTER_API_KEY=sk-or-v1-your-api-key
OPENROUTER_MODEL=openai/gpt-4.1-mini

MONGODB_URI=your-mongodb-atlas-uri

JWT_SECRET=your-secure-secret
JWT_EXPIRE_MINUTES=1440
```

**Never expose `OPENROUTER_API_KEY` in React or `VITE_*` variables.**

The key is used only inside Netlify Functions.

---

## 💻 Local Setup

```bash
cd frontend
npm install
npm run dev
```

For complete local frontend + Netlify Functions testing, use the Netlify CLI workflow configured for the project.

---

## ☁️ Netlify Deployment

The project uses a **one-deployment architecture**:

```text
GitHub
   ↓
Netlify
   ↓
React + Netlify Functions
   ↓
MongoDB Atlas + OpenRouter
```

Configure:

```text
Base Directory: frontend
Build Command: npm run build
Publish Directory: dist
Functions Directory: ../backend/functions
```

Add the required environment variables in **Netlify Site Settings → Environment Variables**.

---

## 🎤 Interview Explanation

> **AI Interview Preparation Assistant is an end-to-end AI application combining NLP, LLMs, semantic matching, and RAG. It analyzes resumes and job descriptions, identifies skill gaps, generates personalized interview questions, evaluates candidate answers, and provides interview readiness analytics. The frontend uses React and TypeScript, while Netlify Functions provide the serverless backend, MongoDB Atlas stores application data, and OpenRouter provides LLM capabilities.**

---

## 🏷️ Technologies

`NLP` `LLM` `RAG` `Generative AI` `Embeddings` `Semantic Search` `React` `TypeScript` `Netlify` `MongoDB` `OpenRouter` `Serverless` `AI Interview`

---

## 📌 Project Category

**AI + NLP + LLM + RAG + Full-Stack Serverless Application**

---
