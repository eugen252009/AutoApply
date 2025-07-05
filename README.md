# AutoApply

## Übersicht

**AutoApply** ist ein innovativer Microservice, der den Bewerbungsprozess durch den Einsatz künstlicher Intelligenz automatisiert. Unser Ziel ist es, Jobsuchenden wertvolle Zeit und Energie zu sparen, indem wir das Erstellen, Versenden und Verwalten von Bewerbungen so mühelos wie möglich gestalten. Derzeit liegt der Fokus auf der Generierung und dem Versand von E-Mails, wobei eine spätere Weboberfläche geplant ist, die den gesamten Prozess noch intuitiver macht.

---

## Funktionen

* **KI-gestützte E-Mail-Generierung**: Nutzt die **OpenAI GPT-4.0 API**, um basierend auf relevanten Informationen und der Jobbeschreibung professionelle Bewerbungs-E-Mails zu erstellen.
* **Anpassbarer E-Mail-Versand**: Ermöglicht den Versand der generierten E-Mails an beliebige Empfänger.
* **Flexible Protokollierung**: Bietet zwei Protokollierungsoptionen:
    * **DbLogger**: Protokolliert Ereignisse und Informationen in einer **PostgreSQL**-Datenbank.
    * **ConsoleLogger**: Schreibt Protokolle direkt in die Konsole.
* **Erweiterbarkeit**: Die modulare Architektur ist in Klassen gekapselt, was die Erweiterung und Wartung erleichtert.

---

## Technologie-Stack

AutoApply ist als **Microservice** konzipiert und basiert auf folgenden Technologien:

* **Programmiersprache**: Node.js
* **Web Framework**: Express.js
* **Frontend-Styling**: [TailwindCSS](https://tailwindcss.com/) (für die geplante Weboberfläche)
* **KI/ML API**: [OpenAI API](https://platform.openai.com/docs/api-reference) (mit [GPT-4.0](https://openai.com/gpt-4/))
* **Datenbank**: PostgreSQL (für den DbLogger)
* **Laufzeitumgebungen**: [Bun](https://bun.sh/), [Node.js](https://nodejs.org/), [Deno](https://deno.com/)
* **Paketmanager**: [Bun](https://bun.sh/) (empfohlen für die Installation der Abhängigkeiten)
* **Kommunikation**: REST-API mit `POST` Anfragen und `application/json`

---

## Installation und Einrichtung

### Voraussetzungen

Stelle sicher, dass eine der folgenden Laufzeitumgebungen installiert ist:

* **Bun** (empfohlen)
* **Node.js**
* **Deno**

### Lokale Entwicklung

1.  **Repository klonen**:
    ```bash
    git clone https://github.com/eugen252009/AutoApply.git
    cd AutoApply
    ```
2.  **Umgebungsvariablen konfigurieren**:
    Fülle die `Example.env`-Datei im Root-Verzeichnis des Projekts aus und nenne diese dann `.env`.
    Diese Datei muss die notwendigen Umgebungsvariablen enthalten, insbesondere deinen **OpenAI API Key** und die Datenbank-Verbindungsdaten, falls du den `DbLogger` nutzen möchtest.
    Standardmäßig ist Google als Email-Provider eingetragen.
    ```
    # Beispiel-Inhalt für .env
    OPENAI_API_KEY="sk-..."

    EMAIL_USERNAME="USERNAME"
    EMAIL_PASSWORD="Password"
    ```
4.  **Abhängigkeiten installieren**:
    Navigiere ins Projektverzeichnis und installiere die Abhängigkeiten mit Bun:
    ```bash
    bun i
    ```
    Alternativ mit npm/yarn:
    ```bash
    npm install
    # oder
    yarn install
    ```

---

## Nutzung

Nachdem du den Server gestartet hast, ist die API unter `localhost:8080` (oder dem in `.env` konfigurierten Port) erreichbar.

1.  **Server starten**:
    ```bash
    bun run src/main.mjs
    ```
    Alternativ mit Node.js:
    ```bash
    node src/main.mjs
    ```
2.  **E-Mail generieren und versenden**:
    Sende eine `POST`-Anfrage an den `/generate`-Endpunkt. Der Body der Anfrage sollte im `application/json`-Format sein und die notwendigen Informationen für die E-Mail-Generierung enthalten.
    **Beispiel mit `curl`**:
    ```bash
    curl -X POST \
      http://localhost:8080/generate \
      -H 'Content-Type: application/json' \
      -d '{
        "recipientEmail": "empfaenger@example.com",
        "jobTitle": "Software Developer",
        "companyName": "Tech Solutions GmbH",
        "yourName": "Max Mustermann",
        "yourSkills": ["JavaScript", "Node.js", "React"],
        "coverLetterPrompt": "Ich bin begeistert von Ihrer Stellenausschreibung..."
      }'
    ```
    Nach erfolgreicher Anfrage wird eine E-Mail mit dem generierten Inhalt an die angegebene `recipientEmail` gesendet.

---

## Roadmap

Dies ist unsere Vision für die zukünftige Entwicklung von AutoApply:

### Phase 1: Aktueller Stand & E-Mail-Automatisierung (Erreicht)

* **KI-gestützte E-Mail-Generierung**: Vollständige Integration der OpenAI GPT-4.0 API zur Erstellung maßgeschneiderter Bewerbungs-E-Mails.
* **Flexible Protokollierung**: Implementierung von DbLogger (PostgreSQL) und ConsoleLogger.
* **Robuster API-Endpunkt**: Bereitstellung des `/generate`-Endpunkts für E-Mail-Anfragen.

### Phase 2: Web-Oberfläche & Benutzererfahrung

* **Grundlegende UI-Entwicklung**: Erstellung einer intuitiven Web-Oberfläche mit TailwindCSS für die Eingabe von Bewerbungsdaten und die Steuerung des Prozesses.
* **Formularbasierte Eingabe**: Einfache Formulare zur Erfassung von Nutzerprofilinformationen, Jobdetails und Präferenzen.
* **Visueller E-Mail-Editor**: Vorschau und manuelle Anpassung der generierten E-Mails vor dem Versand.
* **Bewerbungsverfolgung (Basis)**: Eine einfache Übersicht der versendeten Bewerbungen.

### Phase 3: Erweiterte Funktionen & Optimierung

* **Lebenslauf- und Anschreiben-Generierung**: Erweiterung der KI-Fähigkeiten zur automatischen Erstellung vollständiger Bewerbungsunterlagen.
* **Verbesserte Fehlerbehandlung & Monitoring**: Ausbau der Protokollierung und Hinzufügen von Monitoring-Tools zur besseren Überwachung der Anwendung.

---

## Mitwirken

Wir freuen uns sehr über Beiträge zur Verbesserung von AutoApply! Wenn du mitwirken möchtest, schau bitte unter [`src/main.mjs`](https://github.com/eugen252009/AutoApply/blob/main/src/main.mjs). Der Code ist modular und in Klassen gekapselt, um den Einstieg zu erleichtern. Du kannst Issues erstellen, Pull Requests einreichen oder dich direkt an das Repository wenden.

---

## Lizenz

Dieses Projekt ist unter der **MIT-Lizenz** lizenziert. Weitere Details findest du in der [LICENSE](https://github.com/eugen252009/AutoApply/blob/main/LICENSE) Datei in unserem GitHub-Repository.
