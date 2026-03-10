import { useClipflowStore } from '../store/useClipflowStore'
import { THEME } from '../data/ThemeConstants'
import { CheckCircle2, Circle, Clock, MoreVertical, LayoutGrid, List, Plus, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Tasks = () => {
    const { t } = useTranslation()
    const { tasks, addTask, updateTaskStatus } = useClipflowStore()
    const [isAdding, setIsAdding] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const handleAddTask = (e) => {
        e.preventDefault()
        if (!newTaskTitle.trim()) return
        addTask({
            title: newTaskTitle,
            projectId: '1', // Default for demo
            assignee: 'Kael',
            status: 'Todo',
            dueDate: new Date().toISOString().split('T')[0],
            role: 'Creator'
        })
        setNewTaskTitle('')
        setIsAdding(false)
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">{t('tasks.title')}</h1>
                    <p className="text-muted-foreground mt-2">{t('tasks.subtitle')}</p>
                </div>
                <div className="flex gap-2 bg-secondary/20 p-1 rounded-lg">
                    <button className="p-1 px-3 rounded-md bg-white shadow-sm text-sm font-medium">{t('tasks.list')}</button>
                    <button className="p-1 px-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">{t('tasks.board')}</button>
                </div>
            </header>

            <div className="space-y-1">
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-border/50 hover:bg-white transition-all cursor-pointer"
                    >
                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                            {task.status === 'Completed' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
                        </div>

                        <div className="flex-1">
                            <h3 className={`font-medium ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>
                                {task.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-foreground">
                                    {task.role}
                                </span>
                                {task.dueDate && (
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        {task.dueDate}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                                {task.assignee[0]}
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-secondary/50 rounded-lg transition-all">
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleAddTask}
                        className="mb-8 p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-4"
                    >
                        <input
                            autoFocus
                            type="text"
                            placeholder={t('tasks.add_task')}
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="w-full bg-white border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all shadow-sm"
                            >
                                {t('common.add')}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsAdding(true)}
                className="mt-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
                <Plus className="w-4 h-4" /> {t('tasks.add_task')}
            </button>
        </div>
    )
}

export default Tasks
