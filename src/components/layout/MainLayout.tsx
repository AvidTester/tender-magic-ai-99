
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useRole } from '@/context/RoleContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate('/select-role');
    }
  }, [role, navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          <footer className="py-4 px-6 text-center text-sm text-gray-500 border-t">
            Smart Procurement Platform v1.0 &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
