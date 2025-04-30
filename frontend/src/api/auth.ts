import { axios } from './axios';

type ResigterAndLoginResponse = {
  username: string;
};

const AUTH_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  ME: '/me',
  LOGOUT: '/logout',
};

export async function loginUser(username: string, password: string) {
  const response = await axios.post<ResigterAndLoginResponse>(
    AUTH_ENDPOINTS.LOGIN,
    {
      username,
      password,
    }
  );
  return response.data;
}

export async function registerUser(username: string, password: string) {
  const response = await axios.post<ResigterAndLoginResponse>(
    AUTH_ENDPOINTS.REGISTER,
    {
      username,
      password,
    }
  );
  return response.data;
}

export async function checkCurrentUserFromAuth() {
  const response = await axios.get<ResigterAndLoginResponse>(AUTH_ENDPOINTS.ME);
  return response.data;
}

export async function logoutUser() {
  await axios.post(AUTH_ENDPOINTS.LOGOUT);
}
