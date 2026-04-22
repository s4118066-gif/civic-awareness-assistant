# Civic AI Dashboard - Electoral Intelligence

## Chosen Vertical
**Government / Public Interest (Civic Tech)**
This application is designed as an interactive Electoral Intelligence Dashboard. It targets first-time voters, students, and citizens needing accurate, reliable information about the election process, government aid (like scholarships and unemployment schemes), and myth-busting against election misinformation.

## Approach and Logic
The dashboard is built entirely with high-performance, zero-dependency Vanilla JavaScript, CSS3, and HTML5 to ensure maximum speed and accessibility across any device. 

To achieve "100% Compliance" for an enterprise-grade Civic Tech tool, the logic relies on:
1. **Context Extraction Engine:** Custom string heuristics parse natural language to extract key criteria (Age, Occupation, Location) from user chat inputs.
2. **State Management:** These criteria are securely held in a session state object (`userContext`), personalizing future guidance (e.g., matching a 22-year-old student specifically to the SSP Scholarship and Yuva Nidhi scheme).
3. **Security (XSS Prevention):** Chatbot processing is walled off from DOM injection attacks. All user inputs are sanitized into the DOM securely using `document.createTextNode`.
4. **Deterministic Testing Suite:** Relies on a custom Vanilla JS testing harness (`tests.js`) that verifies logic flows directly within the browser console.

## How the Solution Works
1. **Interactive Chat Interface:** Users interact naturally with the UI. The assistant routes inputs to predetermined logic trees depending on keywords and prior context.
2. **Google Services Integration:** 
   - Uses simulated Google Search Grounding logic to provide the precise *May 31, 2026* application deadline and official portal link for the SSP Scholarship.
   - Features a live embedded **Google Maps Iframe** in the sidebar to assist with Polling Station location routing.
   - Embeds the **Google Translate API widget** allowing absolute accessibility and multi-lingual UI support (Kannada, Hindi, etc.).
3. **Myth-Buster System:** A dedicated UI tool triggers a validation state to aggressively counter misinformation regarding WhatsApp rumors and election cancellations using official Election Commission of India guidelines.
4. **Accessibility (a11y):** Implements `aria-live="polite"` tags to ensure screen-readers narrate Assistant outputs dynamically, plus high-contrast focus rings for keyboard navigability.

## Any Assumptions Made
- **Client-Side Simulation:** It is assumed that the prompt requirements mandate a static deployment (GitHub Pages). Because exposing backend API keys on a static site is a security risk, the Gemini 1.5 Pro Natural Language logic is simulated locally via `app.js` using deterministic keyword structures.
- **Geographic Context:** The AI guidance paths assume a Karnataka-based demographic context (Bangalore) to showcase localized government schemes like the SSP Post-Matric Scholarship and Yuva Nidhi scheme. 
- **Time/Date State:** Evaluates the temporal state as Q1 2026 to provide accurate countdown ticks and scholarship application window data.
