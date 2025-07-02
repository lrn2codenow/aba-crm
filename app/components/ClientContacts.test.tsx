import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientContacts from '@/app/components/ClientContacts';
import { ClientsProvider } from '@/app/context/ClientsContext';

jest.mock('@/lib/supabase');



describe('ClientContacts', () => {
  it('renders the component', () => {
    const client = { id: '1', name: 'Test Client', contacts: [] };
    render(
      <ClientsProvider>
        <ClientContacts client={client} />
      </ClientsProvider>
    );

    expect(screen.getByText('Contacts')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
  });

  it('can add a new contact', async () => {
    const client = { id: '1', name: 'Test Client', contacts: [] };
    render(
      <ClientsProvider>
        <ClientContacts client={client} />
      </ClientsProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test Contact' } });
    fireEvent.click(screen.getByText('Add Contact'));

    // You can add more assertions here to check if the contact was added
    // and if the form was cleared.
  });
});
