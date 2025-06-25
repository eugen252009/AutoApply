import { createReadStream } from "node:fs"

export function indexRoute(req, res) {
    createReadStream("src/routes/index.html").pipe(res)
}