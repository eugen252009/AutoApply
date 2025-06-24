import { createReadStream } from "node:fs";


export function response(req, res) {
    res.set("Access-Control-Allow-Origin", "*")
    createReadStream("responses/response-1750790125751.json").pipe(res)
}