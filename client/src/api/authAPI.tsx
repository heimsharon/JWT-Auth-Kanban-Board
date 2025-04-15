// Path: client/src/api/authAPI.tsx
// This file is used to make API calls related to authentication

import { UserLogin } from "../interfaces/UserLogin";
import { UserData } from "../interfaces/UserData"; // Import UserData

// This function is used to log in a user
const login = async (userInfo: UserLogin): Promise<{ token: string; user: UserData }> => {

  try {
    // Make the API call to log in the user
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // Check if the response is not ok
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Login failed";
      throw new Error(`Error: ${errorMessage}`);
    }

    // Parse and return the response data
    const data: { token: string; user: UserData } = await response.json(); // Use UserData type
    return data;
  } catch (error) {
    // Log the error and reject the promise with a message
    console.error("Error during user login:", error);
    return Promise.reject("Could not log in the user. Please try again.");
  }
};

export { login };
