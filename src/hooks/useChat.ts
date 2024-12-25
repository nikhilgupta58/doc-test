import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface ChatMessage {
  user_message: string;
  agent_response: string;
  created_at: string;
}

export function useChat(documentId: string) {
  const queryClient = useQueryClient();
  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const { data } = await axiosInstance.post(
        `/api/chat/send?document_id=${documentId}&message=${message}`
      );
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["chat-history"],
      });
    },
  });

  const { data: chatHistory } = useQuery({
    queryKey: ["chat-history", documentId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ chats: ChatMessage[] }>(
        `/api/chat/history/${documentId}`
      );
      return data.chats;
    },
    enabled: !!documentId,
  });

  return {
    sendMessage,
    chatHistory,
  };
}
