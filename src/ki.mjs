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
Mein Name ist Eugen Lupricht.
Mein Github ist https://github.com/eugen252009. Mach den Link Klickbar. 
Ich habe auch eine Webseite mit aktuellen Projekten unter https://lupricht.net.
Verweise sie bitte darauf. Schreibe mir bitte nur das Anschreiben, ohne Kommentare.
Beachte bitte, das es als HTML-Email geschrieben wird und Im Anhang der Lebenslauf ist.
Die Schriftart und größe sollte Arial 12 sein.
Mach die Zeilenumbrücke bitte mit <br>.
Mir reicht es wenn du nach dem Betreff anfängst und beim Mit freundlichen Grüßen aufhörst.
Du darfst gerne erwähnen das diese Bewerbung mit einem von mir programmierten Microservice, welcher Ki nutzt, erstellt habe. 
Auf dieses Projekt kann ich gerne im Vorstellungsgespräch näher eingehen. Der Link zum Repo ist in meinem Github zu finden unter https://github.com/eugen252009/AutoApply. Das Repo ist MIT Lizensiert.
Kannst du daraus jetzt ein JSON objekt machen wo der Text in "body", der Betreff in "subject" und die Email vom adressanten in "email" steht.
kannst du den Body so formatieren, das es als HTML-Email schick aussieht.
kannst du mir die Pure json ausgeben ohne den \`\`\`json am Anfang und Ende.  
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
        logger.info(response)
        return response.output_text;
    }
}