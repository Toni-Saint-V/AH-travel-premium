import { Sparkles } from 'lucide-react'

interface DocumentsAIHintProps {
  message: string
}

export function DocumentsAIHint({ message }: DocumentsAIHintProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 flex-shrink-0">
        <Sparkles className="w-4 h-4 text-accent" />
      </div>
      <p className="text-body text-text-mid pt-1">{message}</p>
    </div>
  )
}
