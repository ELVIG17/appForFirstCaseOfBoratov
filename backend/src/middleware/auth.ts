import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'super-secret-key';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

export function jwtMiddleWare(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;

  if (token === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // ИСПРАВЛЕНО: используем userId как в JWT токене
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
