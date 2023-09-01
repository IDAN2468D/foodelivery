import { ApiConstants } from '../StyleGuide';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const getBookmark = async () => {
    console.log(`BookmarkService | getBookmarks`)
    try {
        let response = await axios.get(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.BOOKMARK}`,
            {
                headers: authHeader(getToken())
            },
        )
        if (response?.status === 200) {
            return {
                status: true,
                message: `Bookmark data fetched`,
                data: response?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Bookmark data not found`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Bookmark data not found`,
        };
    }
};

const addBookmark = async ({ restaurantId }) => {
    console.log(`BookmarkService | addBookmark`)
    try {
        let response = await axios.post(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.BOOKMARK}/${restaurantId}`,
            {}, {
            headers: authHeader(getToken())
        })
        if (response?.status === 200) {
            return {
                status: true,
                message: `Bookmark added successful`,
                data: response?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Bookmark adding failed`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Bookmark adding failed`,
        };
    }
};

const removeBookmark = async ({ restaurantId }) => {
    console.log(`BookmarkService | removeBookmark`)
    try {
        let response = await axios.delete(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.BOOKMARK}/${restaurantId}`, {
            headers: authHeader(getToken())
        })
        if (response?.status === 200) {
            return {
                status: true,
                message: `Bookmark removed successful`,
                data: response?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Bookmark removing from failed`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Bookmark removing from failed`,
        };
    }
};


export default { getBookmark, addBookmark, removeBookmark };