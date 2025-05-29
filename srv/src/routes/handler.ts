import { Router } from "express";
import Game from "./GameStream";

const Handler = Router();

Handler.get('/', (req, res) => {
    res.send('Hello World!');
});
Handler.use('/game', Game);

export default Handler;