import { Logger } from "./logger.mjs"
export class ConsoleLogger extends Logger {
    constructor() { super() }
    log(...msg) { console.dir(...msg) }
    warn(...msg) { console.warn(...msg) }
    error(...msg) { console.error(...msg) }
    fatal(...msg) { console.trace(...msg) }
    info(...msg) { console.info(...msg) }
}