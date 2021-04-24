export function success(req: any, res: any, message: any, status: any) {
    let statusCode = status || 200;
    res.status(statusCode).send({
        error: "",
        status: statusCode,
        body: message
    })
}

export function error(req: any, res: any, message: any, status: any, detail: any) {
    let statusCode = status || 400;
    res.status(statusCode).send({
        error: message,
        status: statusCode,
        body: "",
    });
}

