import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadForm } from '@/components/document/UploadForm';
import { DocumentList } from '@/components/document/DocumentList';

export function DocumentUploadPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
          <CardDescription>
            Upload new documents or chat with your existing ones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documents">
            <TabsList className="mb-4">
              <TabsTrigger value="documents">My Documents</TabsTrigger>
              <TabsTrigger value="upload">Upload New</TabsTrigger>
            </TabsList>
            <TabsContent value="documents">
              <DocumentList />
            </TabsContent>
            <TabsContent value="upload">
              <UploadForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}