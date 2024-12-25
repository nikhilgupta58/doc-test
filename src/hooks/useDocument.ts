import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface UploadUrlResponse {
  document_id: string;
  presigned_url: string;
  status: string;
}

interface DocumentStatus {
  document_id: string;
  status: string;
  updated_at: string;
}

export function useDocument() {
  const queryClient = useQueryClient();
  const getUploadUrl = useMutation({
    mutationFn: async ({
      name,
      category,
    }: {
      name: string;
      category: string;
    }) => {
      const { data } = await axiosInstance.post<UploadUrlResponse>(
        "/api/documents/upload-url",
        { name, category }
      );
      return data;
    },
  });

  const confirmUpload = useMutation({
    mutationFn: async (document_id: string) => {
      const { data } = await axiosInstance.post(
        "/api/documents/confirm-upload",
        {
          document_id,
        }
      );
      return data;
    },
  });

  const getStatus = (documentId: string) =>
    useQuery({
      queryKey: ["document-status", documentId],
      queryFn: async () => {
        const { data } = await axiosInstance.get<DocumentStatus>(
          `/api/documents/status/${documentId}`
        );
        return data;
      },
      enabled: !!documentId,
      refetchInterval: (data) =>
        data?.status === "EMBEDDINGS_SAVED" ? false : 5000,
    });

  const processDocument = useMutation({
    mutationFn: async (documentId: string) => {
      const { data } = await axiosInstance.post(
        `/api/documents/process-document?document_id=${documentId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  return {
    getUploadUrl,
    confirmUpload,
    getStatus,
    processDocument,
  };
}
