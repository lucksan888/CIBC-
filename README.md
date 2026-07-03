# CIBC FutureView Prototype

FutureView is a static prototype for a CIBC financial guidance system. It shows how CIBC could compete with fintech platforms by giving clients and advisors hyper-personalized financial insights without offering prediction-market trading inside the banking app.

## Live Demo

If this project is published with GitHub Pages, the website will be available at:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

## What This Prototype Shows

FutureView uses forecast-style signals in the background and translates them into practical banking guidance. Customers do not trade event contracts or participate in prediction markets. Instead, the product helps people understand spending patterns, savings progress, credit card risk, and financial goals.

The prototype includes:

- A client login flow for Rita Wen.
- An advisor login flow for CIBC advisors.
- A personalized spending forecast.
- Safe spending guidance for the current month.
- Savings goal tracking and scenario changes.
- Credit card overspending guardrails.
- Chequing, savings, credit card, and investment account views.
- Investment transparency for CIBC-managed products.
- AI-supported financial advice without speculative trading.

## Project Structure

```text
cibc-futureview-prototype/
├── index.html
├── styles.css
├── app.js
├── cibc-logo-photo.png
├── cibc-logo.svg
├── README.md
└── .gitignore
```

## How To Open Locally

You can open the prototype directly by double-clicking:

```text
index.html
```

You can also run it as a local website:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

## Demo Login Details

This is a prototype only, so there is no real authentication.

Client mode:

```text
Username: rita.wen
Password: futureview
```

Advisor mode:

```text
Advisor ID: advisor.demo
Password: futureview
```

## How To Put This On GitHub

1. Create a new repository on GitHub.
2. Name it something like `cibc-futureview-prototype`.
3. Upload all files from this folder.
4. Commit the files to the `main` branch.
5. Go to **Settings** in the GitHub repository.
6. Open **Pages** in the left sidebar.
7. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
8. Click **Save**.
9. Wait a minute, then open the GitHub Pages link.

## Suggested Repository Description

```text
A CIBC FutureView prototype showing client and advisor financial guidance powered by personalized forecasting, spending insights, and goal tracking.
```

## Important Note

This is a student concept prototype. It is not affiliated with, endorsed by, or produced by CIBC. The CIBC name and logo are used only for educational demonstration purposes.

## One-Sentence Pitch

CIBC FutureView turns account data, spending patterns, and forecast signals into personalized financial guidance so customers can prepare before uncertainty becomes financial stress.
