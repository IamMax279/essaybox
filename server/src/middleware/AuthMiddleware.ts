import type { NextFunction, Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated() && req.user) {
        return next()
    }

    console.log('UNAUTHORIZED')
    res.status(401).json({
        success: false,
        message: "Unauthorized"
    })
}