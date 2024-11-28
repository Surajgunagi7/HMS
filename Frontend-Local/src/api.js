// Mocked backend login API
export const mockLogin = async ({ email, password }) => {
  // Mock database of doctor credentials
  const mockDatabase = {
    "doctor@example.com": "password123",
  };

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Validate credentials
  if (mockDatabase[email] && mockDatabase[email] === password) {
    return {
      token: "mockAuthToken123456", // Mocked token
    };
  } else {
    throw new Error("Invalid email or password");
  }
};
