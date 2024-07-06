import './blocks/index.css';
import { CardData } from './components/CardsData';
import { UserData } from './components/UserData';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';

const events = new EventEmitter();

const cardsData = new CardData(events);
const userData = new UserData(events);

const api = new Api('https://ya-praktikum.tech/api/v2/', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

console.log(api.get('/users'));