// =============================================================================
// STRIPE PROVIDER COMPONENT
// =============================================================================
// This component wraps your payment components with Stripe context
// It loads the Stripe SDK and provides it to child components
// =============================================================================

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { StripeElementsOptions, Appearance } from '@stripe/stripe-js';

// =============================================================================
// STEP 1: Load Stripe SDK
// =============================================================================
// This should be done OUTSIDE of components to avoid reloading on re-renders
// The publishable key is safe to use in frontend code

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  console.error(
    '⚠️ Stripe publishable key is missing!\n' +
    'Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file'
  );
}

// loadStripe returns a Promise that resolves to the Stripe object
// This is called once and cached
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY || '');

// =============================================================================
// STEP 2: Define Appearance (Theme)
// =============================================================================
// Customize how Stripe Elements look to match your brand

const defaultAppearance: Appearance = {
  theme: 'stripe', // 'stripe' | 'night' | 'flat'
  
  variables: {
    // Colors
    colorPrimary: '#0066cc',          // Primary brand color
    colorBackground: '#ffffff',        // Background color
    colorText: '#333333',             // Text color
    colorDanger: '#dc3545',           // Error color
    colorSuccess: '#28a745',          // Success color
    
    // Typography
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontSizeBase: '16px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
    
    // Spacing
    spacingUnit: '4px',
    
    // Border
    borderRadius: '8px',
    
    // Focus
    focusBoxShadow: '0 0 0 3px rgba(0, 102, 204, 0.25)',
    focusOutline: 'none',
  },
  
  rules: {
    '.Input': {
      border: '1px solid #e0e0e0',
      boxShadow: 'none',
      padding: '12px',
    },
    '.Input:focus': {
      border: '1px solid #0066cc',
      boxShadow: '0 0 0 3px rgba(0, 102, 204, 0.25)',
    },
    '.Input--invalid': {
      border: '1px solid #dc3545',
    },
    '.Label': {
      fontWeight: '500',
      marginBottom: '8px',
    },
    '.Error': {
      color: '#dc3545',
      fontSize: '14px',
      marginTop: '4px',
    },
  },
};

// =============================================================================
// STEP 3: Provider Props Interface
// =============================================================================

interface StripeProviderProps {
  children: React.ReactNode;
  
  // Optional: Client secret for Payment Intent or Setup Intent
  // Required when using PaymentElement
  clientSecret?: string;
  
  // Optional: Custom appearance
  appearance?: Appearance;
  
  // Optional: Locale for localization
  locale?: 'auto' | 'en' | 'ar' | 'fr' | 'de' | 'es' | 'it' | 'ja' | 'zh';
  
  // Optional: Custom fonts
  fonts?: Array<{
    cssSrc: string;
  }>;
}

// =============================================================================
// STEP 4: Stripe Provider Component
// =============================================================================

const StripeProvider: React.FC<StripeProviderProps> = ({
  children,
  clientSecret,
  appearance = defaultAppearance,
  locale = 'auto',
  fonts,
}) => {
  // Build Elements options
  const options: StripeElementsOptions = {
    appearance,
    locale,
    fonts,
  };

  // Add client secret if provided (required for PaymentElement)
  if (clientSecret) {
    options.clientSecret = clientSecret;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

// =============================================================================
// STEP 5: Export
// =============================================================================

export default StripeProvider;

// Also export stripePromise for direct use if needed
export { stripePromise, defaultAppearance };

// =============================================================================
// USAGE EXAMPLE
// =============================================================================
/*
import StripeProvider from './StripeProvider';
import CheckoutForm from './CheckoutForm';

function PaymentPage() {
  return (
    <StripeProvider>
      <CheckoutForm amount={2999} />
    </StripeProvider>
  );
}

// With Payment Element (requires clientSecret):
function PaymentPageWithPaymentElement() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch client secret from your backend
    fetch('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount: 2999 }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <StripeProvider clientSecret={clientSecret}>
      <PaymentElementForm />
    </StripeProvider>
  );
}
*/
