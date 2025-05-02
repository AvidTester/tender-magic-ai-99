
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, FilePlus, Send, Users, Award, FileCheck, Settings, HelpCircle, LogOut, FileText, ChevronDown, ChevronRight } from 'lucide-react';

export function AppSidebar() {
  const location = useLocation();
  const [tenderSubmenuOpen, setTenderSubmenuOpen] = useState(true);

  const toggleTenderSubmenu = () => {
    setTenderSubmenuOpen(!tenderSubmenuOpen);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            SP
          </div>
          <div className="font-semibold text-sidebar-foreground">Smart Procurement</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Procurement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/'}
                >
                  <Link to="/">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Tenders with submenu */}
              <SidebarMenuItem>
                <div 
                  className="flex items-center w-full px-3 py-2 rounded-md text-sidebar-foreground cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={toggleTenderSubmenu}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  <span className="flex-1">Tenders</span>
                  {tenderSubmenuOpen ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </div>
              </SidebarMenuItem>

              {tenderSubmenuOpen && (
                <>
                  <SidebarMenuItem className="pl-6">
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/tenders'}
                    >
                      <Link to="/tenders">
                        <FileCheck className="h-4 w-4" />
                        <span>All Tenders</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="pl-6">
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === '/create-tender'}
                    >
                      <Link to="/create-tender">
                        <FilePlus className="h-4 w-4" />
                        <span>Create Tender</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/submissions'}
                >
                  <Link to="/submissions">
                    <Send className="h-5 w-5" />
                    <span>Submissions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/evaluations'}
                >
                  <Link to="/evaluations">
                    <Award className="h-5 w-5" />
                    <span>Evaluations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/vendors'}
                >
                  <Link to="/vendors">
                    <Users className="h-5 w-5" />
                    <span>Vendors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/reports'}
                >
                  <Link to="/reports">
                    <FileCheck className="h-5 w-5" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/settings'}
                >
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/help'}
                >
                  <Link to="/help">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenuButton asChild>
          <button className="w-full flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-accent-foreground">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
