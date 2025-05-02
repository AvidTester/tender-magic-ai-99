
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tenders from "./pages/Tenders";
import TenderDetail from "./pages/TenderDetail";
import CreateTender from "./pages/CreateTender";
import Proposals from "./pages/Proposals";
import Vendors from "./pages/Vendors";
import Evaluations from "./pages/Evaluations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/tender/:tenderId" element={<TenderDetail />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
