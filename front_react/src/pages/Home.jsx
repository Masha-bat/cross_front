import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [popularDish, setPopularDish] = useState(null);
  const [averageCheck, setAverageCheck] = useState(null);
  const [error, setError] = useState('');

  const fetchPopularDish = async () => {
    try {
      const response = await axios.get('http://localhost:5122/api/Orders/popular-dish');
      setPopularDish(response.data);
    } catch (err) {
      setError('Ошибка при получении данных о популярном блюде.');
    }
  };

  const fetchAverageCheck = async () => {
    try {
      const response = await axios.get('http://localhost:5122/api/Orders/averageCheck');
      setAverageCheck(Math.round(response.data));
      console.log(response);
    } catch (err) {
      setError('Ошибка при получении данных о среднем чеке.');
    }
  };

  useEffect(() => {
    fetchPopularDish();
    fetchAverageCheck();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-center">Добро пожаловать в Мой Ресторан!</h1>
      <img src="/povar.jpg" alt="Повар" className="w-64 h-64 object-cover rounded-full mb-4" />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {popularDish && (
        <div className="text-center">
          <p className="text-lg mb-2">Наше самое популярное блюдо:</p>
          <h2 className="text-2xl font-bold">{popularDish.dishName}</h2>
        </div>
      )}
      {averageCheck && (
        <div className="text-center mt-4">
          <p className="text-lg mb-2">Средний чек:</p>
          <h2 className="text-2xl font-bold">{averageCheck} руб.</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
