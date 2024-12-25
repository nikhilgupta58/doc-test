import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useDocument } from '@/hooks/useDocument';

interface ProcessingStatusProps {
  documentId: string;
  onProcessingComplete: () => void;
}

export function ProcessingStatus({ documentId, onProcessingComplete }: ProcessingStatusProps) {
  const { data: status } = useDocument().getStatus(documentId);

  useEffect(() => {
    if (status?.status === 'EMBEDDINGS_SAVED') {
      onProcessingComplete();
    }
  }, [status?.status, onProcessingComplete]);

  return (
    <div className="space-y-4 text-center p-8">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      <div className="space-y-2">
        <h3 className="font-semibold">Processing Document</h3>
        <p className="text-sm text-muted-foreground">
          Please wait while we analyze your document...
        </p>
      </div>
      <Progress value={status?.status === 'EMBEDDINGS_SAVED' ? 100 : 33} />
    </div>
  );
}