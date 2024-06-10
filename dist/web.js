"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express_1 = require("express");
const hbs = require("hbs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const process = require("process");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 86400000 }
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine("hbs");
    app.use((0, express_1.json)({ limit: '50mb' }));
    hbs.registerHelper("multiple", (index, value) => {
        return (index * value).toLocaleString();
    });
    hbs.registerHelper("locale", (index) => {
        return index.toLocaleString();
    });
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=web.js.map