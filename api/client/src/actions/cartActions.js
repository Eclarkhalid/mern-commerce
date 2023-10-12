import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from '../actions/types';

export const getCart = (id) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`http://localhost:4000/api/cart/${id}`)
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addToCart = (id, productId, quantity) => dispatch => {
    axios.post(`http://localhost:4000/api/cart/${id}`, { productId, quantity })
        .then(res => dispatch({
            type: ADD_TO_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteFromCart = (userId, itemId) => dispatch => {
    axios.delete(`http://localhost:4000/api/cart/${userId}/${itemId}`)
        .then(res => dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setCartLoading = () => {
    return {
        type: CART_LOADING
    }
}