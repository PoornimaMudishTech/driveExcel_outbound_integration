// Assistant Types
export interface Assistant {
  id: string;
  name: string;
  model?: string;
  voice?: string;
  createdAt?: string;
  [key: string]: string | undefined;
}

export interface AssistantsResponse {
  success: boolean;
  data: Assistant[];
  error?: string;
}

// Call Types
export type Language = 'english' | 'french' | 'spanish';

export interface CallRequest {
  assistantId: string;
  phoneNumber: string;
  language: Language;
  firstMessage?: string;
}

export interface Call {
  id: string;
  status: string;
  assistantId: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt?: string;
  [key: string]: string | undefined;
}

export interface CallResponse {
  success: boolean;
  data: Call;
  error?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}