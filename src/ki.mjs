import OpenAI from "openai";
import { logger } from "./index.mjs"

export class KI {
    constructor() {
        this._client = new OpenAI();
    }
    init() {
    }
    _append(input) {
        return (
            `Schreibe mir bitte ein Anschreiben für die Bewerbung.
Ich bin ein Quereinsteiger im Bereich IT, aber mit viel Berufserfahrung als Konstruktionsmechaniker. Jetzt möchte ich mich in der IT versuchen.
Ich bin vorwiegend in der Webentwicklung freizeittechnisch unterwegs. Programmiere aber auch in GO und lerne gerade C/C++.
Mein Github ist https://github.com/eugen252009. Mach den Link Klickbar. 
Ich habe auch eine Webseite mit aktuellen Projekten unter https://lupricht.net.
Verweise sie bitte darauf. Schreibe mir bitte nur das Anschreiben, ohne Kommentare.
Beachte bitte, das es als HTML-Email geschrieben wird und Im Anhang der Lebenslauf ist.
Die Schriftart und größe sollte Arial 12 sein.
Mach die Zeilenumbrücke bitte mit <br>.
Mir reicht es wenn du nach dem Betreff anfängst und beim Mit freundlichen Grüßen aufhörst.
Mein Name ist Eugen Lupricht.
Kannst du die Ticks am Anfang und Ende weglassen.
Kannst du daraus jetzt ein JSON objekt machen wo der Text in "body", der Betreff in "subject" und die Email vom adressanten in "email" steht.
Aktuell stimmt was mit dem Objekt nicht, es lässt sich nicht parsen.
Falls es keine Email gibt, trage bitte "eu.lupricht@gmail.com" ein.
---
${input}
--- ` )
    }

    async ASKKI(message) {
        const response = await this._client.responses.create({
            model: "gpt-4.1-nano",
            input: this._append(message),
        });
        logger.log(response)
        return response.output_text;
    }
}