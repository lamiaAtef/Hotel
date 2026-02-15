import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CheckOutForm({ bookingId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handlePay = async () => {
    if (!stripe || !elements) return;

    // اختار عنصر البطاقة
    const card = elements.getElement(CardElement);

    // توليد Token
    const { token, error } = await stripe.createToken(card);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }
    else{
        console.log('Generated Token:', token.id);
        toast.success("success Payment")
        navigate("/payment-success")

    }


    // إرسال الـ token للسيرفر
    const res = await fetch('/payBooking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token.id,
        bookingId: bookingId,
      }),
    });

    const data = await res.json();
    console.log('Server Response:', data);
  };

  return (
    <div>
      <CardElement />
      <button onClick={handlePay} disabled={!stripe}>
        Pay Now
      </button>
    </div>
  );
}