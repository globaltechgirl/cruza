import { FileWithPath } from "@mantine/dropzone";

import { PaginatedResponse } from "./api";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  location: string;
  timezone: string;
  language: string;
  dateFormat: string;
  createdAt: string;
  lastLogin: string;
}

export interface CreateUserPayload {
  fullName: string;
  email: string;
  password: string;
  role: string; 
  phoneNumber: string;
  status: string;
}

export interface PaginatedUsersResponse extends PaginatedResponse {
  users: User[];
  totalPages: number;
  currentPage: number; 
}

export interface UploadDoc {
  documentName: string;
  documentType: string;
  startDate: string;
  expiryDate: string;
  file: FileWithPath | null;
}
