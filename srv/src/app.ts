import express from 'express';
import BodyParser from 'body-parser';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import Handler from './routes/handler';

config();
const app = express();

app.use(express.json());
app.use(BodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(Handler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});