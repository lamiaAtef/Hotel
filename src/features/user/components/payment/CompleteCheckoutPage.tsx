// =============================================================================
// COMPLETE CHECKOUT PAGE EXAMPLE
// =============================================================================
// This demonstrates a full checkout flow with multiple payment methods
// =============================================================================

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize Stripe (use your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// =============================================================================
// TYPES
// =============================================================================

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

// =============================================================================
// SAMPLE CART DATA (replace with your actual cart)
// =============================================================================

const sampleCartItems: CartItem[] = [
  {
    id: '1',
    name: 'The Great Gatsby',
    price: 12.99,
    quantity: 1,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'To Kill a Mockingbird',
    price: 14.99,
    quantity: 2,
    image: 'https://via.placeholder.com/100',
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const calculateTax = (subtotal: number, rate: number = 0.08): number => {
  return subtotal * rate;
};

const calculateShipping = (subtotal: number): number => {
  return subtotal > 50 ? 0 : 5.99;
};

// =============================================================================
// CART SUMMARY COMPONENT
// =============================================================================

interface CartSummaryProps {
  items: CartItem[];
  showDetails?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, showDetails = true }) => {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      
      {showDetails && (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              {item.image && (
                <img src={item.image} alt={item.name} className="item-image" />
              )}
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
              <span className="item-price">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      
      <div className="summary-row">
        <span>Tax (8%)</span>
        <span>{formatPrice(tax)}</span>
      </div>
      
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
      </div>
      
      <div className="summary-row total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      
      {shipping === 0 && (
        <p className="free-shipping-note">
          🎉 You qualify for free shipping!
        </p>
      )}
    </div>
  );
};

// =============================================================================
// SHIPPING FORM COMPONENT
// =============================================================================

interface ShippingFormProps {
  onSubmit: (address: ShippingAddress) => void;
  initialValues?: Partial<ShippingAddress>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState<ShippingAddress>({
    name: initialValues.name || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    line1: initialValues.line1 || '',
    line2: initialValues.line2 || '',
    city: initialValues.city || '',
    state: initialValues.state || '',
    postalCode: initialValues.postalCode || '',
    country: initialValues.country || 'US',
  });
  
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.line1.trim()) newErrors.line1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ShippingAddress]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shipping-form">
      <h3>Shipping Information</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
      </div>
      
      <div className="form-row two-columns">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="line1">Address Line 1 *</label>
        <input
          type="text"
          id="line1"
          name="line1"
          value={formData.line1}
          onChange={handleChange}
          placeholder="Street address"
          className={errors.line1 ? 'error' : ''}
        />
        {errors.line1 && <span className="error-text">{errors.line1}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="line2">Address Line 2</label>
        <input
          type="text"
          id="line2"
          name="line2"
          value={formData.line2}
          onChange={handleChange}
          placeholder="Apartment, suite, etc."
        />
      </div>
      
      <div className="form-row three-columns">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? 'error' : ''}
          />
          {errors.state && <span className="error-text">{errors.state}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code *</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={errors.postalCode ? 'error' : ''}
          />
          {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="country">Country *</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="EG">Egypt</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Continue to Payment
      </button>
    </form>
  );
};

// =============================================================================
// PAYMENT STEP COMPONENT (Stripe)
// =============================================================================

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface PaymentStepProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  onSuccess,
  onError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // Submit the elements first
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || 'Validation failed');
      setIsProcessing(false);
      return;
    }

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed');
      onError(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3>Payment Details</h3>
      
      <PaymentElement 
        options={{
          layout: 'accordion',
        }}
      />
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn btn-primary"
      >
        {isProcessing ? 'Processing...' : 'Complete Purchase'}
      </button>
      
      <p className="security-note">
        🔒 Your payment is secured with 256-bit SSL encryption
      </p>
    </form>
  );
};

// =============================================================================
// CONFIRMATION COMPONENT
// =============================================================================

