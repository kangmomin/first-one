import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import * as process from "process";

@Controller('auth')
export class AuthController {
    @Get()
    getAuthPage(@Res() res: Response) {
        res.send('' +
            '<form method="post">' +
                '<label>' +
                    '<input type="password" name="password"/>' +
                    '<button type="submit">Login</button>' +
                '</label>'+
            '</form>');
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
