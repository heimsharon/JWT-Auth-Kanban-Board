// Path: client/src/api/userAPI.tsx
// This file is used to make API calls related to users

import Auth from '../utils/auth';

// Function to retrieve users from the API
const retrieveUsers = async (): Promise<any[]> => {
  try {
    // Fetch the users from the API
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    // Parse the response data
    const data = await response.json();

    // Check if the response is not ok
    if (!response.ok) {
      const errorMessage = data?.message || 'Failed to retrieve users';
      throw new Error(`Error: ${errorMessage}`);
    }

    // Return the retrieved data
    return data;
  } catch (err) {
    // Log the error and return an empty array
    console.error('Error retrieving users:', err);
    return [];
  }
};

export { retrieveUsers };
