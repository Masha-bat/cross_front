import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOrder = () => {
  const [tableId, setTableId] = useState('');
  const [dishIds, setDishIds] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState(null); // Добавлено состояние для сортировки
  const [sortBy, setSortBy] = useState(null); // Добавлено состояние для параметра сортировки

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5122/api/Orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log('Fetched orders:', response.data); // Логирование полученных данных
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err); // Логирование ошибки
      setError('Ошибка при получении заказов.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Вы не авторизованы. Пожалуйста, войдите как администратор.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5122/api/Orders', {
        tableId: parseInt(tableId),
        dishIds: dishIds.split(',').map(id => parseInt(id))
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Added order:', response.data); // Логирование добавленного заказа
      setSuccessMessage('Заказ успешно добавлен.');
      setTableId('');
      setDishIds('');
      fetchOrders(); // Обновить список заказов
    } catch (err) {
      console.error('Error adding order:', err); // Логирование ошибки
      setError('Ошибка при добавлении заказа.');
    }
  };

  const handleDeleteOrder = async (tableId) => {
    try {
      await axios.delete(`http://localhost:5122/api/Orders/table/${tableId}/dishes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      fetchOrders(); // Обновить список заказов
    } catch (err) {
      console.error('Error deleting order:', err); // Логирование ошибки
      setError('Ошибка при удалении заказа.');
    }
  };

  const handleSort = (by) => {
    if (sortBy === by) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(by);
      setSortOrder('asc');
    }
  };

  const sortedOrders = orders
    .sort((a, b) => {
      if (sortBy === 'time') {
        return sortOrder === 'asc' ? new Date(a.timeOrdered) - new Date(b.timeOrdered) : new Date(b.timeOrdered) - new Date(a.timeOrdered);
      } else if (sortBy === 'table') {
        return sortOrder === 'asc' ? a.table.id - b.table.id : b.table.id - a.table.id;
      } else if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.dishes.reduce((sum, dish) => sum + dish.price, 0) - b.dishes.reduce((sum, dish) => sum + dish.price, 0) : b.dishes.reduce((sum, dish) => sum + dish.price, 0) - a.dishes.reduce((sum, dish) => sum + dish.price, 0);
      }
      return 0;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Добавить заказ</h1>
      <form onSubmit={handleAddOrder} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableId">
            ID стола:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tableId"
            type="number"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dishIds">
            ID блюд (через запятую):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dishIds"
            type="text"
            value={dishIds}
            onChange={(e) => setDishIds(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Добавить заказ
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <h2 className="text-2xl font-bold mb-4 mt-8">Список заказов</h2>
      <div className="flex justify-between mb-4">
        <button onClick={() => handleSort('time')} className="p-2 border rounded">
          Сортировать по времени {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <button onClick={() => handleSort('table')} className="p-2 border rounded">
          Сортировать по столу {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
        <button onClick={() => handleSort('price')} className="p-2 border rounded">
          Сортировать по цене {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">ID заказа</th>
            <th className="py-2 px-4 text-left">Время заказа</th>
            <th className="py-2 px-4 text-left">Стол</th>
            <th className="py-2 px-4 text-left">Блюда</th>
            <th className="py-2 px-4 text-left">Общая сумма</th>
            <th className="py-2 px-4 text-left">Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map(order => (
            <tr key={order.id} className="border-b">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{new Date(order.timeOrdered).toLocaleString()}</td>
              <td className="py-2 px-4">{order.table.id}</td>
              <td className="py-2 px-4">
                <ul>
                  {order.dishes.map(dish => (
                    <li key={dish.id}>{dish.name} - {dish.price} руб.</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4">{order.dishes.reduce((sum, dish) => sum + dish.price, 0)} руб.</td>
              <td className="py-2 px-4">
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteOrder(order.table.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddOrder;
