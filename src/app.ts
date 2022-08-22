import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import PeerServer from './services/PeerServer';
import SocketServer from './services/SocketServer';
import Shutdown from './services/Shutdown';
import Router from './services/Router';
import 'dotenv/config';

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ['*', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
};
const AppHost = process.env.APP_HOST;
const AppUrl = `https://${AppHost}`;
if (AppHost) corsOptions.origin.push(AppUrl);

app.use(cors(corsOptions));
app.use(bodyParser.json());

new Router(app).initialize();
new PeerServer(server, app).attach();
new SocketServer(server).attach();
new Shutdown().initGracefull();

server.listen(process.env.PORT);
