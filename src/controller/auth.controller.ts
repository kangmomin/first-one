import { Controller, Get, Post, Req, Res, Body, Render } from '@nestjs/common';
import { Request, Response } from 'express';
import * as process from "process";

@Controller('auth')
export class AuthController {
    @Get()
    @Render("auth/password")
    getAuthPage(@Res() res: Response) {
        return {}
    }

    @Post()
    login(@Req() req: Request, @Res() res: Response, @Body() body: { password: string }) {

        if (body.password === process.env.SECRET_PASSWORD) {
            // @ts-ignore
            req.session.auth = true;
            return res.redirect('/product/list');
        }

        res.redirect('/auth');
    }
}
