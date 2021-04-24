import { request, Request, Response, Router } from 'express';
import Auth from "../../auth/index";

import { success, error } from "../../network/response";
import Controller from "./user.controller"

const router = Router();

router.route('/').get(Auth.TokenValidation, (req: Request, res: Response) => {
    Controller.getUser_controller()
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((e) => {
            console.log(e);
            error(req, res, e.sqlMessage, 400, e);
        });
});

router.route('/register').post((req: Request, res: Response) => {
    Controller.register_controller(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((e) => {
            console.log(e);
            error(req, res, e.sqlMessage, 400, e);
        });
});

router.route('/login').post((req: Request, res: Response) => {
    Controller.login_controller(req.body.username, req.body.password)
        .then((token) => {
            console.log(token);

            success(req, res, token.message, token.status)
        })
        .catch((e) => {
            console.log(e);
            error(req, res, "Data invalid", 400, e);
        });
});

router.route('/:userId').get(Auth.TokenValidation, (req: Request, res: Response) => {
    Controller.getUserId_controller(req.params.userId)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch((e) => {
            console.log(e);
            error(req, res, e.sqlMessage, 400, e);
        });
});

router.route('/forgotPassword').post((req: Request, res: Response) => {
    Controller.forgotPassword_controller(req.body.email)
        .then((data) => {
            success(req, res, data.message, data.status)
        })
        .catch((err) => {
            console.log(err);
            error(req, res, err.message, err.status, err);
        });
});

router.route('/changePassword').post((req: Request, res: Response) => {
    console.log(req.body);

    Controller.changePassword_controller(req.body)
        .then((data) => {
            console.log(data);
            success(req, res, "Was changed successfully", 200)
        })
        .catch((err) => {
            console.log(err);
            error(req, res, "Could not change the password", 401, err);
        });
});




export default router;