// Path: client/src/api/authAPI.tsx
// This file is used to make API calls related to authentication
import { UserLogin } from "../interfaces/UserLogin";

// This function is used to log in a user
const login = async (userInfo: UserLogin) => {
  try {
    // Check if the API URL is defined
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send the user information in the request body
      body: JSON.stringify(userInfo),
    });
  // Check if the response is ok
    if (!response.ok) {
      // If the response is not ok, handle the error
      const errorData = await response.json();
      if (errorData && errorData.message) {
        throw new Error(`Error: ${errorData.message}`);
      }
      throw new Error("Login failed");
    }
// Parse the response data
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error during user login:", error);

    return Promise.reject('Could not fetch user information');
  }
};

export { login };
