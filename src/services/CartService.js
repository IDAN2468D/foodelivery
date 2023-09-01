import { ApiConstants } from '../StyleGuide';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const getCartItems = async () => {
    console.log(`CartService | getCartItems`)
    try {
        let response = await axios.get(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.CART}`,
            {
                headers: authHeader(getToken())
            },
        )
        if (response?.status === 200) {
            return {
                status: true,
                message: `Cart data fetched`,
                data: response?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Cart data not found`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Cart data not found`,
        };
    }
};

const addToCart = async ({ foodId }) => {
    console.log(`CartService | addToCart`)
    try {
        let response = await axios.post(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.CART}/${foodId}`,
            {}, {
            headers: authHeader(getToken())
        })
        if (response?.status === 200) {
            return {
                status: true,
                message: `Item added to cart successful`,
                data: response?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Item added to cart failed`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Item added to cart failed`,
        };
    }
};

const removeFromCart = async ({ foodId }) => {
    console.log(`CartService | removeFromCart`)
    try {
        let response = await axios.delete(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.CART}/${foodId}`, {
            headers: authHeader(getToken())
        })
        if (response?.status === 200) {
            return {
                status: true,
                message: `Item remove from cart successful`,
                data: response?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Item remove from failed`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Item remove from failed`,
        };
    }
};


export default { getCartItems, addToCart, removeFromCart };