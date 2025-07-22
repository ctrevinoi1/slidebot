# SlideBot – AI-generated Multiple-Choice Quizzes from PDF / PPTX

SlideBot is a two-part web application that lets lecturers securely generate multiple-choice quizzes from their own slide decks or lecture notes (PDF or PowerPoint).  All processing is performed against your private Azure OpenAI resource – no data is used to train public models.

## Features

* Drag-and-drop a PDF or PPTX – nothing else to click.
* Azure OpenAI (or GPT-4/EU variant) generates 5 MCQs based **solely** on the uploaded content.
* Clean, ChatGPT-style UI built with React, Vite and Tailwind.
* Works entirely within your Azure tenancy – respects intellectual-property concerns.

---

## 1. Quick start (local dev)

### Prerequisites

* Node 18 + (for both client and server)
* An Azure OpenAI resource with a chat deployment (e.g. `gpt-4o`, `gpt-35-turbo`)

### Clone & install

```bash
# from project root
cd server && npm i  # installs backend deps
cd ../client && npm i   # installs frontend deps
```

### Environment variables

Copy `env.example` to `.env` **in the project root** and fill in your Azure details:

```bash
cp env.example .env
# then edit .env
```

```
AZURE_OPENAI_ENDPOINT="https://<your-resource>.openai.azure.com"
AZURE_OPENAI_API_KEY="<api-key>"
AZURE_OPENAI_DEPLOYMENT="gpt-35-turbo-quiz"  # or your deployment name
```

### Run both apps

```bash
# Terminal 1 – backend
cd server && npm run dev

# Terminal 2 – frontend
cd client && npm run dev
```

Visit http://localhost:5173 and drop a file – that’s it!

---

## 2. Project structure

```
slidebot/
├─ server/        # Express + TypeScript backend
│  ├─ src/
│  │  ├─ index.ts           # API entry point
│  │  ├─ fileParser.ts      # PDF / PPTX → plain text
│  │  └─ quizGenerator.ts   # Azure OpenAI call
│  ├─ package.json
│  └─ tsconfig.json
│
├─ client/        # React + Vite + Tailwind frontend
│  ├─ src/
│  │  ├─ main.tsx          # React bootstrap
│  │  ├─ App.tsx           # Page logic
│  │  └─ components/
│  │     ├─ Dropzone.tsx
│  │     └─ QuizDisplay.tsx
│  ├─ tailwind.config.cjs
│  └─ vite.config.ts
│
└─ env.example    # template for required env vars
```

---

## 3. Production deployment

Both parts can be containerised and deployed to Azure App Service or Azure Container Apps.  Ensure your backend’s outbound network is allowed to call your private OpenAI endpoint, or deploy them to the same VNet.

* **Backend** – build with `npm run build`, then `node dist/index.js`.
* **Frontend** – run `npm run build` (outputs static files in `dist/`) and serve via Azure Static Web Apps, Nginx, etc.

---

## 4. Security & data residency

* The server sends your document text directly to Azure OpenAI – no third-party hops.
* Data is **not** logged or used to retrain the model (per Microsoft’s enterprise policy).
* Remove `console.log` statements if you process sensitive content.

---

## 5. Troubleshooting

* 404 from `/generate-quiz` – ensure backend is running on `4000` and proxy is working.
* `Unsupported file type` – only `.pdf` and `.pptx` are accepted.
* Parsing errors for complex PPTX – consider using Azure Document Intelligence instead (left as extension point). 