"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface MouseTrackingDivProps {
	children: React.ReactNode
	className?: string
	trackingIntensity?: number
}

export function MouseTrackingDiv({ children, className, trackingIntensity = 20, ...props }: MouseTrackingDivProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [isHovered, setIsHovered] = useState(false)

	// Using MotionValues to avoid unnecessary re-renders
	const rotateX = useMotionValue(0)
	const rotateY = useMotionValue(0)

	// Spring animation for smoother motion
	const springConfig = { damping: 15, stiffness: 300, mass: 0.5 }
	const springRotateX = useSpring(rotateX, springConfig)
	const springRotateY = useSpring(rotateY, springConfig)

	// Track mouse position globally
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!ref.current) return
			
			const rect = ref.current.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2
			
			// Calculate the angle between mouse and div center
			const deltaX = e.clientX - centerX
			const deltaY = e.clientY - centerY
			
			// Adjust intensity when hovering vs. not hovering
			const intensity = isHovered ? trackingIntensity : trackingIntensity * 1.5
			
			// Update motion values directly
			rotateX.set(-deltaY / intensity)
			rotateY.set(deltaX / intensity)
		}
		
		// Add window-level event listener
		window.addEventListener("mousemove", handleMouseMove)
		
		// Clean up
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [isHovered, trackingIntensity, rotateX, rotateY])
	
	// Handle hover state
	const handleMouseEnter = () => setIsHovered(true)
	const handleMouseLeave = () => setIsHovered(false)

	return (
		<motion.div
			ref={ref}
			className={cn("relative inline-block", className)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				transformStyle: "preserve-3d",
				rotateX: springRotateX,
				rotateY: springRotateY,
			}}
			{...props}
		>
			{children}
		</motion.div>
	)
}
