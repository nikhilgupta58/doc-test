import { Button } from '@/components/ui/button';
import { useDocument } from '@/hooks/useDocument';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DocumentActionsProps {
  documentId: string;
  status: string;
}

export function DocumentActions({ documentId, status }: DocumentActionsProps) {
  const navigate = useNavigate();
  const { processDocument } = useDocument();

  const handleProcess = async () => {
    try {
      await processDocument.mutateAsync(documentId);
      toast.success('Document processing started');
    } catch (error) {
      toast.error('Failed to process document');
    }
  };

  if (status === 'UPLOADED') {
    return (
      <Button 
        variant="secondary"
        size="sm"
        onClick={handleProcess}
        disabled={processDocument.isPending}
      >
        {processDocument.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Process
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(`/chat/${documentId}`)}
    >
      Chat
    </Button>
  );
}