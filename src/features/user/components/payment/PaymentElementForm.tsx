
import React, { useState, FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// =============================================================================
// COMPONENT PROPS
// =============================================================================

interface PaymentElementFormProps {
  // Optional: Return URL after successful payment
  returnUrl?: string;
  
  // Callbacks
  onSuccess?: (paymentIntent: unknown) => void;
  onError?: (error: string) => void;
  onProcessing?: () => void;
  
  // Optional: Custom button text
  buttonText?: string;
  
  // Optional: Show billing address collection
  collectBillingAddress?: boolean;
}

// =============================================================================
// PAYMENT ELEMENT FORM COMPONENT
// =============================================================================

const PaymentElementForm: React.FC<PaymentElementFormProps> = ({
  returnUrl,
  onSuccess,
  onError,
  onProcessing,
  buttonText = 'Pay Now',
  collectBillingAddress = false,
}) => {
  // ==========================================================================
  // STRIPE HOOKS
  // ==========================================================================
  
  const stripe = useStripe();
  const elements = useElements();

  // ==========================================================================
  // COMPONENT STATE
  // ==========================================================================
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // ==========================================================================
  // HANDLE FORM SUBMISSION
  // ==========================================================================
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if Stripe has loaded
    if (!stripe || !elements) {
      setErrorMessage('Payment system is loading. Please wait...');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    onProcessing?.();

    try {
      // Confirm the payment
      // Stripe will handle 3D Secure and other authentication automatically
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Where to redirect after successful payment
          return_url: returnUrl || `${window.location.origin}/PaymentSuccess`,
        },
        // Set to 'if_required' to handle result here instead of redirect
        redirect: 'if_required',
      });

      if (error) {
        // Payment failed
        console.error('Payment error:', error);
        
        // Different error types
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message || 'Payment failed');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
        
        onError?.(error.message || 'Payment failed');
      } else if (paymentIntent) {
        // Payment succeeded without redirect
        console.log('Payment succeeded:', paymentIntent.id);
        onSuccess?.(paymentIntent);
      }
    } catch (err) {
      console.error('Error:', err);
      const message = err instanceof Error ? err.message : 'An error occurred';
      setErrorMessage(message);
      onError?.(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ==========================================================================
  // PAYMENT ELEMENT OPTIONS
  // ==========================================================================
  
  const paymentElementOptions = {
    layout: 'tabs' as const, // 'tabs' | 'accordion' | 'auto'
    
    // Fields configuration
    fields: {
      billingDetails: collectBillingAddress ? 'auto' as const : 'never' as const,
    },
    
    // Default payment method values
    defaultValues: {
      billingDetails: {
        // Pre-fill if you have customer info
        // name: customerName,
        // email: customerEmail,
      },
    },
    
    // Business configuration
    business: {
      name: 'Your Business Name',
    },
    
    // Wallet options
    wallets: {
      applePay: 'auto' as const,
      googlePay: 'auto' as const,
    },
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  
  return (
    <form onSubmit={handleSubmit} className="payment-element-form">
      {/* ================================================================== */}
      {/* PAYMENT ELEMENT */}
      {/* ================================================================== */}
      {/* This renders all available payment methods automatically */}
      <div className="payment-element-container">
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
          onReady={() => setIsReady(true)}
          onChange={(e) => {
            if (e.complete) {
              setErrorMessage(null);
            }
          }}
        />
      </div>

      {/* ================================================================== */}
      {/* ERROR MESSAGE */}
      {/* ================================================================== */}
      {errorMessage && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{errorMessage}</span>
        </div>
      )}

      {/* ================================================================== */}
      {/* SUBMIT BUTTON */}
      {/* ================================================================== */}
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing || !isReady}
        className={`submit-button ${isProcessing ? 'processing' : ''}`}
      >
        {isProcessing ? (
          <>
            <span className="spinner" aria-hidden="true"></span>
            <span>Processing...</span>
          </>
        ) : !isReady ? (
          <span>Loading...</span>
        ) : (
          <>
            <span className="lock-icon">🔒</span>
            <span>{buttonText}</span>
          </>
        )}
      </button>

      {/* ================================================================== */}
      {/* PAYMENT METHODS INFO */}
      {/* ================================================================== */}
      {/* <div className="payment-methods-info">
        <span>We accept:</span>
        <div className="payment-icons">
          <span title="Visa">💳</span>
          <span title="Mastercard">💳</span>
          <span title="Apple Pay">🍎</span>
          <span title="Google Pay">🟢</span>
        </div>
      </div> */}
    </form>
  );
};

export default PaymentElementForm;

// =============================================================================
// USAGE WITH CLIENT SECRET
// =============================================================================
/*
// Parent component that fetches client secret and wraps with Elements

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentElementForm from './PaymentElementForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentPage({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Create PaymentIntent on your server
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(err => console.error('Error:', err));
  }, [amount]);

  if (!clientSecret) {
    return <div>Loading payment form...</div>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }}
    >
      <PaymentElementForm
        onSuccess={(intent) => {
          console.log('Payment successful!', intent);
          // Redirect to success page
        }}
        onError={(error) => {
          console.error('Payment failed:', error);
        }}
      />
    </Elements>
  );
}
*/

// =============================================================================
// CSS STYLES (Add to your stylesheet)
// =============================================================================
/*
.payment-element-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

.payment-element-container {
  margin-bottom: 24px;
}

.submit-button {
  width: 100%;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #0066cc, #0052a3);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.4);
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.payment-methods-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  font-size: 12px;
  color: #666;
}

.payment-icons {
  display: flex;
  gap: 8px;
  font-size: 20px;
}
*/
