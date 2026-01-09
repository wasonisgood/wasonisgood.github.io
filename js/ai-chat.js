/**
 * AI Chat Widget & Features for Wason's Blog
 * Features:
 * - Floating Chat Assistant (RAG Lite)
 * - "Summarize This Post" Button
 * - "Bring Your Own Key" (Gemini API) support
 */

(function() {
    const AI_CONFIG = {
        chatTitle: "Wason AI Assistant",
        placeholder: "Ask me about this blog...",
        searchPath: "/search.xml",
        model: "gemini-1.5-flash"
    };

    let blogData = [];
    let isDataLoaded = false;

    // --- DOM Elements (Chat) ---
    let chatWidget, chatHeader, chatMessages, chatInput, chatSendBtn, settingsBtn, settingsPanel, apiKeyInput, saveKeyBtn;

    // --- CSS Styles ---
    const styles = `
        /* Chat Widget */
        #wason-ai-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        #wason-ai-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #222;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: transform 0.2s;
        }
        #wason-ai-toggle:hover { transform: scale(1.05); }
        
        #wason-ai-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid #eee;
        }
        #wason-ai-window.open { display: flex; }

        .ai-header {
            background: #222;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .ai-header h3 { margin: 0; font-size: 16px; font-weight: 600; }
        .ai-actions button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 18px;
            margin-left: 10px;
            opacity: 0.8;
        }
        .ai-actions button:hover { opacity: 1; }

        .ai-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f9f9f9;
        }
        .ai-msg {
            margin-bottom: 12px;
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
        }
        .ai-msg.user {
            background: #222;
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 2px;
        }
        .ai-msg.bot {
            background: #e9e9eb;
            color: #333;
            margin-right: auto;
            border-bottom-left-radius: 2px;
        }
        .ai-msg.system {
            background: #fff3cd;
            color: #856404;
            width: 100%;
            text-align: center;
            font-size: 12px;
        }
        .ai-msg p { margin: 0; }
        .ai-msg a { color: #007bff; text-decoration: none; }
        .ai-msg ul { margin: 5px 0; padding-left: 20px; }

        .ai-input-area {
            padding: 10px;
            border-top: 1px solid #eee;
            display: flex;
            background: white;
        }
        .ai-input-area input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            font-size: 14px;
        }
        .ai-input-area button {
            background: #222;
            color: white;
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            margin-left: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Settings Panel */
        #wason-ai-settings {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: white;
            z-index: 10;
            padding: 20px;
            display: none;
            flex-direction: column;
        }
        #wason-ai-settings.open { display: flex; }
        .ai-settings-title { font-size: 18px; margin-bottom: 20px; font-weight: bold; }
        .ai-form-group { margin-bottom: 15px; }
        .ai-form-group label { display: block; margin-bottom: 5px; font-size: 14px; color: #555; }
        .ai-form-group input { 
            width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;
        }
        .ai-save-btn {
            background: #28a745; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; width: 100%;
        }
        .ai-close-settings {
            margin-top: 10px; background: #eee; color: #333; border: none; padding: 10px; border-radius: 4px; cursor: pointer; width: 100%;
        }
        
        .typing-indicator span {
            display: inline-block;
            width: 6px; height: 6px; background-color: #aaa; border-radius: 50%;
            animation: typing 1s infinite; margin: 0 2px;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        /* Summary Button */
        #wason-ai-summary-container {
            margin: 20px 0;
            padding: 15px;
            background: #f8f9fa;
            border-left: 4px solid #222;
            border-radius: 4px;
        }
        #wason-ai-summarize-btn {
            background: #222;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
        }
        #wason-ai-summarize-btn:hover { opacity: 0.9; }
        #wason-ai-summary-content {
            margin-top: 10px;
            font-size: 15px;
            line-height: 1.6;
            color: #333;
        }
    `;

    // --- Initialization ---
    function init() {
        injectStyles();
        createWidgetUI();
        loadData();
        injectSummarizeButton();
    }

    function injectStyles() {
        const styleEl = document.createElement('style');
        styleEl.innerHTML = styles;
        document.head.appendChild(styleEl);
    }

    function injectSummarizeButton() {
        const postHeader = document.querySelector('.post-header');
        const postBody = document.querySelector('.post-body');
        
        if (postHeader && postBody && !document.getElementById('wason-ai-summary-container')) {
            const container = document.createElement('div');
            container.id = 'wason-ai-summary-container';
            container.innerHTML = `
                <button id="wason-ai-summarize-btn">✨ Summarize with AI</button>
                <div id="wason-ai-summary-content" style="display:none;"></div>
            `;
            // Insert after header, before body
            postHeader.parentNode.insertBefore(container, postBody);

            document.getElementById('wason-ai-summarize-btn').onclick = async function() {
                const btn = this;
                const contentDiv = document.getElementById('wason-ai-summary-content');
                const apiKey = localStorage.getItem('wason_ai_key');

                if (!apiKey) {
                    alert('Please set your Gemini API Key in the Chat Widget settings (bottom right) first.');
                    document.getElementById('wason-ai-toggle').click();
                    setTimeout(() => document.getElementById('wason-ai-btn-settings').click(), 500);
                    return;
                }

                btn.disabled = true;
                btn.innerHTML = '✨ Summarizing...';
                contentDiv.style.display = 'block';
                contentDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

                // Get text content (strip tags roughly)
                const articleText = postBody.innerText.substring(0, 10000); // Limit to ~10k chars

                try {
                    const summary = await callGemini(apiKey, `Summarize this blog post in 3-4 bullet points:\n\n${articleText}`);
                    contentDiv.innerHTML = summary.replace(/\n/g, '<br>');
                    btn.innerHTML = '✨ Summarized';
                } catch (e) {
                    contentDiv.innerHTML = 'Error: ' + e.message;
                    btn.disabled = false;
                    btn.innerHTML = '✨ Try Again';
                }
            };
        }
    }

    function createWidgetUI() {
        const div = document.createElement('div');
        div.id = 'wason-ai-widget';
        div.innerHTML = `
            <button id="wason-ai-toggle">🤖</button>
            <div id="wason-ai-window">
                <div class="ai-header">
                    <h3>${AI_CONFIG.chatTitle}</h3>
                    <div class="ai-actions">
                        <button id="wason-ai-btn-settings">⚙️</button>
                        <button id="wason-ai-btn-close">✕</button>
                    </div>
                </div>
                <div id="wason-ai-messages" class="ai-messages">
                    <div class="ai-msg bot">Hello! I'm your AI assistant. I can help you find articles on this blog. Set your API Key in settings for full AI power.</div>
                </div>
                <div class="ai-input-area">
                    <input type="text" id="wason-ai-input" placeholder="${AI_CONFIG.placeholder}">
                    <button id="wason-ai-send">➤</button>
                </div>
                
                <!-- Settings Panel -->
                <div id="wason-ai-settings">
                    <div class="ai-settings-title">Settings</div>
                    <div class="ai-form-group">
                        <label>Gemini API Key</label>
                        <input type="password" id="wason-ai-api-key" placeholder="Enter your key here...">
                    </div>
                    <button class="ai-save-btn" id="wason-ai-save-key">Save Key</button>
                    <button class="ai-close-settings" id="wason-ai-close-settings">Back to Chat</button>
                    <div style="margin-top:15px; font-size:12px; color:#666;">
                        Your key is stored locally in your browser.
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(div);

        // Bind Elements
        chatWidget = document.getElementById('wason-ai-window');
        chatMessages = document.getElementById('wason-ai-messages');
        chatInput = document.getElementById('wason-ai-input');
        settingsPanel = document.getElementById('wason-ai-settings');
        apiKeyInput = document.getElementById('wason-ai-api-key');

        // Event Listeners
        document.getElementById('wason-ai-toggle').onclick = () => {
            chatWidget.classList.toggle('open');
            if(chatWidget.classList.contains('open')) chatInput.focus();
        };
        document.getElementById('wason-ai-btn-close').onclick = () => chatWidget.classList.remove('open');
        document.getElementById('wason-ai-btn-settings').onclick = () => {
            apiKeyInput.value = localStorage.getItem('wason_ai_key') || '';
            settingsPanel.classList.add('open');
        };
        document.getElementById('wason-ai-close-settings').onclick = () => settingsPanel.classList.remove('open');
        document.getElementById('wason-ai-save-key').onclick = () => {
            localStorage.setItem('wason_ai_key', apiKeyInput.value.trim());
            settingsPanel.classList.remove('open');
            addMessage('bot', 'API Key saved! You can now ask me anything.');
        };

        const sendMessage = () => {
            const text = chatInput.value.trim();
            if(!text) return;
            addMessage('user', text);
            chatInput.value = '';
            processUserQuery(text);
        };

        document.getElementById('wason-ai-send').onclick = sendMessage;
        chatInput.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
    }

    function addMessage(role, text) {
        const div = document.createElement('div');
        div.className = `ai-msg ${role}`;
        div.innerHTML = typeof text === 'string' ? text : text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.className = 'ai-msg bot typing-indicator';
        div.id = id;
        div.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function removeTyping(id) {
        const el = document.getElementById(id);
        if(el) el.remove();
    }

    // --- Logic ---

    async function loadData() {
        try {
            const res = await fetch(AI_CONFIG.searchPath);
            const text = await res.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            const entries = xmlDoc.getElementsByTagName("entry");
            
            blogData = Array.from(entries).map(entry => {
                return {
                    title: entry.getElementsByTagName("title")[0]?.textContent || "",
                    url: entry.getElementsByTagName("url")[0]?.textContent || "",
                    content: entry.getElementsByTagName("content")[0]?.textContent?.replace(/<[^>]*>/g, ' ') || ""
                };
            });
            isDataLoaded = true;
            console.log("AI: Loaded " + blogData.length + " posts.");
        } catch (e) {
            console.error("AI: Failed to load search.xml", e);
        }
    }

    async function callGemini(apiKey, prompt) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text;
    }

    async function processUserQuery(query) {
        const typingId = showTyping();

        // 1. Local Search (RAG Lite)
        if (!isDataLoaded) await loadData();
        
        const keywords = query.toLowerCase().split(' ').filter(w => w.length > 2);
        const results = blogData.map(post => {
            let score = 0;
            const titleLower = post.title.toLowerCase();
            const contentLower = post.content.toLowerCase();
            
            keywords.forEach(word => {
                if (titleLower.includes(word)) score += 5;
                if (contentLower.includes(word)) score += 1;
            });
            return { ...post, score };
        }).filter(p => p.score > 0).sort((a,b) => b.score - a.score).slice(0, 3);

        const apiKey = localStorage.getItem('wason_ai_key');

        if (!apiKey) {
            removeTyping(typingId);
            if (results.length > 0) {
                let msg = "I found these articles that might help:<br>";
                results.forEach(r => msg += `<br>• <a href="${r.url}">${r.title}</a>`);
                msg += "<br><br><i>(Add an API Key in settings to get a full AI answer)</i>";
                addMessage('bot', msg);
            } else {
                addMessage('bot', "I couldn't find any relevant articles locally. Try different keywords.");
            }
            return;
        }

        // 2. LLM Call
        const context = results.map(r => `Title: ${r.title}\nURL: ${r.url}\nContent Snippet: ${r.content.substring(0, 500)}...`).join('\n\n');
        
        const prompt = `
        You are a helpful assistant for Wason's blog.
        User Question: "${query}"
        
        Here is some context from the blog posts:
        ${context}
        
        Please answer the user's question based on the context provided. 
        If the answer is in the context, cite the article title and link.
        If the context is irrelevant, just answer generally but mention you didn't find specific blog posts about it.
        Keep it concise.
        `;

        try {
            const answer = await callGemini(apiKey, prompt);
            removeTyping(typingId);
            const formatted = answer.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
            addMessage('bot', formatted);
        } catch (e) {
            removeTyping(typingId);
            addMessage('system', 'Network error calling AI: ' + e.message);
        }
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();