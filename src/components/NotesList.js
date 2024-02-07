import React from 'react';
import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Column } = Table;

const NotesList = ({ notes, onDelete }) => {
  const handleDelete = async (record) => {
    console.log(record)
    try {
      // Выполняем запрос на удаление с использованием axios
      await axios.delete(`http://127.0.0.1:8000/api/notes/${record.id}`);
      // Выполняем обновление списка заметок (или других действий) после успешного удаления
      onDelete(record.id);
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  return (
    <Table dataSource={notes}>
      <Column
        title="Заголовок"
        dataIndex="title"
        key="title"
        render={(id, record) => (
          <Space size="middle">
            <Link to={`/notes/${id}`}>{record.title}</Link>
          </Space>
        )}
      />
      <Column title="Текст" dataIndex="description" key="description" />
      <Column title="Дата" dataIndex="created_at" key="created_at" />
      <Column
        title="Действия"
        key="actions"
        render={(text, record) => (
          <Space size="middle" rey="actions1">
            <Link to={`/edit/${record.id}`}>
              <Button type="primary">Изменить</Button>
            </Link>
            <Button type="danger" onClick={() => handleDelete(record)}>
              Удалить
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default NotesList;