import postgres from "postgres"
import { Logger } from "./logger.mjs"

export class DBLOGGER extends Logger {
    constructor() {
        super()
        this.sql = postgres(process.env.DBCONN, {})
        console.log("Logger started.")
    }
    log(...msg) { this.sql`insert into logs (type,serviceid,text) values ('log',${process.env.SERVICEID},${JSON.stringify(msg)})`.execute() }
    error(...msg) { this.sql`insert into logs (type,serviceid,text) values ('error',${process.env.SERVICEID},${JSON.stringify(msg)})`.execute() }
    warn(...msg) { this.sql`insert into logs (type,serviceid,text) values ('warn',${process.env.SERVICEID},${JSON.stringify(msg)})`.execute() }
    info(...msg) { this.sql`insert into logs (type,serviceid,text) values ('info',${process.env.SERVICEID},${JSON.stringify(msg)})`.execute() }
    fatal(...msg) { this.sql`insert into logs (type,serviceid,text) values ('fatal',${process.env.SERVICEID},${JSON.stringify(msg)})`.execute() }
}