// Path: client/src/api/ticketAPI.tsx
// This file is used to make API calls related to tickets

import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

// Helper function to get common headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${Auth.getToken()}`,
});

// Retrieve all tickets
const retrieveTickets = async (): Promise<TicketData[]> => {
  try {
    const response = await fetch('/api/tickets/', {
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to retrieve tickets: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (err) {
    console.error('Error retrieving tickets:', err);
    return [];
  }
};

// Retrieve a single ticket by ID
const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    const response = await fetch(`/api/tickets/${id}`, {
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to retrieve ticket: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (err) {
    console.error('Error retrieving ticket:', err);
    return Promise.reject('Could not fetch the ticket');
  }
};

// Create a new ticket
const createTicket = async (body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch('/api/tickets/', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to create ticket: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (err) {
    console.error('Error creating ticket:', err);
    return Promise.reject('Could not create the ticket');
  }
};

// Update an existing ticket
const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to update ticket: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (err) {
    console.error('Error updating ticket:', err);
    return Promise.reject('Could not update the ticket');
  }
};

// Delete a ticket
const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to delete ticket: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (err) {
    console.error('Error deleting ticket:', err);
    return Promise.reject('Could not delete the ticket');
  }
};

export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };
