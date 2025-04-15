// Path: client/src/api/userAPI.tsx
// This file is used to make API calls related to users
import Auth from '../utils/auth';

// Function to retrieve users from the API
const retrieveUsers = async () => {
  try {
    // Fetch the users from the API
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    // Check if the response is ok
    const data = await response.json();

    if(!response.ok) {
      // If the response is not ok, check if the user is unauthorized
      throw new Error ('invalid user API response, check network tab!');
    }

    return data;
// If the response is ok, return the data
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };
