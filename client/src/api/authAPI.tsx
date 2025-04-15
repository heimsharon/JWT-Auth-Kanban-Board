// Path: client/src/api/authAPI.tsx
// This file is used to make API calls related to authentication
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        throw new Error(`Error: ${errorData.message}`);
      }
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during user login:", error);

    return Promise.reject('Could not fetch user information');
  }
};

export { login };
