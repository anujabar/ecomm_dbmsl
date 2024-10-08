"use client";
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../(hooks)/useAuthContext';
import ProtectedRoute from '../(components)/ProtectedRoute';
import Link from 'next/link';

const OrderHistory = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders',{
                    headers:{
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ProtectedRoute roles={['Buyer']}>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-6">Order History</h1>
                {orders.length === 0 ? (
                    <p className="text-lg text-gray-600">No orders found.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order.id} className="border rounded-lg shadow-md p-4 bg-white">
                                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                               
                                <ul className="mt-2 space-y-2">
                                    {order.items.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center p-2 border-b">
                                            <Link href={`/productdetails/${item.product.id}`} className="text-blue-600 text-xl hover:underline">
                                                {item.product.title}
                                            </Link>
                                            <div className="flex flex-col items-end">
                                                <p className="text-sm">Quantity: {item.quantity}</p>
                                                <p className="font-semibold">Price: ₹ {item.product.price}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default OrderHistory;
