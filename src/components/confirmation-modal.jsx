import React from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, state, title, message }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/40 bg-opacity-50 flex items-center font-nunito justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto transform animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            {state === 'success' ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {title || (state === 'success' ? 'Success!' : 'Error Occurred')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center">
            <div className="mb-4">
              {state === 'success' ? (
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              ) : (
                <XCircle className="h-16 w-16 text-red-600 mx-auto" />
              )}
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {message || (state === 'success'
                ? 'Your action has been completed successfully. All changes have been saved and applied.'
                : 'We encountered an error while processing your request. Please try again or contact support if the problem persists.')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          {state === 'success' ? (
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Continue
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;