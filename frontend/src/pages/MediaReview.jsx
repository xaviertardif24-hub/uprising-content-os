import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Send, MessageCircle, Clock, Play, SkipBack, SkipForward, Maximize2, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useClipflowStore } from '../store/useClipflowStore'

const MediaReview = () => {
    const { t } = useTranslation()
    const { id } = useParams()
    const navigate = useNavigate()
    const { comments, addComment } = useClipflowStore()
    const [commentText, setCommentText] = useState('')

    const mediaComments = comments.filter(c => c.mediaId === id)

    const handleAddComment = () => {
        if (!commentText.trim()) return
        addComment({
            mediaId: id,
            user: 'Kael', // Mock user
            time: '0:12', // Mock timestamp
            text: commentText
        })
        setCommentText('')
    }

    return (
        <div className="flex h-full bg-[#0a0a0a] text-white">
            {/* Main Player Area */}
            <div className="flex-1 flex flex-col relative">
                <header className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/60 to-transparent">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg"
                    >
                        <ChevronLeft className="w-4 h-4" /> {t('common.back')}
                    </button>
                    <div className="text-center">
                        <h2 className="text-sm font-semibold">Intro Hook V1 - Review</h2>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">YouTube Series</span>
                    </div>
                    <div className="w-20" /> {/* Spacer */}
                </header>

                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="aspect-video w-full max-w-5xl rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl relative group">
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                            className="w-full h-full object-cover opacity-80"
                            alt="Preview"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all">
                                <Play className="w-10 h-10 fill-current" />
                            </button>
                        </div>

                        {/* Video Controls Overlay */}
                        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="h-1 w-full bg-white/20 rounded-full mb-6 relative overflow-hidden">
                                <div className="absolute inset-y-0 left-0 w-1/3 bg-primary" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <SkipBack className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                                    <Play className="w-6 h-6 fill-current cursor-pointer hover:text-primary transition-colors" />
                                    <SkipForward className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                                    <span className="text-xs font-mono">0:12 / 0:45</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <Settings className="w-5 h-5 cursor-pointer" />
                                    <Maximize2 className="w-5 h-5 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Feedback */}
            <div className="w-[400px] border-l border-white/10 bg-zinc-900/50 backdrop-blur-xl flex flex-col">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-primary" /> {t('media_review.feedback')}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10">{t('media_review.comments', { count: mediaComments.length })}</span>
                </div>

                <div className="flex-1 overflow-auto p-6 space-y-6">
                    {mediaComments.map((item) => (
                        <div key={item.id} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold uppercase">
                                        {item.user[0]}
                                    </div>
                                    <span className="text-xs font-bold">{item.user}</span>
                                </div>
                                <span className="text-[10px] text-zinc-500">{item.date}</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-transparent hover:border-primary/30 transition-all cursor-pointer">
                                <div className="flex items-center gap-2 mb-1 text-primary">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-xs font-mono font-bold">{item.time}</span>
                                </div>
                                <p className="text-xs text-zinc-300 leading-relaxed">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-white/10">
                    <div className="relative">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder={t('media_review.leave_comment', { time: '0:12' })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none h-24"
                        />
                        <button
                            onClick={handleAddComment}
                            className="absolute bottom-3 right-3 p-2 bg-primary rounded-xl hover:bg-primary/90 transition-all"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaReview
