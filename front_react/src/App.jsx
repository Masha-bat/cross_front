import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import MyOrder from './pages/MyOrder';
import EditMenu from './pages/EditMenu';
import AddOrder from './pages/AddOrder';
import Login from './pages/Login';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (isAdmin) => {
    setIsAdmin(isAdmin);
    setIsAuthModalOpen(false);
  };

  return (
    <Router>
      <div className="bg-gray-100 flex flex-col min-h-screen">
        <Header isAdmin={isAdmin} openAuthModal={() => setIsAuthModalOpen(true)} />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/my-order" element={<MyOrder />} />
            <Route path="/edit-menu" element={<EditMenu />} />
            <Route path="/add-order" element={<AddOrder />} />
          </Routes>
        </main>
        <Footer />
        <Login
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </Router>
  );
};

export default App;
