import { create } from 'zustand'

export const useClipflowStore = create((set) => ({
    projects: [
        { id: '1', title: 'YouTube Series: AI Future', status: 'In Progress', workload: 0.75, platform: 'YouTube' },
        { id: '2', title: 'TikTok Daily: Coding Tips', status: 'Ideation', workload: 0.3, platform: 'TikTok' },
    ],
    tasks: [
        { id: '101', projectId: '1', title: 'Draft Script', assignee: 'Kael', status: 'Completed', dueDate: '2024-03-12', role: 'Writer' },
        { id: '102', projectId: '1', title: 'Rec B-roll', assignee: 'Xavier', status: 'In Progress', dueDate: '2024-03-15', role: 'Creator' },
        { id: '103', projectId: '2', title: 'Brainstorm hooks', assignee: 'Kael', status: 'Todo', dueDate: '2024-03-11', role: 'Lead' },
    ],
    media: [
        { id: 'm1', title: 'Intro Hook V1', type: 'video', category: 'Raw B-roll', url: '#', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80' },
        { id: 'm2', title: 'Background Loop', type: 'video', category: 'Assets', url: '#', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80' },
    ],

    // Actions
    addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
    updateTaskStatus: (taskId, status) => set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t)
    })),
    addMedia: (item) => set((state) => ({ media: [...state.media, item] })),
}))
