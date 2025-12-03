import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { CallFormProps, FormState, FormErrors, Language } from '../../types';
import { apiService } from '../../services/api.service';
import { Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const CallForm: React.FC<CallFormProps> = ({ selectedAssistant, onCallInitiated }) => {
  const [formState, setFormState] = useState<FormState>({
    phoneNumber: '',
    language: 'english',
    firstMessage: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formState.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+[1-9]\d{1,14}$/.test(formState.phoneNumber)) {
      newErrors.phoneNumber = 'Must be in E.164 format (e.g., +1234567890)';
    }

    if (!formState.language) {
      newErrors.language = 'Language is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!selectedAssistant) {
      setErrors({ general: 'Please select an assistant first' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const response = await apiService.initiateCall({
        assistantId: selectedAssistant.id,
        phoneNumber: formState.phoneNumber,
        language: formState.language,
        firstMessage: formState.firstMessage || undefined,
      });

      if (response.success) {
        setSuccess(true);
        setFormState({
          phoneNumber: '',
          language: 'english',
          firstMessage: '',
        });
        onCallInitiated();

        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to initiate call',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="db-h-full">
      <CardHeader>
        <CardTitle>Initiate Outgoing Call</CardTitle>
        <CardDescription>
          Configure and initiate a call with {selectedAssistant?.name || 'selected assistant'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!selectedAssistant ? (
          <div className="db-flex db-items-center db-justify-center db-py-12 db-text-gray-500">
            <div className="db-text-center">
              <Phone className="db-w-12 db-h-12 db-mx-auto db-mb-4 db-text-gray-400" />
              <p>Please select an assistant to continue</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="db-space-y-6">
            {/* Phone Number */}
            <div className="db-space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="db-text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+14086221882"
                value={formState.phoneNumber}
                onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value })}
                className={errors.phoneNumber ? 'db-border-red-500' : ''}
              />
              <p className="db-text-xs db-text-gray-500">
                Must be in E.164 format (e.g., +1234567890)
              </p>
              {errors.phoneNumber && (
                <p className="db-text-xs db-text-red-500 db-flex db-items-center db-gap-1">
                  <AlertCircle className="db-w-3 db-h-3" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Language */}
            <div className="db-space-y-2">
              <Label htmlFor="language">
                Language <span className="db-text-red-500">*</span>
              </Label>
              <Select
                id="language"
                value={formState.language}
                onChange={(e) => setFormState({ ...formState, language: e.target.value as Language })}
                className={errors.language ? 'db-border-red-500' : ''}
              >
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
              </Select>
              {errors.language && (
                <p className="db-text-xs db-text-red-500 db-flex db-items-center db-gap-1">
                  <AlertCircle className="db-w-3 db-h-3" />
                  {errors.language}
                </p>
              )}
            </div>

            {/* First Message (Optional) */}
            <div className="db-space-y-2">
              <Label htmlFor="firstMessage">First Message (Optional)</Label>
              <textarea
                id="firstMessage"
                placeholder="Enter a custom first message to override the assistant's default greeting..."
                value={formState.firstMessage}
                onChange={(e) => setFormState({ ...formState, firstMessage: e.target.value })}
                rows={4}
                className="db-flex db-w-full db-rounded-md db-border db-border-input db-bg-background db-px-3 db-py-2 db-text-sm db-ring-offset-background placeholder:db-text-muted-foreground focus-visible:db-outline-none focus-visible:db-ring-2 focus-visible:db-ring-ring focus-visible:db-ring-offset-2 disabled:db-cursor-not-allowed disabled:db-opacity-50 db-resize-none"
              />
              <p className="db-text-xs db-text-gray-500">
                Leave empty to use the assistant's default first message
              </p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="db-bg-red-50 db-border db-border-red-200 db-rounded-md db-p-4">
                <div className="db-flex db-items-center db-gap-2 db-text-red-800">
                  <AlertCircle className="db-w-5 db-h-5" />
                  <p className="db-text-sm db-font-medium">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="db-bg-green-50 db-border db-border-green-200 db-rounded-md db-p-4">
                <div className="db-flex db-items-center db-gap-2 db-text-green-800">
                  <CheckCircle className="db-w-5 db-h-5" />
                  <p className="db-text-sm db-font-medium">Call initiated successfully!</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="db-w-full"
              disabled={loading || !selectedAssistant}
            >
              {loading ? (
                <>
                  <Loader2 className="db-mr-2 db-h-5 db-w-5 db-animate-spin" />
                  Initiating Call...
                </>
              ) : (
                <>
                  <Phone className="db-mr-2 db-h-5 db-w-5" />
                  Initiate Call
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default CallForm;