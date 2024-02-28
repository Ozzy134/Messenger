import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditNote.css'

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
    <div class='contayner'>
      <div class='form'>
        <h1>Create Note</h1>
        <div class='form__input'>
          <input type="text" name="title" value={note.title} placeholder='Title' onChange={handleChange} />
          <textarea name="description" value={note.description} placeholder='   Description' onChange={handleChange}></textarea>
        </div>  
        <button onClick={handleUpdateNote}>Create Note</button>
      </div>
    </div>
  );
};

export default CreateNote;