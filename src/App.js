import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import EditNote from './components/EditNote';
import Registration from './components/Registration';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/notes/');
        console.log (response)
        setNotes(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка заметок:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesList notes={notes} />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;