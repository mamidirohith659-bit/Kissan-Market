/**
 * Kissan Market - Mock Chat System
 */

const Chat = {
    isOpen: false,
    currentRecipient: 'Farmer',
    
    init() {
        // Remove existing if any
        const existing = document.getElementById('chat-widget');
        if (existing) existing.parentElement.remove();

        const chatHtml = `
            <div id="chat-widget" class="glass" style="position: fixed; bottom: 20px; right: 20px; width: 350px; height: 450px; border-radius: 20px; display: none; flex-direction: column; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 2000; overflow: hidden;">
                <div style="background: var(--primary-color); color: white; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <div id="chat-recipient-avatar" style="width: 30px; height: 30px; background: white; color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">${this.currentRecipient[0]}</div>
                        <span id="chat-recipient-name" style="font-weight: 600;">Chat with ${this.currentRecipient}</span>
                    </div>
                    <button onclick="Chat.toggle()" style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">×</button>
                </div>
                <div id="chat-messages" style="flex-grow: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; background: var(--secondary-color);">
                    <div style="background: white; padding: 0.8rem; border-radius: 15px 15px 15px 0; max-width: 80%; font-size: 0.9rem; align-self: flex-start; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        Hello! I am interested in your products. Can we negotiate?
                    </div>
                </div>
                <div style="padding: 1rem; background: white; border-top: 1px solid #eee; display: flex; gap: 0.5rem;">
                    <input type="text" id="chat-input" placeholder="Type a message..." style="flex-grow: 1; padding: 0.7rem; border: 1px solid #ddd; border-radius: 20px; outline: none;">
                    <button onclick="Chat.send()" style="background: var(--primary-color); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">→</button>
                </div>
            </div>
            <button id="chat-toggle-btn" onclick="Chat.toggle()" style="position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background: var(--primary-color); color: white; border-radius: 50%; border: none; font-size: 1.5rem; cursor: pointer; box-shadow: 0 10px 20px rgba(139, 74, 43, 0.4); z-index: 1999; display: flex; align-items: center; justify-content: center;">
                💬
            </button>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = chatHtml;
        document.body.appendChild(div);

        // Enter key listener
        document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.send();
        });
    },

    openWith(name) {
        this.currentRecipient = name;
        if (!document.getElementById('chat-widget')) this.init();
        
        document.getElementById('chat-recipient-name').innerText = `Chat with ${name}`;
        document.getElementById('chat-recipient-avatar').innerText = name[0];
        
        if (!this.isOpen) this.toggle();
    },

    toggle() {
        this.isOpen = !this.isOpen;
        document.getElementById('chat-widget').style.display = this.isOpen ? 'flex' : 'none';
        document.getElementById('chat-toggle-btn').style.display = this.isOpen ? 'none' : 'flex';
    },

    send() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        const messages = document.getElementById('chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = "background: var(--primary-color); color: white; padding: 0.8rem; border-radius: 15px 15px 0 15px; max-width: 80%; font-size: 0.9rem; align-self: flex-end; box-shadow: 0 2px 5px rgba(0,0,0,0.1);";
        msgDiv.innerText = text;
        messages.appendChild(msgDiv);
        
        input.value = '';
        messages.scrollTop = messages.scrollHeight;

        // Mock auto-reply
        setTimeout(() => {
            const reply = document.createElement('div');
            reply.style.cssText = "background: white; padding: 0.8rem; border-radius: 15px 15px 15px 0; max-width: 80%; font-size: 0.9rem; align-self: flex-start; box-shadow: 0 2px 5px rgba(0,0,0,0.05);";
            reply.innerText = "Sure, I'm open to discussion. What's your offer?";
            messages.appendChild(reply);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }
};

// Auto-init chat on dashboard pages
if (window.location.pathname.includes('dashboard.html') || 
    window.location.pathname.includes('products.html') || 
    window.location.pathname.includes('marketplace.html') ||
    window.location.pathname.includes('bids.html') ||
    window.location.pathname.includes('my-bids.html')) {
    document.addEventListener('DOMContentLoaded', () => Chat.init());
}

