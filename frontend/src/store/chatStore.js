import { create } from 'zustand';

const useChatStore = create((set, get) => ({
    messages: [
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Bonjour ! Je suis votre Assistant Royal AI. Comment puis-je vous aider dans votre stratégie business aujourd\'hui ?',
            timestamp: new Date().toISOString()
        }
    ],
    isLoading: false,
    error: null,

    addMessage: (message) => {
        const newMessage = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...message
        };
        set((state) => ({
            messages: [...state.messages, newMessage]
        }));
    },

    sendMessage: async (content) => {
        if (!content.trim()) return;

        // Add user message
        get().addMessage({ role: 'user', content });
        set({ isLoading: true, error: null });

        try {
            const baseUrl = window.UprisingChat?.apiUrl || '';
            const response = await fetch(`${baseUrl}/api/v1/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: get().messages.map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur réseau ou réponse invalide');
            }

            const data = await response.json();
            get().addMessage({ role: 'assistant', content: data.response });
            set({ isLoading: false });
        } catch (error) {
            console.error('Chat error:', error);
            set({ error: "Désolé, une erreur technique est survenue.", isLoading: false });
            
            // Optional: fallback to local simulated response for development if API is down
            // For production, we keep the error state.
        }
    },

    clearChat: () => {
        set({
            messages: [
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: 'Nouvelle discussion démarrée. De quel service royal avez-vous besoin ?',
                    timestamp: new Date().toISOString()
                }
            ]
        });
    }
}));

export default useChatStore;
