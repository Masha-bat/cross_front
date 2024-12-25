import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Импортируем компонент Footer
import Home from './pages/Home';
import Menu from './pages/Menu';
import MyOrder from './pages/MyOrder';
import EditMenu from './pages/EditMenu';
import AddOrder from './pages/AddOrder';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Установи значение по умолчанию в зависимости от твоих требований

  return (
    <Router>
      <div className="bg-gray-100 flex flex-col min-h-screen">
        <Header isAdmin={isAdmin} />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/my-order" element={<MyOrder />} />
            <Route path="/edit-menu" element={<EditMenu />} />
            <Route path="/add-order" element={<AddOrder />} />
          </Routes>
        </main>
        <Footer /> {/* Добавляем компонент Footer */}
      </div>
    </Router>
  );
};

export default App;
