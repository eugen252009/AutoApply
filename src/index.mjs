import 'dotenv/config'
import { Mailer } from "./mail.mjs"
import { KI } from "./ki.mjs";
import { Server } from './server.mjs';


export const mailer = new Mailer();
export const ki = new KI();
const server= new Server()

server.start()