import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@gomoku/components';
import { registerUser } from '../lib/api.js';

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
        consent: formData.consent,
        timestamp: formData.timestamp
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (success) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        maxWidth: '500px',
        margin: '2rem auto'
      }}>
        <h2 style={{ color: '#28a745', marginBottom: '1rem' }}>
          Registration Successful!
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Your account has been created successfully.
        </p>
        <p style={{ color: '#6c757d' }}>
          Redirecting to home page...
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      padding: '0 1rem'
    }}>
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <RegisterForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        disabled={isLoading}
        showValidation={true}
      />
    </div>
  );
}