interface ConfirmationProps {
  orderNumber: string;
  email: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ orderNumber, email }) => {
  return (
    <div className="confirmation">
      <div className="success-icon">✓</div>
      <h2>Order Confirmed!</h2>
      <p className="order-number">Order #{orderNumber}</p>
      <p>
        Thank you for your purchase! A confirmation email has been sent to{' '}
        <strong>{email}</strong>
      </p>
      
      <div className="next-steps">
        <h4>What's Next?</h4>
        <ul>
          <li>You'll receive a shipping confirmation email when your order ships</li>
          <li>Track your order status in your account</li>
          <li>Estimated delivery: 3-5 business days</li>
        </ul>
      </div>
      
      <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
        Continue Shopping
      </button>
    </div>
  );
};

// =============================================================================
// STEPPER COMPONENT
// =============================================================================

interface StepperProps {
  currentStep: CheckoutStep;
  steps: { key: CheckoutStep; label: string }[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);
  
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={step.key}
          className={`step ${index <= currentIndex ? 'active' : ''} ${
            index < currentIndex ? 'completed' : ''
          }`}
        >
          <div className="step-number">
            {index < currentIndex ? '✓' : index + 1}
          </div>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

// =============================================================================
// MAIN CHECKOUT PAGE COMPONENT
// =============================================================================

const CompleteCheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [cartItems] = useState<CartItem[]>(sampleCartItems);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: 'cart', label: 'Cart' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'confirmation', label: 'Confirmation' },
  ];

  // Calculate totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  // Create payment intent when moving to payment step
  useEffect(() => {
    if (currentStep === 'payment' && !clientSecret) {
      createPaymentIntent();
    }
  }, [currentStep]);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to cents
          currency: 'usd',
          description: `Order for ${cartItems.map((i) => i.name).join(', ')}`,
          receipt_email: shippingAddress?.email,
          metadata: {
            customer_name: shippingAddress?.name,
            items: JSON.stringify(cartItems.map((i) => ({ id: i.id, qty: i.quantity }))),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    // Generate order number
    const orderNum = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    setOrderNumber(orderNum);
    setCurrentStep('confirmation');
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <div className="step-content">
            <CartSummary items={cartItems} showDetails={true} />
            <button
              className="btn btn-primary"
              onClick={() => setCurrentStep('shipping')}
            >
              Proceed to Checkout
            </button>
          </div>
        );

      case 'shipping':
        return (
          <div className="step-content two-column">
            <div className="main-column">
              <ShippingForm
                onSubmit={handleShippingSubmit}
                initialValues={shippingAddress || undefined}
              />
            </div>
            <div className="side-column">
              <CartSummary items={cartItems} showDetails={false} />
            </div>
          </div>
        );

      case 'payment':
        if (isLoading) {
          return (
            <div className="loading">
              <div className="spinner"></div>
              <p>Preparing payment...</p>
            </div>
          );
        }

        if (error) {
          return (
            <div className="error-state">
              <p>{error}</p>
              <button className="btn" onClick={createPaymentIntent}>
                Try Again
              </button>
            </div>
          );
        }

        if (!clientSecret) {
          return null;
        }

        return (
          <div className="step-content two-column">
            <div className="main-column">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#0570de',
                    },
                  },
                }}
              >
                <PaymentStep
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            </div>
            <div className="side-column">
              <CartSummary items={cartItems} showDetails={false} />
              
              {shippingAddress && (
                <div className="shipping-summary">
                  <h4>Shipping To</h4>
                  <p>{shippingAddress.name}</p>
                  <p>{shippingAddress.line1}</p>
                  {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
                  <p>
                    {shippingAddress.city}, {shippingAddress.state}{' '}
                    {shippingAddress.postalCode}
                  </p>
                  <button
                    className="btn btn-link"
                    onClick={() => setCurrentStep('shipping')}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <Confirmation
            orderNumber={orderNumber || ''}
            email={shippingAddress?.email || ''}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
        <Stepper currentStep={currentStep} steps={steps} />
      </header>

      <main className="checkout-main">{renderCurrentStep()}</main>

      <footer className="checkout-footer">
        <div className="trust-badges">
          <span>🔒 Secure Checkout</span>
          <span>💳 All major cards accepted</span>
          <span>🚚 Free shipping on orders over $50</span>
        </div>
      </footer>

      {/* Checkout Page Styles */}
      <style>{`
        .checkout-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .checkout-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .checkout-header h1 {
          font-size: 28px;
          margin-bottom: 20px;
        }

        /* Stepper */
        .stepper {
          display: flex;
          justify-content: center;
          gap: 40px;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.5;
        }

        .step.active {
          opacity: 1;
        }

        .step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .step.active .step-number {
          background: #0570de;
          color: white;
        }

        .step.completed .step-number {
          background: #22c55e;
          color: white;
        }

        .step-label {
          font-size: 14px;
          color: #666;
        }

        .step.active .step-label {
          color: #333;
          font-weight: 500;
        }

        /* Layout */
        .step-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .step-content.two-column {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
          max-width: 1100px;
        }

        @media (max-width: 768px) {
          .step-content.two-column {
            grid-template-columns: 1fr;
          }
          
          .side-column {
            order: -1;
          }
        }

        /* Cart Summary */
        .cart-summary {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }

        .cart-summary h3 {
          margin-bottom: 16px;
        }

        .cart-items {
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 16px;
          margin-bottom: 16px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-name {
          font-weight: 500;
        }

        .item-quantity {
          font-size: 14px;
          color: #666;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
        }

        .summary-row.total {
          border-top: 2px solid #333;
          margin-top: 12px;
          padding-top: 12px;
          font-weight: bold;
          font-size: 18px;
        }

        .free-shipping-note {
          color: #22c55e;
          font-size: 14px;
          margin-top: 12px;
        }

        /* Forms */
        .shipping-form,
        .payment-form {
          background: white;
          padding: 24px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }

        .shipping-form h3,
        .payment-form h3 {
          margin-bottom: 20px;
        }

        .form-row {
          margin-bottom: 16px;
        }

        .form-row.two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-row.three-columns {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #0570de;
        }

        .form-group input.error {
          border-color: #ef4444;
        }

        .error-text {
          color: #ef4444;
          font-size: 12px;
          margin-top: 4px;
        }

        /* Buttons */
        .btn {
          padding: 14px 28px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #0570de;
          color: white;
          width: 100%;
          margin-top: 20px;
        }

        .btn-primary:hover {
          background: #0456b8;
        }

        .btn-primary:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .btn-link {
          background: none;
          color: #0570de;
          padding: 0;
          font-size: 14px;
        }

        /* Payment Form */
        .error-message {
          background: #fef2f2;
          color: #ef4444;
          padding: 12px;
          border-radius: 6px;
          margin: 16px 0;
        }

        .security-note {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin-top: 16px;
        }

        /* Shipping Summary */
        .shipping-summary {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .shipping-summary h4 {
          margin-bottom: 8px;
        }

        .shipping-summary p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        /* Confirmation */
        .confirmation {
          text-align: center;
          padding: 40px;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: #22c55e;
          color: white;
          font-size: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .confirmation h2 {
          margin-bottom: 8px;
        }

        .order-number {
          font-size: 18px;
          color: #666;
          margin-bottom: 24px;
        }

        .next-steps {
          text-align: left;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 24px 0;
        }

        .next-steps ul {
          margin: 12px 0 0 20px;
        }

        .next-steps li {
          margin-bottom: 8px;
          color: #666;
        }

        /* Loading */
        .loading {
          text-align: center;
          padding: 60px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e0e0e0;
          border-top-color: #0570de;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Footer */
        .checkout-footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .trust-badges {
          display: flex;
          justify-content: center;
          gap: 40px;
          color: #666;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .trust-badges {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default CompleteCheckoutPage;
