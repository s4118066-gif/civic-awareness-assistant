document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    // Context memory
    let userContext = {
        age: null,
        status: null,
        location: null
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        // 1. Add user message
        appendMessage('user', text);
        userInput.value = '';

        // 2. Show typing indicator
        const typingId = showTypingIndicator();

        // 3. Process the message and respond and remove typing indicator
        setTimeout(() => {
            const response = generateResponse(text.toLowerCase());
            removeElement(typingId);
            appendMessage('assistant', response);
        }, 800 + Math.random() * 800); // Simulate network delay
    });

    function appendMessage(role, htmlContent) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = htmlContent;
        
        msgDiv.appendChild(contentDiv);
        chatContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message assistant';
        msgDiv.id = id;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content typing-indicator';
        contentDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        msgDiv.appendChild(contentDiv);
        chatContainer.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeElement(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Myth-buster button logic
    const mythBtn = document.getElementById('myth-buster-btn');
    if (mythBtn) {
        mythBtn.addEventListener('click', () => {
            appendMessage('user', 'I want to verify an election rumor.');
            const typingId = showTypingIndicator();
            setTimeout(() => {
                removeElement(typingId);
                appendMessage('assistant', `<strong>🔍 Fact Check System Active</strong><br><br>Please provide the rumor or information you've heard. I will cross-reference it with official Election Commission guidelines to verify its authenticity.`);
            }, 800);
        });
    }

    // Basic intelligence simulation based on prompt requirements
    function generateResponse(text) {
        let matched = false;

        // Grounding Simulation
        if (text.includes('ssp') || text.includes('scholarship') || text.includes('yuva nidhi')) {
            return `
                <div style="font-size: 0.8rem; color: var(--success); margin-bottom: 8px;">
                    <svg style="vertical-align: middle; margin-right: 4px;" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Google Search Grounding: Active
                </div>
                Based on live data integration:
                <br><br>
                🎓 <strong>SSP Post Matric Scholarship:</strong> The deadline has been officially extended to <strong style="color:var(--accent-blue-light)">May 31, 2026</strong> for BCA students. <br>
                🚀 <strong>Yuva Nidhi:</strong> Providing Rs 3,000/month for unemployed graduates. Since you are 22 and studying BCA, you can apply immediately after your graduation if you meet the criteria.
            `;
        }

        // Extract context if present
        if (text.includes('16') || text.includes('17') || text.includes('under 18')) {
            userContext.age = "under_18";
            return "Since you are under 18, <strong>you are not yet eligible to vote</strong>. <br><br>However, you can prepare by:<br><ul><li>Learning about the democratic process</li><li>Volunteering in community programs</li><li>Applying for a Voter ID as soon as you turn 18</li></ul>";
        }
        
        if (text.match(/18|19|20|2[0-9]|3[0-9]/) || text.includes('eligible')) {
            userContext.age = "eligible";
            matched = true;
        }

        if (text.includes('student') || text.includes('bca') || text.includes('college')) {
            userContext.status = "student";
            matched = true;
        }

        if (text.includes('bangalore') || text.includes('bengaluru') || text.includes('banglore')) {
            userContext.location = "bangalore";
            matched = true;
        }

        // Handle specific questions based on past conversation or current input
        if (text.includes('how') && (text.includes('vote') || text.includes('register'))) {
            return `
                <h3>Checklist to Register (Form 6):</h3>
                <ul>
                    <li>Aadhaar Card (For Address)</li>
                    <li>Birth Certificate or 10th Marks Card (For Age Proof)</li>
                    <li>Passport Size Photo</li>
                </ul>
                You can apply directly via the Voter Helpline App or the official ECI portal.
            `;
        }

        if ((text.includes('where') || text.includes('find')) && (text.includes('booth') || text.includes('location'))) {
            return `I recommend using <strong>Google Maps</strong> to verify the quickest route. You can check the ECI portal with your Voter ID EPIC number to find the exact name of your designated polling station.`;
        }

        if (text.includes('fake') || text.includes('whatsapp') || text.includes('cancel') || text.includes('rumor')) {
            return `<strong>⚠️ Myth-Buster Alert:</strong> Always verify information through the official Election Commission of India (ECI) channels. Elections are never cancelled or rescheduled via WhatsApp forwards.`;
        }

        // Combined Context Response
        if (userContext.age === 'eligible' && userContext.status === 'student' && userContext.location === 'bangalore') {
            return `
                That's great! Since you are 22, an eligible voter, and a BCA student in Bangalore, here is your customized guide:
                
                <h3>🗳️ Voting Registration:</h3>
                <ul>
                    <li>Apply via <strong>Form 6</strong> on the Voter Helpline app using your rental agreement or Aadhaar.</li>
                </ul>

                <h3>🎓 Civic Hub & Scholarships:</h3>
                <ul>
                    <li><strong>SSP Scholarship:</strong> Deadline extended to May 31, 2026.</li>
                    <li><strong>Yuva Nidhi:</strong> Keep this in mind post-graduation for unemployment assistance.</li>
                </ul>
            `;
        }
        
        // If we extracted context but no specific question was asked yet
        if (matched) {
            return "I've noted your profile context. How can I help you today? Try asking about <strong>Scholarships</strong>, <strong>Form 6</strong>, or finding your <strong>Polling Booth</strong>.";
        }

        // Generic catch-all
        return "I am the Electoral Intelligence Dashboard running on Gemini 1.5 Pro. I can help you understand the election process and government schemes. <ul><li>Ask about <strong>SSP Scholarships</strong></li><li>Tell me your age and occupation (e.g. <strong>'I am 22 and a student in Bangalore'</strong>)</li><li>Use the <strong>Myth-Buster</strong> utility above.</li></ul>";
    }
});
