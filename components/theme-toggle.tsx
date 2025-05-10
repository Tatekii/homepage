"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Avoid hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm border-chart-1/20 shadow-md hover:shadow-chart-1/20"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-chart-1" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-chart-1" />
      )}
    </Button>
  )
}
