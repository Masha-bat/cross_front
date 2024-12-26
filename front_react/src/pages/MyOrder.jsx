import React, { useState } from 'react';
import axios from 'axios';

const MyOrder = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5122/api/Orders/table/${tableNumber}`);
      console.log('Response data:', response.data); // Логирование ответа
      if (response.data.message) {
        setMessage(response.data.message);
        setOrder(null);
      } else {
        setOrder(response.data);
        setMessage('');
      }
      setError('');
    } catch (err) {
      console.error('Error fetching order:', err); // Логирование ошибки
      if (err.response && err.response.status === 404) {
        setMessage(`Заказ для стола ${tableNumber} не найден.`);
      } else {
        setError('Ошибка при получении заказа');
      }
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableNumber">
          Введите номер стола:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tableNumber"
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
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
      {message && <p className="text-green-500">{message}</p>}
      {order && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Информация о заказе</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Время заказа</th>
                <th className="py-2 px-4 text-left">Стол</th>
                <th className="py-2 px-4 text-left">Количество блюд</th>
                <th className="py-2 px-4 text-left">Блюда</th>
                <th className="py-2 px-4 text-left">Общая сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">{new Date(order.timeOrdered).toLocaleString()}</td>
                <td className="py-2 px-4">{order.table && order.table.number !== undefined ? order.table.number : 'Неизвестно'}</td>
                <td className="py-2 px-4">{order.dishes ? order.dishes.length : 0}</td>
                <td className="py-2 px-4">
                  {order.dishes && order.dishes.length > 0 ? (
                    <ul>
                      {order.dishes.map((dish, index) => (
                        <li key={index}>{dish.name} - {dish.price} руб.</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Нет блюд в заказе.</p>
                  )}
                </td>
                <td className="py-2 px-4">{order.dishes && order.dishes.length > 0 ? order.dishes.reduce((total, dish) => total + dish.price, 0) : 0} руб.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
