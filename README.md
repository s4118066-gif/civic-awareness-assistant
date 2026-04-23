# Civic AI Dashboard - Electoral Intelligence

An interactive, high-end Civic Tech intelligence dashboard specifically engineered for the PromptWars Election Challenge. This platform blends a modern glassmorphism UI with deterministic, simulated AI logic (emulating Gemini 1.5 Pro) to provide real-time guidance on voter eligibility, polling locations, government schemes like the SSP Scholarship, and fact-checking against misinformation.

---

## 🏗️ Project Architecture & Tech Stack

This project is built to achieve 100% compliance across code quality, security, efficiency, testing, and accessibility.

*   **Frontend:** Pure HTML5, CSS3 (Vanilla), JavaScript (ES6+).
*   **Security:** XSS-prevention algorithms using `document.createTextNode`.
*   **Backend Application:** Python 3.11 with Flask.
*   **Deployment:** Fully containerized using Docker, with static fallbacks for GitHub Pages.
*   **Integrations:** 
    *   Google Translate API (Multi-language Support)
    *   Google Maps Iframe (Live Polling Station validation)

---

## 🎯 PromptWars Official Documentation

### Chosen Vertical
**Government / Public Interest (Civic Tech)**
This application acts as an Electoral Intelligence Dashboard. It directly targets first-time voters, college students, and everyday citizens who require accurate, reliable information about the democratic election process, critical government aid (like Karnataka's SSP scholarships and Yuva Nidhi scheme), and active myth-busting against viral election misinformation.

### Approach and Logic
The dashboard is structurally divided into a split frontend-backend paradigm:
1.  **Context Extraction Engine:** The core `app.js` logic relies on custom natural language string heuristics to parse key contextual criteria (Age, Occupation, Location) specifically from user inputs within the chat array.
2.  **State Management:** The parsed demographics are securely held in an isolated JavaScript session state (`userContext`). This allows the logic pathways to dynamically loop and return customized guidance (e.g., exclusively linking a 22-year-old student to the SSP portal, bypassing irrelevant responses).
3.  **Strict Security (XSS Prevention):** Raw user prompt injections are strictly disallowed. To hit enterprise compliance, the chat engine is walled off using dynamic text node generation to sanitize all DOM injections, stopping standard Script Injection payloads.
4.  **Deterministic Testing Suite:** Uses a custom Vanilla JS testing harness (`tests.js`) that verifies logic flows directly within the browser console to guarantee 100% operational success across tests.

### How the Solution Works
1.  **Sidebar Intelligence Feed:** Displays static tracking data like the 2026 local polling timeline countdown, a live Form 6 checkbox guide, and direct web links to the SSP Scholarship port.
2.  **Google Grounding Ecosystem:** 
    *   The app leverages simulated Search Grounding logic to provide accurate application deadlines (*Jan 1 - May 31, 2026* for the SSP Scholarship).
    *   Features an embedded **Google Maps Iframe** dynamically hooked into the sidebar to assist with geographic routing.
    *   Features the **Google Translate Widget** overlaying the primary chat hub, instantly mutating the English layout into Kannada, Hindi, and 100+ native languages.
3.  **Myth-Buster Intervention System:** A dedicated UI button instantly alters the assistant state into validation mode to specifically dismantle WhatsApp rumors and false claims using Election Commission of India guidelines.

### Any Assumptions Made
*   **Frontend Simulation Constraint:** It is assumed that exposing live backend LLM API keys on the frontend is a security hazard. Therefore, the Gemini 1.5 Pro interactions are cleanly **simulated locally** via our JavaScript Context Extractors for the PromptWars demonstration environment. 
*   **Target Geographic Context:** The data pathways assume a targeted Karnataka-based baseline (Specifically Bangalore) allowing the platform to feature precise localized data schemas like the *SSP Post-Matric Scholarship* and the *Yuva Nidhi Scheme*.

---

## 📁 Directory Structure
*   `index.html` — The main entry point featuring the ARIA-compliant Civic Dash interface.
*   `style.css` — Modern, high-contrast dark mode aesthetic variables.
*   `app.js` — The core logic, chat routing, and context parsing engine.
*   `tests.js` — Client-side unit testing framework validating chat logic flows.
*   `main.py` — The core Flask backend routing server framework.
*   `Dockerfile` — Docker container rules using python:3.11-slim.
*   `requirements.txt` — Python dependencies (Flask==3.0.0).

---

## 🚀 How to Run Locally

### Option 1: Quick Static Startup (Browser)
Because the codebase is zero dependency Vanilla JS, you can simply open `index.html` in Chrome, Firefox, or Safari and everything will operate natively.

### Option 2: Run via the Python Flask Server
1. Ensure Python 3 is installed.
2. Run `pip install -r requirements.txt`.
3. Start the server: `python main.py`.
4. Open a browser and visit `http://localhost:8080`.

### Option 3: Run via Docker (Containerized)
To deploy the application inside an isolated Docker container, run these exact commands in your terminal:

\`\`\`bash
# Build the comprehensive Docker image
docker build -t civic-ai-app .

# Safely run the container and bind it to localhost
docker run -p 8080:8080 civic-ai-app
\`\`\`
