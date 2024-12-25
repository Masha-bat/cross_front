import React, { useState } from 'react';

const Menu = () => {
  const [dishes, setDishes] = useState([
    { id: 1, name: 'Салат Цезарь', description: 'Классический салат с курицей и соусом Цезарь', price: 350 },
    { id: 2, name: 'Борщ', description: 'Традиционный украинский суп с капустой и мясом', price: 150 },
    { id: 3, name: 'Паста Карбонара', description: 'Итальянская паста с беконом и сыром', price: 400 },
    { id: 4, name: 'Стейк с картофелем', description: 'Сочный стейк с жареным картофелем', price: 700 },
    { id: 5, name: 'Рыба на гриле', description: 'Нежная рыба, приготовленная на гриле', price: 500 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [newDish, setNewDish] = useState({ name: '', description: '', price: '' });
  const [editDish, setEditDish] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleAddDish = () => {
    setDishes([...dishes, { ...newDish, id: dishes.length + 1 }]);
    setNewDish({ name: '', description: '', price: '' });
  };

  const handleEditDish = (id) => {
    setDishes(dishes.map(dish => dish.id === id ? editDish : dish));
    setEditDish(null);
  };

  const handleDeleteDish = (id) => {
    setDishes(dishes.filter(dish => dish.id !== id));
  };

  const filteredDishes = dishes
    .filter(dish => dish.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

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
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Название</th>
            <th className="py-2 px-4 text-left">Описание</th>
            <th className="py-2 px-4 text-left">Цена</th>
            <th className="py-2 px-4 text-left">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredDishes.map(dish => (
            <tr key={dish.id} className="border-b">
              <td className="py-2 px-4">{dish.name}</td>
              <td className="py-2 px-4">{dish.description}</td>
              <td className="py-2 px-4">{dish.price} руб.</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => setEditDish(dish)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDeleteDish(dish.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Добавить блюдо</h2>
        <input
          type="text"
          placeholder="Название"
          value={newDish.name}
          onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Описание"
          value={newDish.description}
          onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Цена"
          value={newDish.price}
          onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          className="mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddDish}
          className="bg-green-500 text-white p-2 rounded"
        >
          Добавить
        </button>
      </div>
      {editDish && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Редактировать блюдо</h2>
          <input
            type="text"
            placeholder="Название"
            value={editDish.name}
            onChange={(e) => setEditDish({ ...editDish, name: e.target.value })}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Описание"
            value={editDish.description}
            onChange={(e) => setEditDish({ ...editDish, description: e.target.value })}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Цена"
            value={editDish.price}
            onChange={(e) => setEditDish({ ...editDish, price: e.target.value })}
            className="mb-2 p-2 border rounded"
          />
          <button
            onClick={() => handleEditDish(editDish.id)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
