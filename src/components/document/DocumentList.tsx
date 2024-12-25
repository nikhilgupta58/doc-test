import { FileText, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDocuments } from '@/hooks/useDocuments';
import { DocumentActions } from './DocumentActions';

export function DocumentList() {
  const { data: documents, isLoading } = useDocuments();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!documents?.length) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/50">
        <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">No documents found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Uploaded</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="font-medium">{doc.name}</TableCell>
            <TableCell className="capitalize">{doc.category}</TableCell>
            <TableCell className="capitalize">{doc.status.toLowerCase()}</TableCell>
            <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <DocumentActions documentId={doc.id} status={doc.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}