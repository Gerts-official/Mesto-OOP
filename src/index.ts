import './blocks/index.css';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { CardData } from './components/CardsData';
import { UserData } from './components/UserData';
import { Api } from './components/base/api';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi } from './types';
import { API_URL, settings } from './utils/constants';
import { testCards, testUser } from './utils/tempConstants';


const events: IEvents = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const cardsData = new CardData(events);
const userData = new UserData(events);

const cardTemplate: HTMLTemplateElement = 
    document.querySelector('.card-template');


// Получаем карточки с сервера
Promise.all([
    api.getUser(), 
    api.getCards()])
	.then(([userInfo, initialCards]) => {
		userData.setUserInfo(userInfo);
		cardsData.cards = initialCards;
        console.log(cardsData.cards)
        console.log(userData.getUserInfo())
	})
	.catch((err) => {
		console.error(err);
	});

const testSection = document.querySelector('.places')as HTMLTemplateElement;

const card = new Card (cardTemplate, events);
card.setData(testCards[0], testUser._id);
testSection.append(card.render())
