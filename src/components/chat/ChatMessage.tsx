import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {message}
        </ReactMarkdown>
        <time className="text-xs opacity-70">
          {new Date(timestamp).toLocaleTimeString()}
        </time>
      </div>
    </div>
  );
}
