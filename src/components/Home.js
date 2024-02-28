import React from 'react';
import './Home.css'

const Home = () => {
  return (
    <div class='container'>
      <div className='header'>
        <a href='/notes'><button >Ваши заметки</button></a>
        <a className='header-btn-v' href='/auth'><button >Войти</button></a>
        <a href='/register'><button>Регистрация</button></a>
      </div>
      <div class='main'>
        <div class='main__contayner'>
          <h1 class='main__text'>Организация вашего времени - наша обязанность</h1>
          <a href='/create' className='main__btn'><button className='main__btn'>Создать заметку</button></a>
        </div>
      </div>
      <div class='footer'>
        <a href='https://vk.com/lexababnv'>VKontakte</a>
        <a href='https://web.telegram.org/k/#@lexababnv'>Telegram</a>
        <a href='https://discord.com/channels/@me'>Discord</a>
      </div>
    </div>
  );
};

export default Home;