import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDocument } from '@/hooks/useDocument';
import { APP_CONFIG } from '@/lib/config';
import { toast } from 'sonner';

export function UploadForm() {
  const navigate = useNavigate();
  const { getUploadUrl, confirmUpload } = useDocument();
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState(APP_CONFIG.defaultCategory);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > APP_CONFIG.maxFileSize) {
      toast.error('File size exceeds the limit');
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!APP_CONFIG.allowedFileTypes.includes(`.${fileExtension}`)) {
      toast.error('File type not supported');
      return;
    }

    try {
      setIsUploading(true);
      const { presigned_url, document_id } = await getUploadUrl.mutateAsync({
        name: file.name,
        category,
      });

      await fetch(presigned_url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      await confirmUpload.mutateAsync(document_id);
      navigate(`/chat/${document_id}`);
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Document Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload Document</Label>
        <div className="flex items-center gap-4">
          <Input
            id="file"
            type="file"
            accept={APP_CONFIG.allowedFileTypes.join(',')}
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
          <Button
            asChild
            variant="outline"
            className="w-full h-32 border-dashed"
            disabled={isUploading}
          >
            <label htmlFor="file" className="cursor-pointer space-y-2">
              <Upload className="h-6 w-6 mx-auto" />
              <div className="text-sm text-muted-foreground">
                {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </div>
              <div className="text-xs text-muted-foreground">
                PDF, DOC, DOCX, TXT (max {APP_CONFIG.maxFileSize / 1024 / 1024}MB)
              </div>
            </label>
          </Button>
        </div>
      </div>
    </div>
  );
}