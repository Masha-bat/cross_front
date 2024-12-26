import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaShoppingCart, FaEdit, FaPlusCircle, FaSignInAlt } from 'react-icons/fa';

const Header = ({ isAdmin, openAuthModal }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <FaUtensils className="mr-2" />
          Мой Ресторан
        </Link>
        <div className="flex space-x-6">
          <Link to="/menu" className="flex items-center hover:text-gray-300 transition duration-300">
            <FaUtensils className="mr-1" />
            Меню
          </Link>
          {isAdmin && (
            <Link to="/my-order" className="flex items-center hover:text-gray-300 transition duration-300">
              <FaShoppingCart className="mr-1" />
              Мой заказ
            </Link>
          )}
          {isAdmin && (
            <>
              <Link to="/edit-menu" className="flex items-center hover:text-gray-300 transition duration-300">
                <FaEdit className="mr-1" />
                Изменить меню
              </Link>
              <Link to="/add-order" className="flex items-center hover:text-gray-300 transition duration-300">
                <FaPlusCircle className="mr-1" />
                Добавить заказ
              </Link>
            </>
          )}
          <button
            onClick={openAuthModal}
            className="flex items-center hover:text-gray-300 transition duration-300"
          >
            <FaSignInAlt className="mr-1" />
            Авторизация
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
