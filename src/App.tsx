
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { RoleProtectedRoute } from "@/components/layout/RoleProtectedRoute";
import Index from "./pages/Index";
import Tenders from "./pages/Tenders";
import TenderDetail from "./pages/TenderDetail";
import CreateTender from "./pages/CreateTender";
import Proposals from "./pages/Proposals";
import ProposalDetail from "./pages/ProposalDetail";
import Vendors from "./pages/Vendors";
import Evaluations from "./pages/Evaluations";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Navigate to="/select-role" replace />
            } />
            <Route path="/select-role" element={<RoleSelection />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route path="/dashboard" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer', 'evaluator', 'vendor']}>
                <Index />
              </RoleProtectedRoute>
            } />
            
            <Route path="/tenders" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer', 'evaluator', 'vendor']}>
                <Tenders />
              </RoleProtectedRoute>
            } />
            
            <Route path="/tender/:tenderId" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer', 'evaluator', 'vendor']}>
                <TenderDetail />
              </RoleProtectedRoute>
            } />
            
            <Route path="/create-tender" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer']}>
                <CreateTender />
              </RoleProtectedRoute>
            } />
            
            <Route path="/proposals" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer', 'evaluator', 'vendor']}>
                <Proposals />
              </RoleProtectedRoute>
            } />
            
            <Route path="/proposal/:proposalId" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer', 'evaluator', 'vendor']}>
                <ProposalDetail />
              </RoleProtectedRoute>
            } />
            
            <Route path="/vendors" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer']}>
                <Vendors />
              </RoleProtectedRoute>
            } />
            
            <Route path="/evaluations" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer', 'evaluator']}>
                <Evaluations />
              </RoleProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer']}>
                <Reports />
              </RoleProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer']}>
                <Settings />
              </RoleProtectedRoute>
            } />
            
            <Route path="/help" element={
              <RoleProtectedRoute allowedRoles={['procurement-officer', 'evaluator', 'vendor']}>
                <Help />
              </RoleProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
