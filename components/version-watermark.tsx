import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import packageJson from "../package.json"
import { FormatSupportIndicator } from "@/components/format-support-indicator"

interface VersionWatermarkProps {
  className?: string
}

export function VersionWatermark({ className }: VersionWatermarkProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Badge 
        variant="outline"
        className="bg-background/50 backdrop-blur-sm text-xs font-mono"
      >
        v{packageJson.version}
      </Badge>
    </div>
  )
}