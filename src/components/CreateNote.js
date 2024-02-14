import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateNote = ({ match, history }) => {
  const [note, setNote] = useState({});

  const handleUpdateNote = async () => {
    try {
      // Добавляем user_id из localStorage
      const userId = localStorage.getItem('id');
      // Добавляем created_at и updated_at
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      // Обновляем заметку с новыми полями
      const updatedNote = { ...note, user_id: userId, created_at: createdAt, updated_at: updatedAt };

      // Отправляем запрос на обновление заметки
      await axios.post(`http://localhost:8000/api/notes/`, updatedNote);

      // После успешного обновления перенаправляем пользователя, например, на список заметок
      history.push('/notes');
    } catch (error) {
      console.error('Ошибка при обновлении заметки:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  return (
    <div>
      <h1>Edit Note</h1>
      <label>Title:</label>
      <input type="text" name="title" value={note.title} onChange={handleChange} />
      <br />
      <label>Description:</label>
      <textarea name="description" value={note.description} onChange={handleChange}></textarea>
      <br />
      <button onClick={handleUpdateNote}>Update Note</button>
    </div>
  );
};

export default CreateNote;