import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../../services/httpClient';
import { BOOKING } from '../../../../config/api.endPoint';
import { Button } from '@mui/material';

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
        try{
          let response = axiosInstance.post(BOOKING.PAY_BOOKING(bookingId),token.id)
           toast.success("success Payment")
            navigate("/payment-success")
        }
        catch(error){
          console.log(error)
        }
       

    }


    // إرسال الـ token للسيرفر
    // const res = await fetch('/payBooking', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     token: token.id,
    //     bookingId: bookingId,
    //   }),
    // });

    // const data = await res.json();
    // console.log('Server Response:', data);
  };
const CARD_OPTIONS = {
  style: {
    base: {
      color: "#152C5B",
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#B0B0B0"
      }

    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};
  return (
    <div>
      <CardElement options={CARD_OPTIONS} />
      <Button onClick={handlePay}
      sx={{
        marginBlock:"20px",
        
      }}
       disabled={!stripe} variant = "contained">
        Pay Now
      </Button>
    </div>
  );
}