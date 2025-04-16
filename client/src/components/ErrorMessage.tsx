import React from 'react';

interface ErrorMessageProps {
    message: string; // The error message to display
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null; // Don't render anything if there's no message

    return <div className="error-message">{message}</div>;
};

export default ErrorMessage;