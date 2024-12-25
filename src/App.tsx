import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { ProtectedLayout } from '@/components/layouts/ProtectedLayout';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DocumentUploadPage } from '@/pages/DocumentUploadPage';
import { ChatPage } from '@/pages/ChatPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<DocumentUploadPage />} />
            <Route path="/chat/:documentId" element={<ChatPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;