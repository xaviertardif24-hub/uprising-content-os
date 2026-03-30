import { create } from 'zustand'

const API_BASE_URL = 'http://localhost:8000/api/v1/notifications';

export const useNotificationStore = create((set) => ({
    notifications: [],
    isLoading: false,
    error: null,

    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Failed to fetch notifications');
            const data = await response.json();
            set({ notifications: data, isLoading: false });
        } catch (error) {
            console.error('Fetch failed, using bootstrap data:', error);
            // Fallback to bootstrap data for demo purposes if backend isn't running
            set({
                notifications: [
                    { id: 101, type: 'mention', user_name: 'Système', content: 'Prêt pour le test (Mode démo)', is_unread: true },
                    { id: 102, type: 'update', user_name: 'Aide', content: 'Le backend local n\'est pas détecté, affichage des données de secours.', is_unread: true }
                ],
                isLoading: false
            });
        }
    },

    markAsRead: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}/read`, { method: 'POST' });
            if (response.ok) {
                set((state) => ({
                    notifications: state.notifications.map((n) =>
                        n.id === id ? { ...n, is_unread: false } : n
                    )
                }));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    },

    markAllAsRead: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/read-all`, { method: 'POST' });
            if (response.ok) {
                set((state) => ({
                    notifications: state.notifications.map((n) => ({ ...n, is_unread: false }))
                }));
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    }
}));
