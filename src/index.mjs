import 'dotenv/config'
import { Mailer } from "./mail.mjs"
import { KI } from "./ki.mjs";
import { Server } from './server.mjs';
import Logger from "./logger/loggertypes.mjs"

export const mailer = new Mailer();
export const ki = new KI();
export const logger = new Logger.ConsoleLogger();
const server = new Server();

server.start()