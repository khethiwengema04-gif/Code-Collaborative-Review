import { Request, Response, NextFunction } from "express";

export const authorize = (...allowedRoles: ("Reviewer" | "Submitter")[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission" });
        }

        return next();
    };
};
