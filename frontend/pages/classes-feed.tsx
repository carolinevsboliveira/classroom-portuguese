import React from 'react';
import { ClassCard, ClassList } from '../src/components';
import { QueryClient, QueryClientProvider } from 'react-query';
function ClassFeed() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ClassList />
    </QueryClientProvider>
  );
}

export default ClassFeed;
