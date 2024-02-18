import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import EditNote from './components/EditNote';
import Registration from './components/Registration';
import Auth from './components/Auth';
import CreateNote from './components/CreateNote';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const user_id = localStorage.getItem('id')
        const response = await axios.get(`http://127.0.0.1:8000/api/notes/${user_id}/`);
        console.log(response.data)
        setNotes(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка заметок:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Функция для проверки статуса аутентификации
  const checkAuthStatus = () => {
    // Проверяем, существует ли токен в localStorage
    const token = localStorage.getItem('token');
    // Если токен существует и не является пустой строкой, возвращаем true
    return token && token !== '';
  };

  if (loading) return <div>Loading...</div>;
return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/notes"
          element={checkAuthStatus() ? <NotesList notes={notes} /> : <Navigate to="/auth" />}
        />
        <Route
          path="/notes/:id"
          element={checkAuthStatus() ? <NoteDetail /> : <Navigate to="/auth" />}
        />
        <Route
          path="/edit/:id"
          element={checkAuthStatus() ? <EditNote /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/create"
          element={checkAuthStatus() ? <CreateNote /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
};

export default App;