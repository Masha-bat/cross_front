import React, { useState } from 'react';
import axios from 'axios';

const MyOrder = () => {
  const [tableId, setTableId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`https://localhost:7183/api/Orders/${tableId}`);
      setOrder(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при получении заказа');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrder();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Мой заказ</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableId">
          Введите ID стола:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tableId"
          type="text"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="submit"
        >
          Получить заказ
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {order && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Информация о заказе</h2>
          <p><strong>Время заказа:</strong> {new Date(order.orderTime).toLocaleString()}</p>
          <p><strong>Блюда:</strong></p>
          <ul>
            {order.dishes.map((dish, index) => (
              <li key={index}>{dish.name} - {dish.price} руб.</li>
            ))}
          </ul>
          <p><strong>Общая стоимость:</strong> {order.totalPrice} руб.</p>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
