import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientTable from '@/app/components/ClientTable';
import { ClientsProvider } from '@/app/context/ClientsContext';

jest.mock('@/lib/supabase');



describe('ClientTable', () => {
  it('renders the table', () => {
    render(
      <ClientsProvider>
        <ClientTable />
      </ClientsProvider>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Stage')).toBeInTheDocument();
    expect(screen.getByText('Assigned To')).toBeInTheDocument();
    expect(screen.getByText('Time in Phase')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
