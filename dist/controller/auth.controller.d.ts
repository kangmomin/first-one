/// <reference types="cookie-parser" />
import { Request, Response } from 'express';
export declare class AuthController {
    getAuthPage(res: Response): void;
    login(req: Request, res: Response, body: {
        password: string;
    }): void;
}
