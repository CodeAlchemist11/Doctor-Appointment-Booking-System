const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (
  endpoint,
  options = {}
) => {
  const token = localStorage.getItem("token");

  // Default headers
  const headers = {
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    ...options.headers,
  };

  // Only set Content-Type for JSON requests
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};