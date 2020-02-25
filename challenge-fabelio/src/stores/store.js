import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    baseUrl: "http://www.mocky.io/v2/5c9105cb330000112b649af8",
    productList:[]
}

export const store = createStore(initialState);

export const actions = (store) => ({
	
});
