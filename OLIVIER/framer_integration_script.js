/**
 * Framer Integration Script - Assistant Royal AI
 * Uprising Studio — Powered by Gemini 2.5 Flash
 *
 * Instructions:
 * 1. In Framer, go to Site Settings > Custom Code.
 * 2. Paste this entire script into "End of <body> tag".
 * 3. Click Save, then Publish.
 */

(function () {
  const BACKEND_URL = "https://uprising-content-os-production.up.railway.app";
  const API_ENDPOINT = BACKEND_URL + "/api/v1/chat";

  /* ---------- styles ---------- */
  const css = document.createElement("style");
  css.textContent = `
    #royal-ai-toggle {
      position: fixed; bottom: 24px; right: 24px; z-index: 10000;
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, #6C3AED 0%, #A855F7 100%);
      border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(108,58,237,.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s;
    }
    #royal-ai-toggle:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(108,58,237,.6); }
    #royal-ai-toggle svg { width: 28px; height: 28px; fill: #fff; }

    #royal-ai-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 10000;
      width: 380px; max-height: 520px; border-radius: 16px;
      background: #1a1a2e; color: #f0f0f0;
      box-shadow: 0 8px 32px rgba(0,0,0,.45);
      display: none; flex-direction: column; overflow: hidden;
      font-family: 'Inter', system-ui, sans-serif;
    }
    #royal-ai-panel.open { display: flex; }

    #royal-ai-header {
      padding: 16px; background: linear-gradient(135deg, #6C3AED, #A855F7);
      font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px;
    }
    #royal-ai-header span { font-size: 18px; }

    #royal-ai-messages {
      flex: 1; overflow-y: auto; padding: 14px; display: flex;
      flex-direction: column; gap: 10px; max-height: 340px;
    }

    .ra-msg {
      max-width: 85%; padding: 10px 14px; border-radius: 12px;
      font-size: 13.5px; line-height: 1.45; word-wrap: break-word;
    }
    .ra-msg.bot { background: #2d2d44; align-self: flex-start; border-bottom-left-radius: 4px; }
    .ra-msg.user { background: #6C3AED; align-self: flex-end; border-bottom-right-radius: 4px; }
    .ra-msg.typing { opacity: .6; font-style: italic; }

    #royal-ai-input-row {
      display: flex; padding: 10px 14px; gap: 8px;
      border-top: 1px solid rgba(255,255,255,.08);
    }
    #royal-ai-input {
      flex: 1; background: #2d2d44; border: none; border-radius: 8px;
      padding: 10px 12px; color: #f0f0f0; font-size: 13.5px; outline: none;
    }
    #royal-ai-input::placeholder { color: #888; }
    #royal-ai-send {
      background: #6C3AED; border: none; border-radius: 8px;
      padding: 0 16px; color: #fff; cursor: pointer; font-weight: 600;
      font-size: 13.5px; transition: background .15s;
    }
    #royal-ai-send:hover { background: #7c4dff; }
  `;
  document.head.appendChild(css);

  /* ---------- HTML ---------- */
  // Toggle button
  const btn = document.createElement("button");
  btn.id = "royal-ai-toggle";
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>';
  document.body.appendChild(btn);

  // Panel
  const panel = document.createElement("div");
  panel.id = "royal-ai-panel";
  panel.innerHTML = `
    <div id="royal-ai-header"><span>👑</span> Assistant Royal AI</div>
    <div id="royal-ai-messages">
      <div class="ra-msg bot">Bienvenue ! Je suis l'Assistant Royal AI d'Uprising Studio. Comment puis-je vous aider aujourd'hui ?</div>
    </div>
    <div id="royal-ai-input-row">
      <input id="royal-ai-input" placeholder="Votre message..." autocomplete="off" />
      <button id="royal-ai-send">Envoyer</button>
    </div>
  `;
  document.body.appendChild(panel);

  /* ---------- Logic ---------- */
  const messages = document.getElementById("royal-ai-messages");
  const input = document.getElementById("royal-ai-input");
  const sendBtn = document.getElementById("royal-ai-send");
  let history = [];

  btn.addEventListener("click", () => panel.classList.toggle("open"));

  function addMsg(text, role) {
    const div = document.createElement("div");
    div.className = "ra-msg " + role;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    addMsg(text, "user");
    history.push({ role: "user", content: text });

    const typing = addMsg("En train de réfléchir…", "bot typing");

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      typing.remove();
      const reply = data.response || data.message || "Désolé, je n'ai pas pu répondre.";
      addMsg(reply, "bot");
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      typing.remove();
      addMsg("Erreur de connexion. Réessayez.", "bot");
    }
  }

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });

  console.log("✅ Assistant Royal AI chargé — " + BACKEND_URL);
})();
