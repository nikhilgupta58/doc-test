import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

interface Document {
  id: string;
  name: string;
  category: string;
  status: string;
  created_at: string;
}

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ documents: Document[] }>('/api/documents');
      return data.documents;
    },
  });
}