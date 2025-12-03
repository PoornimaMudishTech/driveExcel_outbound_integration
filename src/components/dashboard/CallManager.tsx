import React, { useState, useEffect } from 'react';
import AssistantSelector from './AssistantSelector';
import CallForm from './CallForm';
import { Assistant } from '../../types';
import { apiService } from '../../services/api.service';
import { Phone, AlertCircle } from 'lucide-react';

const CallManager: React.FC = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAssistants();
  }, []);

  const loadAssistants = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAssistants();
      setAssistants(data);
      
      // Auto-select first assistant if available
      if (data.length > 0 && !selectedAssistant) {
        setSelectedAssistant(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assistants');
    } finally {
      setLoading(false);
    }
  };

  const handleCallInitiated = (): void => {
    console.log('Call initiated successfully');
  };

  return (
    <div id="driver-bot-root" className="db-min-h-screen db-bg-gray-50 db-py-8">
      {/* Header */}
      <div className="db-max-w-7xl db-mx-auto db-px-4 sm:db-px-6 lg:db-px-8 db-mb-8">
        <div className="db-text-center">
          <div className="db-flex db-items-center db-justify-center db-gap-3 db-mb-4">
            <Phone className="db-w-10 db-h-10 db-text-blue-600" />
            <h1 className="db-text-4xl db-font-bold db-text-gray-900">
              DriveExcel Call Manager
            </h1>
          </div>
          <p className="db-text-xl db-text-gray-600">
            Manage your DriveExcel assistants and initiate outgoing calls
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="db-max-w-7xl db-mx-auto db-px-4 sm:db-px-6 lg:db-px-8 db-mb-6">
          <div className="db-bg-red-50 db-border db-border-red-200 db-rounded-lg db-p-4">
            <div className="db-flex db-items-center db-gap-3">
              <AlertCircle className="db-w-6 db-h-6 db-text-red-600 db-flex-shrink-0" />
              <div>
                <h3 className="db-font-semibold db-text-red-900 db-mb-1">Error Loading Assistants</h3>
                <p className="db-text-sm db-text-red-700">{error}</p>
                <button
                  onClick={loadAssistants}
                  className="db-mt-2 db-text-sm db-text-red-700 db-underline hover:db-text-red-900"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="db-max-w-7xl db-mx-auto db-px-4 sm:db-px-6 lg:db-px-8">
        <div className="db-grid lg:db-grid-cols-2 db-gap-6">
          <AssistantSelector
            assistants={assistants}
            selectedAssistant={selectedAssistant}
            onSelectAssistant={setSelectedAssistant}
            loading={loading}
          />

          <CallForm
            selectedAssistant={selectedAssistant}
            onCallInitiated={handleCallInitiated}
          />
        </div>
      </div>
    </div>
  );
};

export default CallManager;