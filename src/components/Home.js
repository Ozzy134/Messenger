import React from 'react';
import { redirect } from 'react-router-dom';
import './Home.css'

const Home = () => {

  const Note = () => {
    redirect('http://localhost:3000/notes')
  };

  return (
    <div class='container'>
      <div className='header'>
        <button src='http://localhost:3000/notes'>Ваши заметки</button>
        <button url='http://localhost:3000/auth'>Войти</button>
        <a href='/register'><button>Регистрация</button></a>
      </div>
      <div class='main'>
        <h1 class='main__text'>Организация вашего времени - наша обязанность</h1>
        <button class='main__btn'>Создать заметку</button>
      </div>
      <div class='footer'>
        <a url=''>VKontakte</a>
        <a url=''>Telegramm</a>
        <a url=''>Discord</a>
      </div>
    </div>
  );
};

export default Home;