import { Request, Response } from 'express';
import { getRepository, Not } from 'typeorm';
import * as Yup from 'yup'
import Product from '../model/product';
import { whereConditional } from '../utils/Formatter';

export default {

    async create(req: Request, res: Response) {

        const {
            name,
            author,
            description,
            isbn,
            image_url,
            price,
            publication_date
        } = req.body;

        const data = {
            name,
            author,
            description,
            isbn,
            image_url,
            price: parseFloat(price),
            publication_date
        }


        const schema = Yup.object().shape({
            name: Yup.string().required(),
            author: Yup.string().required(),
            description: Yup.string().required(),
            isbn: Yup.string().required(),
            image_url: Yup.string().required(),
            price: Yup.number().required(),
            publication_date: Yup.date().required()
        });

        await schema.validate(data, {abortEarly: false});

        // const repo = getRepository(Book);
        // const book = repo.create(data);
        // await repo.save(book);

        // return res.status(201).json(book);
    },

    async getProducts(req: Request, res: Response) {

        let where = "";
        const { category, type, page} = req.query;

        const repo = getRepository(Product);

        if (category || type)
            where = whereConditional({
                category,
                type,
            }, 'AND', 'menu');

        if (page) {
            if (page == 'sale')
                where = whereConditional({
                    isSale: 1
                }, 'AND', 'product');
        }

        console.log("=>" + where);
        const produtos: Product[] = await repo.createQueryBuilder('product')
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.menu', 'menu')
        .leftJoinAndSelect('product.size', 'size')
        .orWhere(where)
        .orderBy({
            'product.isSale': 'DESC',
            'product.isNew': 'DESC',
            'images.ordenation': 'DESC',
            'product.name': 'DESC'
        })
        .getMany();


        return res.json(produtos);
    },

    async getProductById(req: Request, res: Response) {

        const { id } = req.params;
        const repo = getRepository(Product);
        const produtos: Product | undefined = await repo.findOne({
                where: {
                    'id': id
                },
                relations: ['images', 'menu', 'size']
            }
        );
        return res.json(produtos);
    },

    async getProduto(req: Request, res: Response) {
        const { sku } = req.params;

        const repo = getRepository(Product);
        const produto: Product = await repo.findOneOrFail(sku,{
            relations: ['preco_produto'],
            order: {
                name: 'ASC',
            },
        });
        return res.json(produto);
    },

    async getVendedorPontos(req: Request, res: Response) {
        const { cpf } = req.params;
/*
        const repo = getRepository(Vendedor_Pontos);
        const vendedorPontos: Vendedor_Pontos[] = await repo.find({
            
            relations: ['fornecedor'],

            where: {
                vendedor: {
                    cpf: cpf
                }
            },
        });

        return res.json(vendedorPontos)*/
    },
    async getVendedoresDental(req: Request, res: Response) {
        const { cnpj } = req.params;
        /*
        var query = `
        SELECT 
            v.cpf,
            v.nome,
            v.nascimento,
            v.email,
            v.telefone,
            v.last_login
        FROM usuario v
        LEFT JOIN vendedor_dental vd on vd.vendedor = v.cpf
        WHERE vd.dental = '${cnpj}'
        ORDER BY v.nome`;
        
        try {
            getManager().query(query).then( (vendedores: Usuario[]) => {
                return res.json(vendedores);
            });
        } catch (e) {
            console.log(e)
        }*/
    },

    async getRecibosSemanaAtiva(req: Request, res: Response) {

        const { cpf } = req.params;
/*
        const repo = getRepository(Recibo);

        const recibos: Recibo[] = await repo.createQueryBuilder('recibo')
            .leftJoinAndSelect('recibo.produtos_recibo', 'produto_recibo')
            .leftJoinAndSelect('recibo.recibo_rejeitados', 'recibo_rejeitado')
            .leftJoinAndSelect('recibo_rejeitado.motivo_rejeitado', 'motivo_rejeitado')
            .where('(recibo.status IN ('registrado', 'em análise', 'rejeitado', 'atualizado') OR (recibo.status = 'excluído' AND recibo.updated_at > CURDATE() - INTERVAL 7 DAY)) AND produto_recibo.vendedor = :cpf AND recibo.documento_data >= '2020-12-01' AND recibo.documento_data < curdate() - INTERVAL DAYOFWEEK(curdate())-2 DAY')
            .orderBy('recibo.documento_data', 'DESC')
            .setParameters({ cpf: cpf })
            .getMany();

        return res.json(recibos);*/
    },

    async uploadReciboDocumento(req: Request, res: Response) {
/*
        const {id} = req.body;
        const reciboRepo = getRepository(Recibo);
        const recibo: Recibo = await reciboRepo.findOneOrFail(id); 

        const teste =  req.file.filename || '';


        // multer desatualizado, espera path mas correto é location. utilizando workaround no documento_url, montando url de acordo c .env, enquanto não é resolvido
        // recibo.documento_url = req.file.location
        recibo.documento_url= `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.file.filename}`;
        await reciboRepo.save(recibo)

        res.json(recibo);
*/
    },
}