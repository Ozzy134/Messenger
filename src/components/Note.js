import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import axios from 'axios';

const { Column } = Table;

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Функция для выполнения запроса на сервер и обновления состояния "notes"
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/notes/');
        setNotes(response.data); // Предполагается, что сервер возвращает массив заметок
      } catch (error) {
        console.error('Ошибка при получении списка заметок:', error);
      }
    };

    // Вызываем функцию для выполнения запроса при монтировании компонента
    fetchNotes();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

  return (
    <Table dataSource={notes}>
      <Column title="Заголовок" dataIndex="title" key="title" />
      <Column title="Текст" dataIndex="content" key="content" />
      <Column
        title="Действия"
        key="actions"
        render={(text, record) => (
          <Space size="middle">
            {/* Здесь можно добавить дополнительные действия, например, удаление или редактирование заметки */}
          </Space>
        )}
      />
    </Table>
  );
};

export default NotesList;