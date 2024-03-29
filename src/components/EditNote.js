import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditNote.css'

const EditNote = ({ match, history }) => {
  const [note, setNote] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/notes/${id}/`);
        setNote(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке заметки:', error);
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleUpdateNote = async () => {
    try {
      // Отправляем запрос на обновление заметки
      console.log(note)
      await axios.put(`http://localhost:8000/api/notes/${id}/`, note);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='contayner'>
      <div className='form'>
        <h1>Edit Note</h1>
        <div className='form__input'>
          <input type="text" name="title" value={note.title} onChange={handleChange} />
          <textarea name="description" value={note.description} placeholder='   Description' onChange={handleChange}></textarea>
        </div>
        <button onClick={handleUpdateNote}>Update Note</button>
      </div>  
    </div>
  );
};

export default EditNote;