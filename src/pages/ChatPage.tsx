import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { ProcessingStatus } from '@/components/chat/ProcessingStatus';
import { useChat } from '@/hooks/useChat';
import { toast } from 'sonner';

export function ChatPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const [isProcessing, setIsProcessing] = useState(true);
  const { sendMessage, chatHistory } = useChat(documentId!);

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage.mutateAsync(message);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  if (!documentId) return null;

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)]">
      <Card className="h-full flex flex-col overflow-y-auto">
        <CardHeader>
          <CardTitle>Chat with Your Document</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {isProcessing ? (
            <ProcessingStatus
              documentId={documentId}
              onProcessingComplete={() => setIsProcessing(false)}
            />
          ) : (
            <>
              <ScrollArea className="flex-1 pr-4 overflow-y-auto">
                <div className="space-y-4">
                  {chatHistory?.map((chat, index) => (
                    <div key={index} className="space-y-4">
                      <ChatMessage
                        message={chat.user_message}
                        isUser={true}
                        timestamp={chat.created_at}
                      />
                      <ChatMessage
                        message={chat.agent_response}
                        isUser={false}
                        timestamp={chat.created_at}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={sendMessage.isPending}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}