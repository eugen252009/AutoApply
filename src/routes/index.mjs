import {createReadStream} from "node:fs"

export function indexRoute(req, res){
            createReadStream("index.html").pipe(res)
} 