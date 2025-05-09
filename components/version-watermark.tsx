import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import packageJson from "../package.json"

interface VersionWatermarkProps {
  className?: string
}

export function VersionWatermark({ className }: VersionWatermarkProps) {
  return (
    <div className={cn("fixed bottom-4 right-4 pointer-events-none z-50", className)}>
      <Badge 
        variant="outline"
        className="bg-background/50 backdrop-blur-sm text-xs font-mono"
      >
        v{packageJson.version}
      </Badge>
    </div>
  )
}