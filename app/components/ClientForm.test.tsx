import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientForm from '@/app/components/ClientForm';
import { ClientsProvider } from '@/app/context/ClientsContext';

jest.mock('@/lib/supabase');



describe('ClientForm', () => {
  it('renders the form', () => {
    render(
      <ClientsProvider>
        <ClientForm />
      </ClientsProvider>
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Stage')).toBeInTheDocument();
    expect(screen.getByLabelText('Assigned To')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('Add Client')).toBeInTheDocument();
  });

  it('can add a new client', async () => {
    render(
      <ClientsProvider>
        <ClientForm />
      </ClientsProvider>
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Client' } });
    fireEvent.click(screen.getByText('Add Client'));

    // You can add more assertions here to check if the form was cleared
    // and if the success message was displayed.
  });
});
