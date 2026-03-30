(function() {
  // Config
  const scriptTag = document.currentScript;
  const botId = scriptTag.getAttribute('data-bot-id');
  const apiUrl = scriptTag.src.replace('/embed.js', '') + '/api/chat/' + botId;
  const history = [];

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #cp-widget-bubble { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #6C3AED, #A855F7); cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(108, 58, 237, 0.4); z-index: 999999; transition: transform 0.2s ease; }
    #cp-widget-bubble:hover { transform: scale(1.1); }
    #cp-widget-bubble svg { width: 30px; height: 30px; fill: white; }
    #cp-widget-panel { position: fixed; bottom: 90px; right: 20px; width: 380px; height: 500px; background: #0F172A; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; display: none; flex-direction: column; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5); z-index: 999999; font-family: sans-serif; }
    #cp-widget-panel.open { display: flex; }
    #cp-widget-header { padding: 15px 20px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); color: white; font-weight: bold; display: flex; justify-content: space-between; align-items: center; }
    #cp-widget-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
    .cp-msg { max-width: 85%; padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.5; }
    .cp-msg-bot { align-self: flex-start; background: rgba(255,255,255,0.05); color: #E2E8F0; border-bottom-left-radius: 4px; }
    .cp-msg-user { align-self: flex-end; background: #6C3AED; color: white; border-bottom-right-radius: 4px; }
    #cp-widget-input-area { padding: 15px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; gap: 10px; }
    #cp-widget-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 15px; color: white; outline: none; }
    #cp-widget-send { background: #6C3AED; border: none; border-radius: 10px; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    #cp-widget-send svg { width: 18px; height: 18px; fill: white; }
  `;
  document.head.appendChild(style);

  // HTML
  const bubble = document.createElement('div');
  bubble.id = 'cp-widget-bubble';
  bubble.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>';
  document.body.appendChild(bubble);

  const panel = document.createElement('div');
  panel.id = 'cp-widget-panel';
  panel.innerHTML = `
    <div id="cp-widget-header">
      <span id="cp-widget-title">Assistant IA</span>
      <span style="cursor:pointer; opacity:0.5" onclick="document.getElementById('cp-widget-panel').classList.remove('open')">✕</span>
    </div>
    <div id="cp-widget-messages"></div>
    <div id="cp-widget-input-area">
      <input type="text" id="cp-widget-input" placeholder="Posez votre question...">
      <button id="cp-widget-send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
    </div>
  `;
  document.body.appendChild(panel);

  const msgContainer = panel.querySelector('#cp-widget-messages');
  const input = panel.querySelector('#cp-widget-input');
  const sendBtn = panel.querySelector('#cp-widget-send');
  const titleEl = panel.querySelector('#cp-widget-title');

  // Logic
  bubble.onclick = () => panel.classList.toggle('open');
  
  function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = 'cp-msg cp-msg-' + type;
    div.textContent = text;
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
    return div;
  }

  // Initial Fetch
  async function init() {
    try {
      const configUrl = scriptTag.src.replace('/embed.js', '') + '/api/bots/' + botId;
      const res = await fetch(configUrl);
      const bot = await res.json();
      if (bot.name) titleEl.textContent = bot.name;
      addMsg(bot.welcomeMessage || "Bonjour ! Comment puis-je vous aider ?", 'bot');
    } catch (e) {
      console.warn("Could not fetch bot config", e);
      addMsg("Bonjour ! Comment puis-je vous aider ?", 'bot');
    }
  }
  init();

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    
    addMsg(text, 'user');
    history.push({ role: 'user', content: text });
    
    const loading = addMsg('...', 'bot');
    
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();
      loading.remove();
      const botMsg = data.response || "Désolé, je ne peux pas répondre pour le moment.";
      addMsg(botMsg, 'bot');
      history.push({ role: 'assistant', content: botMsg });
    } catch (e) {
      loading.remove();
      addMsg("Erreur de connexion.", 'bot');
    }
  }

  sendBtn.onclick = sendMessage;
  input.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };
})();
