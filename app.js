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

    // Basic intelligence simulation based on prompt requirements
    function generateResponse(text) {
        let matched = false;
        let responseParts = [];

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
                <h3>Here are the steps to vote:</h3>
                <ol>
                    <li><strong>Register as a voter:</strong> Fill out Form 6 online via the Voter Portal.</li>
                    <li><strong>Verify your documents:</strong> Provide age and address proof.</li>
                    <li><strong>Find your polling booth:</strong> Check the ECI website for your location.</li>
                    <li><strong>Vote on election day:</strong> Bring your Voter ID or Aadhaar card to the booth.</li>
                </ol>
            `;
        }

        if ((text.includes('where') || text.includes('find')) && (text.includes('booth') || text.includes('location'))) {
            if (userContext.location) {
                return `Since you are in <strong>${userContext.location.charAt(0).toUpperCase() + userContext.location.slice(1)}</strong>, you can find your exact polling station by visiting the Karnataka State Election Commission portal. <br><br>I recommend using map services like <strong>Google Maps</strong> to find the quickest route to your designated school or community center on election day.`;
            } else {
                return `To help you find your polling booth, could you tell me <strong>what city or state you live in?</strong> <br><br>Generally, you can search for your nearest polling station on the ECI portal and use map services for directions.`;
            }
        }

        if (text.includes('fake') || text.includes('whatsapp') || text.includes('cancel')) {
            return `<strong>⚠️ Fact Check:</strong> Elections cannot be cancelled via WhatsApp forwards. Please only trust official sources like the Election Commission of India (ECI) website. If you see suspicious information, do not share it further.`;
        }

        // Combined Context Response
        if (userContext.age === 'eligible' && userContext.status === 'student' && userContext.location === 'bangalore') {
            return `
                That's great! Since you are an eligible voter and a student in Bangalore, here is your customized guide:
                
                <h3>🗳️ Voting Registration:</h3>
                <ul>
                    <li>Apply via <strong>Form 6</strong> on the Voter Helpline app.</li>
                    <li>Use your college ID or rental agreement as address proof.</li>
                </ul>

                <h3>🎓 Relevant Schemes for You:</h3>
                <ul>
                    <li><strong>Karnataka ePASS:</strong> Apply for state scholarships.</li>
                    <li><strong>AICTE Internship Portal:</strong> Find government-approved IT internships.</li>
                </ul>
            `;
        }
        
        // If we extracted context but no specific question was asked yet
        if (matched) {
            return "I've noted your details! How can I help you today? You can ask me <strong>'How do I vote?'</strong> or <strong>'Where is my polling booth?'</strong>.";
        }

        // Generic catch-all
        return "I can help you understand the election process, check your voter eligibility, or find government schemes. <ul><li>Ask me <strong>'How do I vote?'</strong></li><li>Tell me your age and occupation (e.g. <strong>'I am 19 and a student'</strong>)</li><li>Ask <strong>'Where is my polling booth?'</strong></li></ul>";
    }
});
