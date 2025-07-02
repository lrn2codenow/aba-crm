import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ClientNotes from '@/app/components/ClientNotes';
import { ClientsProvider } from '@/app/context/ClientsContext';

jest.mock('@/lib/supabase');



describe('ClientNotes', () => {
  it('renders the component', () => {
    const client = { id: '1', name: 'Test Client', notes: [] };
    render(
      <ClientsProvider>
        <ClientNotes client={client} />
      </ClientsProvider>
    );

    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new note...')).toBeInTheDocument();
    expect(screen.getByText('Add Note')).toBeInTheDocument();
  });

  it('can add a new note', async () => {
    const client = { id: '1', name: 'Test Client', notes: [] };
    render(
      <ClientsProvider>
        <ClientNotes client={client} />
      </ClientsProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Add a new note...'), { target: { value: 'Test Note' } });
    fireEvent.click(screen.getByText('Add Note'));

    // You can add more assertions here to check if the note was added
    // and if the form was cleared.
  });
});
