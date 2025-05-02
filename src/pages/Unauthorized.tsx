
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-lg shadow">
        <div className="mx-auto bg-red-100 w-16 h-16 flex items-center justify-center rounded-full">
          <AlertCircle size={32} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">
          {role ? 
            `Your current role (${role.replace('-', ' ')}) doesn't have permission to access this page.` : 
            'You need to select a role to access this page.'}
        </p>
        <div className="flex flex-col gap-4">
          <Button onClick={() => navigate('/')} variant="default">
            Go to Dashboard
          </Button>
          <Button onClick={() => navigate('/select-role')} variant="outline">
            Change Role
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
