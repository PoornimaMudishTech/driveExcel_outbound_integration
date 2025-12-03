import { 
  Assistant, 
  AssistantsResponse, 
  CallRequest, 
  CallResponse, 
  ApiError 
} from '../types';

const BASE_URL = 'https://api.cex.techedge-solution.tech/vapi/api';
// const BASE_URL = 'https://bf6d44c24af3.ngrok-free.app/api';

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(errorData.error || 'An error occurred');
    }
    return response.json();
  }

  async getAssistants(): Promise<Assistant[]> {
    try {
      const response = await fetch(`${BASE_URL}/assistants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: AssistantsResponse = await this.handleResponse(response);
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch assistants');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching assistants:', error);
      throw error;
    }
  }

  async initiateCall(callData: CallRequest): Promise<CallResponse> {
    try {
      // Validate phone number format
      if (!this.isValidE164(callData.phoneNumber)) {
        throw new Error('Invalid phone number format. Must be in E.164 format (e.g., +1234567890)');
      }

      const response = await fetch(`${BASE_URL}/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(callData),
      });

      const data: CallResponse = await this.handleResponse(response);
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to initiate call');
      }

      return data;
    } catch (error) {
      console.error('Error initiating call:', error);
      throw error;
    }
  }

 
  private isValidE164(phoneNumber: string): boolean {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phoneNumber);
  }
}

export const apiService = new ApiService();