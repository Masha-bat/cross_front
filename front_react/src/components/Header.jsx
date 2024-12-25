import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineFastfood } from "react-icons/md";
import { FaUtensils, FaShoppingCart, FaEdit, FaPlusCircle } from 'react-icons/fa';

const Header = ({ isAdmin }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
            <MdOutlineFastfood />
          Мой Ресторан
        </Link>
        <div className="flex space-x-6">
          {!isAdmin && (
            <>
              <Link to="/menu" className="flex items-center hover:text-gray-300 transition duration-300">
                <FaUtensils className="mr-1" />
                Меню
              </Link>
              <Link to="/my-order" className="flex items-center hover:text-gray-300 transition duration-300">
                <FaShoppingCart className="mr-1" />
                Мой заказ
              </Link>
            </>
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
