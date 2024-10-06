import { useAuthContext } from '../(hooks)/useAuthContext';
import { useState } from 'react';

const Payment = () => {
  const { user } = useAuthContext();
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      const paymentResponse = await fetch(`/api/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          amount: 1000, // Example payment amount, could be dynamic based on total
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment failed.');
      }

      setPaymentStatus('Payment successful!');
    } catch (error) {
      console.error(error.message);
      setPaymentStatus('Payment failed.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6">Complete Payment</h1>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-500 transition duration-300"
        >
          Pay Now
        </button>
        {paymentStatus && <p className="mt-4 text-lg">{paymentStatus}</p>}
      </div>
    </div>
  );
};

export default Payment;
