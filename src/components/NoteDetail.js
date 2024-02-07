import React from 'react';

const NoteDetail = ({ match }) => {
  const noteId = match.params.id; // Получаем параметр из URL

  return <div>Детали заметки с id: {noteId}</div>;
};

export default NoteDetail;