import { Assistant, Language } from './api.types';

export interface AssistantSelectorProps {
  assistants: Assistant[];
  selectedAssistant: Assistant | null;
  onSelectAssistant: (assistant: Assistant) => void;
  loading: boolean;
}

export interface CallFormProps {
  selectedAssistant: Assistant | null;
  onCallInitiated: () => void;
}

export interface FormState {
  phoneNumber: string;
  language: Language;
  firstMessage: string;
}

export interface FormErrors {
  phoneNumber?: string;
  language?: string;
  general?: string;
}