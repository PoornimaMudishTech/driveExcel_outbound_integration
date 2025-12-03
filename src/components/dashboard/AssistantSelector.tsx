import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { AssistantSelectorProps, Assistant } from '../../types';
import { Loader2 } from 'lucide-react';

const AssistantSelector: React.FC<AssistantSelectorProps> = ({
  assistants,
  selectedAssistant,
  onSelectAssistant,
  loading,
}) => {
  return (
    <Card className="db-h-full">
      <CardHeader>
        <CardTitle>Select an Assistant</CardTitle>
        <CardDescription>Choose an assistant to initiate an outgoing call</CardDescription>
      </CardHeader>

      <div className="db-p-6 db-pt-0">
        {loading ? (
          <div className="db-flex db-items-center db-justify-center db-py-12">
            <Loader2 className="db-w-8 db-h-8 db-animate-spin db-text-blue-600" />
          </div>
        ) : assistants.length === 0 ? (
          <div className="db-text-center db-py-12 db-text-gray-500">
            <p>No assistants available</p>
          </div>
        ) : (
          <div className="db-space-y-2 db-max-h-[600px] db-overflow-y-auto">
            {assistants.map((assistant: Assistant) => (
              <button
                key={assistant.id}
                onClick={() => onSelectAssistant(assistant)}
                className={`db-w-full db-text-left db-p-4 db-rounded-lg db-border-2 db-transition-all db-duration-200 ${
                  selectedAssistant?.id === assistant.id
                    ? 'db-bg-blue-50 db-border-blue-600'
                    : 'db-bg-white db-border-gray-200 hover:db-border-blue-300 hover:db-bg-gray-50'
                }`}
              >
                <div className="db-font-semibold db-text-gray-900 db-mb-1">
                  {assistant.name}
                </div>
                <div className="db-text-xs db-text-gray-500 db-font-mono">
                  {assistant.id}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default AssistantSelector;