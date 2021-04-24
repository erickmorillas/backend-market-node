import { request, Request, Response, Router } from 'express';
import Auth from "../../auth/index";
import { success, error } from "../../network/response";
import Controller from "./product.controller"

const router = Router();

router.route('/').get(Auth.TokenValidation, (req: Request, res: Response) => {
    Controller.getProduct()
        .then((product) => {
            success(req, res, product, 200)
        })
        .catch((e) => {
            error(req, res, e.sqlMessage, 400, e);
        });
});

router.route('/:productId').get(Auth.TokenValidation, (req: Request, res: Response) => {
    Controller.getProductId(req.params.productId)
        .then((product) => {
            success(req, res, product, 200)
        })
        .catch((e) => {
            error(req, res, "Not Product found", 404, e);
        });
});

router.route('/').post(Auth.TokenValidation, (req: Request, res: Response) => {
    Controller.createProduct(req.body)
        .then((product) => {
            success(req, res, product, 200)
        })
        .catch((e) => {
            console.log(e);
            error(req, res, e.sqlMessage, 400, e);
        });
});

router.route('/:productId').put(Auth.TokenValidation, (req: Request, res: Response) => {
    Controller.updateProduct(req.params.productId, req.body)
        .then((product) => {
            success(req, res, product, 200)
        })
        .catch((e) => {
            console.log(e);
            if (e.sqlMessage) {
                error(req, res, e.sqlMessage, 400, e);
            } else {
                error(req, res, "Not Product Id found", 404, e);
            }

        });
});

router.route('/:productId').delete(Auth.TokenValidation, (req: Request, res: Response) => {
    Controller.deleteProductId(req.params.productId)
        .then((product) => {
            success(req, res, product, 200)
        })
        .catch((e) => {
            console.log(e);
            error(req, res, e.sqlMessage, 400, e);
        });
});

export default router;