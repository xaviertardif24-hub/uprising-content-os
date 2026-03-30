import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, MessageSquare, Info, AlertCircle } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

const NotificationDropdown = ({ isOpen, onClose }) => {
    const { notifications, isLoading, error, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen, fetchNotifications]);

    if (!isOpen) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'mention': return MessageSquare;
            case 'update': return Info;
            default: return Bell;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-[380px] bg-white dark:bg-[#191919] rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#efefef] dark:border-[#2F2F2F] z-[100] overflow-hidden"
            >
                <div className="p-4 border-b border-[#efefef] dark:border-[#2F2F2F] flex items-center justify-between">
                    <h3 className="font-semibold text-[14px]">Mises à jour</h3>
                    {notifications.some(n => n.is_unread) && (
                        <button
                            onClick={markAllAsRead}
                            className="text-[12px] text-blue-500 hover:text-blue-600 font-medium"
                        >
                            Tout marquer comme lu
                        </button>
                    )}
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {isLoading ? (
                        <div className="p-8 text-center text-[#91918E]">
                            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-[12px]">Chargement...</p>
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">
                            <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                            <p className="text-[12px]">{error}</p>
                        </div>
                    ) : notifications.length > 0 ? (
                        <div className="divide-y divide-[#efefef] dark:divide-[#2F2F2F]">
                            {notifications.map((notif) => {
                                const Icon = getIcon(notif.type);
                                return (
                                    <div
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-4 hover:bg-[#F7F7F5] dark:hover:bg-[#2F2F2F]/30 transition-colors cursor-pointer flex gap-3 relative ${notif.is_unread ? 'bg-blue-50/30 dark:bg-blue-500/5' : ''}`}
                                    >
                                        {notif.avatar_url ? (
                                            <img src={notif.avatar_url} alt={notif.user_name} className="w-8 h-8 rounded-full flex-shrink-0" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                                <Icon size={14} className="text-white" />
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] leading-relaxed">
                                                <span className="font-bold">{notif.user_name}</span> {notif.content}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[11px] text-[#91918E]">Récemment</span>
                                                {notif.is_unread && <span className="w-1 h-1 rounded-full bg-blue-500"></span>}
                                            </div>
                                        </div>

                                        {notif.is_unread && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-[#91918E]">
                            <Bell size={32} className="mx-auto mb-3 opacity-20" />
                            <p className="text-[14px]">Aucune nouvelle mise à jour</p>
                        </div>
                    )}
                </div>

                <div className="p-3 bg-[#F7F7F5] dark:bg-[#191919] border-t border-[#efefef] dark:border-[#2F2F2F] text-center">
                    <button className="text-[12px] text-[#91918E] hover:text-black dark:hover:text-white transition-colors">
                        Voir tout l'historique
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationDropdown;
