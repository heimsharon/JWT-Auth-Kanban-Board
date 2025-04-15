// Path: client/src/api/ticketAPI.tsx
// This file is used to make API calls related to tickets
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

// This function is used to retrieve all tickets
const retrieveTickets = async () => {

  // Check if the API URL is defined
  try {

    const response = await fetch(
      '/api/tickets/',

      {

        // method: 'GET',
        headers: {

          'Content-Type': 'application/json',

          //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          Authorization: `Bearer ${Auth.getToken()}`

        }

      }

    );

    // Check if the response is ok
    const data = await response.json();


    if (!response.ok) {

      // If the response is not ok, handle the error
      throw new Error('invalid API response, check network tab!');

    }

    // Parse the response data
    return data;

  } catch (err) {

    // Handle any errors that occur during the fetch
    console.log('Error from data retrieval: ', err);

    // Return an empty array if there was an error
    return [];

  }

};

// This function is used to retrieve a single ticket by its ID
const retrieveTicket = async (id: number | null): Promise<TicketData> => {


  try {

    // Check if the API URL is defined
    const response = await fetch(
      `/api/tickets/${id}`,
      {
        // method: 'GET',
        headers: {

          // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Content-Type': 'application/json',

          Authorization: `Bearer ${Auth.getToken()}`

        }

      }

    );

    // Check if the response is ok
    const data = await response.json();

    // If the response is not ok, handle the error
    if (!response.ok) {

      throw new Error('Invalid API response, check network tab!');

    }
    // Parse the response data
    return data;

  } catch (err) {

    // Handle the error
    console.log('Error from data retrieval: ', err);

    // Return an empty object if there was an error
    return Promise.reject('Could not fetch singular ticket');
  }
}
// This function is used to create a new ticket
const createTicket = async (body: TicketData) => {

  try {
    // Check if the API URL is defined
    const response = await fetch(

      '/api/tickets/', {

      // method: 'POST',
      method: 'POST',

      headers: {

        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`

      },

      // Send the ticket data in the request body
      body: JSON.stringify(body)
    }

    )
    const data = response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from Ticket Creation: ', err);
    return Promise.reject('Could not create ticket');
  }
}

const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch(
      `/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    }
    )
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    }
    )
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting ticket', err);
    return Promise.reject('Could not delete ticket');
  }
};


export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };
