import { ApiConstants } from '../StyleGuide';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';


const getOneFoodById = async foodId => {
    console.log(`getFoodService | getOneFoodById`)
    try {
        let foodResponse = await axios.get(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.FOOD}/${foodId}`, {
            headers: authHeader(getToken())
        })
        if (foodResponse?.status === 200) {
            return {
                status: true,
                message: `Food data fetched`,
                data: foodResponse?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Food data not found`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Food data not found`,
        };
    }
};


export default { getOneFoodById };