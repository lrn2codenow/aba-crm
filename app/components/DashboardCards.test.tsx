import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardCards from '@/app/components/DashboardCards';
import { ClientsProvider } from '@/app/context/ClientsContext';

jest.mock('@/lib/supabase');



describe('DashboardCards', () => {
  it('renders the cards', () => {
    render(
      <ClientsProvider>
        <DashboardCards />
      </ClientsProvider>
    );

    expect(screen.getByText('Total Clients')).toBeInTheDocument();
    expect(screen.getByText('Evaluation')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Active Services')).toBeInTheDocument();
  });
});
