import { createReadStream } from "node:fs";
import { ki, logger, mailer } from "../index.mjs";
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
    logger.log("Sending to GPT")
    const response = await ki.ASKKI(text);
    let test;
    res.write("parsing from GPT\n");
    logger.log("parsing from GPT")
    try {
        test = JSON.parse(response)
    } catch (error) {
        res.end(error)
        return
    }
    res.write("finalizing response\n");
    logger.log("finalizing response")
    const file = writeFile(`responses/response-${Date.now()}.json`, response)
    res.write("sending Email\n");
    logger.log("sending Email")
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
    logger.log("file written")
    await msg;
    res.write("Email sent\n");
    logger.log("Email sent")
    res.end(response)
}