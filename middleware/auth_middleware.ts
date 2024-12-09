import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

// Extend Express Request interface to include user property
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    // Verify the token and attach the payload to req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded; // Attach the decoded user information to the request object

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
