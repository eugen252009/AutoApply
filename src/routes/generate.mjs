import { readFileSync, createReadStream } from "node:fs";
import { ki, mailer } from "../index.mjs";
import { writeFile } from "node:fs/promises"

export function generate(req, res) {
    switch (req.method) {
        case "POST":
            post(req, res);
            break;
        default:
            get();
            break;
    }
    if (req.method == "POST") {
        post(req, res)
    }

}

function get() {
    res.end("not Supported!")
}

async function post(req, res) {
    const text = req.body?.text;
    if (text == undefined || text.length == 0) {
        res.statusCode = 400;
        res.end("No Data Send!");
        return
    }
    res.write("Sending to GPT\n");
    const response = await ki.ASKKI(text);
    let test;
    res.write("parsing from GPT\n");
    try {
        //Temporärer Fix
        test = JSON.parse(response)
    } catch (error) {
        console.error(error)
        test = JSON.parse(readFileSync("responses/response-1750790125751.json"))
    }
    res.write("finalizing response\n");
    const file = writeFile(`responses/response-${Date.now()}.json`, response)
    res.write("sending Email\n");
    const msg = mailer.send({
        to: "eu.lupricht@gmail.com",
        from: "eu.lupricht@gmail.com",
        subject: test.subject,
        html: test.body,
        text: test.body,
        attachments: [
            { filename: "Lebenslauf.pdf", content: createReadStream("files/lebenslauf.pdf") }
        ]
    })
    await file;
    res.write("file written\n");
    await msg;
    res.write("Email sent\n");
    res.end(response)
}