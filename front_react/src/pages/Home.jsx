import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Добро пожаловать в Мой Ресторан!</h1>
      <img src="/povar.jpg" alt="Повар" className="w-64 h-64 object-cover rounded-full mb-4" />
      <p className="text-lg">Это начальная страница.</p>
    </div>
  );
};

export default Home;
