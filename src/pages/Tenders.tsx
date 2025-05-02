
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TenderList } from '@/components/tender/TenderList';
import { TenderDetails } from '@/components/tender/TenderDetails';
import { useParams } from 'react-router-dom';

const Tenders = () => {
  const { tenderId } = useParams();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {!tenderId ? (
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tenders</h1>
              <p className="text-muted-foreground mt-2">
                View, create, and manage procurement tenders.
              </p>
            </div>
            <TenderList />
          </>
        ) : (
          <TenderDetails />
        )}
      </div>
    </MainLayout>
  );
};

export default Tenders;
