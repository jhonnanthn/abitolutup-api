import { Request, Response } from "express";

export default {

    async getAppInfo(req: Request, res: Response) {

        return res.json({
            app: "sd-backend",
            environment: process.env.NODE_ENV,
            port: process.env.NODE_PORT,
            database: process.env.DATABASE_SD_HOST

        })

    }

}