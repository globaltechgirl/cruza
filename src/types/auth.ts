import type { UseFormReturnType } from "@mantine/form";

import { User } from "@/types/user";

// export interface TokenResponse {
//   access_token: string;
//   expires_at: string;
// }

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface changePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

//extra: TokenResponse;
export interface LoginFormProps {
    form: UseFormReturnType<LoginValues>;
    handleSubmit: (values: LoginValues) => void;
    loading: boolean;
}