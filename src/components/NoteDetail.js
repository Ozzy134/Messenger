import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditNote.css'

const NoteDetail = ({ match, history }) => {
  const [note, setNote] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/notes/${id}/`);
        setNote(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке заметки:', error);
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div class='contayner'>
      <div class='form'>
        <h1>Edit Note</h1>
        <div class='form__input'>
          <input type="text" name="title" value={note.title} placeholder='Title' onChange={handleChange} />
          <textarea name="description" value={note.description} placeholder='Description' onChange={handleChange}></textarea>
        </div>
        <button>Update Note</button>
      </div>  
    </div>
  );
};

export default NoteDetail;