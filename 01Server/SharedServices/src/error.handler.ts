import { StatusCodes } from "http-status-codes";

export interface IErrorResponse {
  statusCode: number;
  message: string;
  comingFrom?: string;
  status?: string;
  serializedError?: IError;
}
export interface IError {
  message: string;
  statusCode: number;
  status?: string;
  comingFrom?: string;
}
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;
  comingFrom?: string;
    constructor(message: string, comingFrom?: string) {
    super(message);
    this.comingFrom = comingFrom;
  }
  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }
}
export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = "error";
  constructor(message: string, comingFrom?: string) {
    super(message, comingFrom);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = "error";
  constructor(message: string, comingFrom?: string) {
    super(message, comingFrom);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = "error";
  constructor(message: string, comingFrom?: string) {
    super(message, comingFrom);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
export class ForbiddenError extends CustomError {
  statusCode = StatusCodes.FORBIDDEN;       
  status = "error";
  constructor(message: string, comingFrom?: string) {
    super(message, comingFrom);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
export class FileTooLargeError extends CustomError {
  statusCode = StatusCodes.REQUEST_TOO_LONG;
  status = "error";
  constructor(message: string, comingFrom?: string) {
    super(message, comingFrom);
    Object.setPrototypeOf(this, FileTooLargeError.prototype);
  }
}
export class ServerError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  status = "error";
  constructor(message: string, comingFrom?: string) {
    super(message, comingFrom);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}