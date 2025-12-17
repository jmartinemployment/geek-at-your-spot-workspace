import { Request, Response, NextFunction } from 'express';
/**
 * Check API Key Authentication
 */
export declare const checkApiKey: (req: Request, res: Response, next: NextFunction) => void;
/**
 * IP Whitelist Check (for admin endpoints)
 */
export declare const checkIPWhitelist: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Request Logger Middleware
 */
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Error Handler Middleware
 */
export declare const errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void;
/**
 * Validate Request Body
 */
export declare const validateChatRequest: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=security.d.ts.map