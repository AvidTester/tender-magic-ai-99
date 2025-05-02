
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { Home, FilePlus, Send, Users, Award, FileCheck, Settings, HelpCircle, LogOut, FileText } from 'lucide-react';
import { useRole } from '@/context/RoleContext';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  const handleLogout = () => {
    setRole(null);
    navigate('/select-role');
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    const allUsers = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: Home,
      },
      {
        name: 'Tenders',
        path: '/tenders',
        icon: FileText,
      },
      {
        name: 'Help',
        path: '/help',
        icon: HelpCircle,
      },
    ];

    const procurementOfficerItems = [
      ...allUsers,
      {
        name: 'Proposals',
        path: '/proposals',
        icon: Send,
      },
      {
        name: 'Evaluations',
        path: '/evaluations',
        icon: Award,
      },
      {
        name: 'Vendors',
        path: '/vendors',
        icon: Users,
      },
      {
        name: 'Reports',
        path: '/reports',
        icon: FileCheck,
      },
      {
        name: 'Settings',
        path: '/settings',
        icon: Settings,
      },
    ];
    
    const evaluatorItems = [
      ...allUsers,
      {
        name: 'Proposals',
        path: '/proposals',
        icon: Send,
      },
      {
        name: 'Evaluations',
        path: '/evaluations',
        icon: Award,
      },
    ];
    
    const vendorItems = [
      ...allUsers,
      {
        name: 'My Proposals',
        path: '/proposals',
        icon: Send,
      },
    ];
    
    switch (role) {
      case 'procurement-officer':
        return procurementOfficerItems;
      case 'evaluator':
        return evaluatorItems;
      case 'vendor':
        return vendorItems;
      default:
        return allUsers;
    }
  };

  const menuItems = getMenuItems();

  const getRoleDisplayName = () => {
    switch (role) {
      case 'procurement-officer':
        return 'Procurement Officer';
      case 'evaluator':
        return 'Evaluator';
      case 'vendor':
        return 'Vendor';
      default:
        return 'Guest';
    }
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
        {role && (
          <div className="mt-2 px-2 py-1 bg-primary/10 rounded text-xs font-medium text-primary">
            {getRoleDisplayName()}
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {role === 'procurement-officer' && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === '/create-tender'}
                  >
                    <Link to="/create-tender">
                      <FilePlus className="h-5 w-5" />
                      <span>Create Tender</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Change Role</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
