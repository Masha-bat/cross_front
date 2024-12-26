import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('table'); // 'table' или 'cards'
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5122/api/Dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'cards' : 'table');
  };

  const handleDescriptionChange = (e) => {
    setSelectedDescription(e.target.value);
  };

  const filteredDishes = dishes
    .filter(dish => dish.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(dish => selectedDescription ? dish.description.includes(selectedDescription) : true)
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  const uniqueDescriptions = [...new Set(dishes.map(dish => dish.description))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Меню</h1>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />
      <button onClick={handleSort} className="mb-4 p-2 border rounded">
        Сортировать по цене {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
      <button onClick={toggleViewMode} className="mb-4 p-2 border rounded">
        Переключить вид {viewMode === 'table' ? 'на карточки' : 'на таблицу'}
      </button>
      <select
        value={selectedDescription}
        onChange={handleDescriptionChange}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Все описания</option>
        {uniqueDescriptions.map((description, index) => (
          <option key={index} value={description}>
            {description}
          </option>
        ))}
      </select>
      {viewMode === 'table' ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Название</th>
              <th className="py-2 px-4 text-left">Описание</th>
              <th className="py-2 px-4 text-left">Цена</th>
            </tr>
          </thead>
          <tbody>
            {filteredDishes.map(dish => (
              <tr key={dish.id} className="border-b">
                <td className="py-2 px-4">{dish.name}</td>
                <td className="py-2 px-4">{dish.description}</td>
                <td className="py-2 px-4">{dish.price} руб.</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDishes.map(dish => (
            <div key={dish.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">{dish.name}</h2>
              <p className="text-gray-700 mb-2">{dish.description}</p>
              <p className="text-gray-900 font-bold">{dish.price} руб.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
