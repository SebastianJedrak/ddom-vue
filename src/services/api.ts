export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Fetch data from API with error handling
 * @param endpoint API endpoint to fetch from
 * @returns Promise with response data
 * @throws ApiError with status code and message
 */
async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    // Check if response is OK
    if (!response.ok) {
      throw new ApiError(
        `API request failed with status: ${response.status}`,
        response.status
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
}

/**
 * Get all users from the API
 * @returns Promise with array of users
 */
export async function getUsers(): Promise<User[]> {
  return fetchData<User[]>("/users");
}

/**
 * Get a single user by ID
 * @param id User ID to fetch
 * @returns Promise with user data
 */
export async function getUserById(id: number): Promise<User> {
  return fetchData<User>(`/users/${id}`);
}

export default {
  getUsers,
  getUserById,
};
