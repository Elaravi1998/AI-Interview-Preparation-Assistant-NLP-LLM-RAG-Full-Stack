export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function buildResponse(statusCode: number, body: ApiResponse) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

export function handleOptions() {
  return buildResponse(200, { success: true, message: "CORS preflight OK" });
}
