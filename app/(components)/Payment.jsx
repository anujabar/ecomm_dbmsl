"use client"
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../(hooks)/useAuthContext';
import { useEffect, useState } from 'react';

const Payment = ({ total, items}) => {
  const { user } = useAuthContext();
  const [paymentStatus, setPaymentStatus] = useState('');
  const router = useRouter()

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
          amount: parseFloat(total), 
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment failed.');
      }
      const {payment} = await paymentResponse.json()

      

      setPaymentStatus('Payment successful! Redirecting...');

      const postResponse = await fetch(`/api/checkout/${user.id}`, {
        method: "POST",
        body: JSON.stringify({ items }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (!postResponse.ok) {
        throw new Error('Failed to create order after payment.');
      }
      const {orderId} = await postResponse.json()
      const updatePaymentResponse = await fetch(`/api/payment/${payment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      });
      if (!updatePaymentResponse.ok) {
        throw new Error('Failed to update payment with order ID.');
      }

      const deleteResponse = await fetch(`/api/checkout/${user.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete the order.');
      }
    
      
      router.push('/products/all')

    } catch (error) {
      console.error("Error during payment process:", error.message);
      setPaymentStatus('Payment failed.');
    }
  };

  useEffect(() => {
    if (!total) {
      setPaymentStatus('No total amount provided.');
    }
  }, [total]);

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6">Complete Payment</h1>
        <h2 className="text-lg mb-4">Total Amount: ₹ {total}</h2>

        <div className="text-left mb-4">
          <h3 className="text-lg font-semibold">Bill Details</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.title} (Quantity: {item.quantity})</span>
                <span>₹ {(item.price-(item.price * item.salePercentage/100)) * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-500 transition duration-300 mt-4"
        >
          Pay Now
        </button>

        {paymentStatus && <p className="mt-4 text-lg">{paymentStatus}</p>}
      </div>
    </div>
  );
};

export default Payment;
