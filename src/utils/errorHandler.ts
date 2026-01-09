import { Request, Response, NextFunction } from "express";
import { apiError } from "./apiResponses";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  res.status(500).json(
    apiError(err.message || "Internal server error")
  );
}
