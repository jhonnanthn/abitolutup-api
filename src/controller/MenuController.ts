import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Menu from "../model/menu";

export default {

    async getMenu(req: Request, res: Response) {

        const repo = getRepository(Menu);
        const produtos: Menu[] = await repo.find({
            order: {
                name: 'ASC',
                category: 'ASC',
                type: 'ASC'
            }
        });
        return res.json(produtos);

    },
}