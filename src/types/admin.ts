export interface AdminState {
  isAuthenticated: boolean;
  isAdminOpen: boolean;
}

export interface AdminCredentials {
  username: string;
  password: string;
}