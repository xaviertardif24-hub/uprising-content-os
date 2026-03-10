import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useClipflowStore = create(
    persist(
        (set) => ({
            projects: [
                { id: '1', title: 'YouTube Series: AI Future', status: 'In Progress', workload: 0.75, platform: 'YouTube', type: 'Linear' },
                { id: '2', title: 'TikTok Daily: Coding Tips', status: 'Ideation', workload: 0.3, platform: 'TikTok', type: 'Agile' },
            ],
            tasks: [
                { id: '101', projectId: '1', title: 'Draft Script', assignee: 'Kael', status: 'Completed', dueDate: '2024-03-12', role: 'Writer' },
                { id: '102', projectId: '1', title: 'Rec B-roll', assignee: 'Xavier', status: 'In Progress', dueDate: '2024-03-15', role: 'Creator' },
                { id: '103', projectId: '2', title: 'Brainstorm hooks', assignee: 'Kael', status: 'Todo', dueDate: '2024-03-11', role: 'Lead' },
            ],
            media: [
                { id: 'm1', title: 'Intro Hook V1', type: 'video', category: 'Raw B-roll', url: '#', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80', uploadDate: '2024-03-09' },
                { id: 'm2', title: 'Background Loop', type: 'video', category: 'Assets', url: '#', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80', uploadDate: '2024-03-10' },
            ],
            comments: [
                { id: 'c1', mediaId: 'm1', user: 'Kael', time: '0:05', text: 'La transition est un peu brusque ici.', date: '2024-03-10' },
                { id: 'c2', mediaId: 'm1', user: 'Xavier', time: '0:12', text: 'Excellent cadrage, gardons cette prise.', date: '2024-03-10' },
            ],

            // Project Actions
            addProject: (project) => set((state) => ({
                projects: [...state.projects, { ...project, id: Math.random().toString(36).substr(2, 9) }]
            })),
            updateProjectWorkload: (projectId, workload) => set((state) => ({
                projects: state.projects.map(p => p.id === projectId ? { ...p, workload } : p)
            })),

            // Task Actions
            addTask: (task) => set((state) => ({
                tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9) }]
            })),
            updateTaskStatus: (taskId, status) => set((state) => ({
                tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t)
            })),
            deleteTask: (taskId) => set((state) => ({
                tasks: state.tasks.filter(t => t.id !== taskId)
            })),

            // Media Actions
            addMedia: (item) => set((state) => ({
                media: [...state.media, { ...item, id: Math.random().toString(36).substr(2, 9), uploadDate: new Date().toISOString() }]
            })),

            // Comment Actions
            addComment: (comment) => set((state) => ({
                comments: [...state.comments, { ...comment, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() }]
            }))
        }),
        {
            name: 'clipflow-storage',
        }
    )
)

