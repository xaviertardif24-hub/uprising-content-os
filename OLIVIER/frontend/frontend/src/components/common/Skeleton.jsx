import React from 'react'
import { motion } from 'framer-motion'

const Skeleton = ({ className, variant = 'rect' }) => {
    const variants = {
        rect: 'rounded-2xl',
        circle: 'rounded-full',
        text: 'rounded-lg h-4 w-full'
    }

    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1.5,
                ease: 'easeInOut'
            }}
            className={`bg-slate-200/60 relative overflow-hidden ${variants[variant]} ${className}`}
        >
            <motion.div
                animate={{
                    x: ['-100%', '100%']
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'linear'
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
        </motion.div>
    )
}

export default Skeleton
