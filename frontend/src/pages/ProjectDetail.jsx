import React from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useClipflowStore } from '../store/useClipflowStore'
import { LayoutList, Video, Edit3, CheckCircle, ChevronRight, MessageSquare, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ProjectDetail = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const { projects } = useClipflowStore()
    const project = projects.find(p => p.id === id) || projects[0]

    const workflowSteps = [
        { id: 'step1', title: t('project_detail.steps.ideation'), icon: <Edit3 />, status: 'Completed', color: 'bg-blue-500' },
        { id: 'step2', title: t('project_detail.steps.scheduling'), icon: <LayoutList />, status: 'In Progress', color: 'bg-purple-500' },
        { id: 'step3', title: t('project_detail.steps.capture'), icon: <Video />, status: 'Todo', color: 'bg-orange-500' },
        { id: 'step4', title: t('project_detail.steps.review'), icon: <MessageSquare />, status: 'Todo', color: 'bg-green-500' },
        { id: 'step5', title: t('project_detail.steps.publication'), icon: <CheckCircle />, status: 'Todo', color: 'bg-pink-500' },
    ]

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    <span>{t('sidebar.organisation')}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-foreground">{project.platform}</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
                <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-32 bg-secondary/30 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${project.workload * 100}%` }} />
                        </div>
                        <span className="text-sm font-medium">{Math.round(project.workload * 100)}%</span>
                    </div>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] font-bold">
                                {i === 1 ? 'K' : 'X'}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <div className="relative">
                {/* Workflow Line */}
                <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-border/40" />

                <div className="space-y-12">
                    {workflowSteps.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-8 relative"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${step.status === 'Completed' ? 'bg-primary' : 'bg-white border border-border'} shadow-sm flex items-center justify-center z-10 transition-colors`}>
                                <div className={step.status === 'Completed' ? 'text-white' : 'text-muted-foreground'}>
                                    {React.cloneElement(step.icon, { className: 'w-5 h-5' })}
                                </div>
                            </div>

                            <div className="flex-1 pt-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold">{step.title}</h3>
                                    <span className={`text-[10px] font-bold uppercase py-1 px-3 rounded-full ${step.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        step.status === 'In Progress' ? 'bg-primary/10 text-primary' :
                                            'bg-secondary/10 text-muted-foreground'
                                        }`}>
                                        {step.status}
                                    </span>
                                </div>
                                <div className="p-6 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                                    {step.status === 'Todo' ? (
                                        <p className="text-sm text-muted-foreground italic">{t('project_detail.no_tasks')}</p>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Capture des idées</span>
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex -space-x-2">
                                                <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-200" />
                                                <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail
