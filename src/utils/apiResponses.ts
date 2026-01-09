export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
}

export function apiResponse<T>(
  data: T | null,
  message = "OK",
  meta?: Record<string, unknown>
): ApiResponse<T> {
  return {
    status: "success",
    message,
    data,
    meta
  };
}

export function apiError(
  message: string,
  meta?: Record<string, unknown>
): ApiResponse<null> {
  return {
    status: "error",
    message,
    data: null,
    meta
  };
}
