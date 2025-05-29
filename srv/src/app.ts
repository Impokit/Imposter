import express from 'express';
import BodyParser from 'body-parser';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import Handler from './routes/handler';
import http from 'http'
import { handleSocketConnection } from './controllers/gameCont';
import { WebSocketServer } from 'ws';

config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(BodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

wss.on('connection', handleSocketConnection);
app.use(Handler);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});