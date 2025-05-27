import { Router } from "express";

const Handler = Router();

Handler.get('/', (req, res) => {
    res.send('Hello World!');
});

export default Handler;