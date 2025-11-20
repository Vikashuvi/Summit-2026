import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function ThreeDHeading({
    text,
    className,
    size = "text-6xl md:text-8xl",
    depth = 10,
    color = "gold" // gold or silver
}) {
    const words = text.split(' ')

    const goldGradient = "bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent"
    const silverGradient = "bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"

    const gradientClass = color === 'gold' ? goldGradient : silverGradient
    const shadowColor = color === 'gold' ? 'rgba(180, 83, 9, 0.5)' : 'rgba(75, 85, 99, 0.5)'

    return (
        <div className={cn("relative flex flex-wrap justify-center gap-x-4 perspective-1000", className)}>
            {words.map((word, wordIndex) => (
                <div key={wordIndex} className="relative group cursor-default">
                    {/* Shadow/Depth Layers */}
                    {[...Array(depth)].map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                "absolute inset-0 select-none",
                                size,
                                "font-bold tracking-tighter"
                            )}
                            style={{
                                color: shadowColor,
                                transform: `translateZ(-${i * 2}px) translateY(${i * 1}px)`,
                                opacity: 1 - (i / depth),
                                filter: `blur(${i * 0.5}px)`,
                                zIndex: -i
                            }}
                            aria-hidden="true"
                        >
                            {word}
                        </span>
                    ))}

                    {/* Main Text Layer */}
                    <motion.span
                        className={cn(
                            "relative block font-bold tracking-tighter",
                            size,
                            gradientClass
                        )}
                        initial={{ y: 20, opacity: 0, rotateX: 20 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: wordIndex * 0.2,
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{
                            scale: 1.05,
                            y: -10,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    )
}
