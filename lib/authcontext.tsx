import { createContext } from "react";

//Only put types that you want to use/display
export interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export const AuthContext = createContext<UserInfo | null>(null);
