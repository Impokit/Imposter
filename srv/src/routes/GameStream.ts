import { Router } from "express";
import { CreateImposterGame } from "../controllers/gameCont";

const Game = Router();

Game.post('/create/imposter', CreateImposterGame);

export default Game;