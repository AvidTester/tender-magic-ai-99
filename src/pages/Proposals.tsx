
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

const Proposals = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
          <p className="text-muted-foreground mt-2">
            View and manage vendor proposals for tenders.
          </p>
        </div>
        
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          <p>Proposals management interface will be implemented here.</p>
          <p className="text-sm mt-2">This page will display all proposals across different tenders.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Proposals;
