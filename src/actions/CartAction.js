import { CartService } from "../services";

const types = {
    GET_CART_ITEM: "GET_CART_ITEM",
    SET_IS_LOADING: "SET_IS_ITEMS",
};

const addToCart = ({ foodId }) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true
        })
        CartService.addToCart({ foodId }).then(cardResponse => {
            dispatch({
                type: types.GET_CART_ITEM,
                payload: cardResponse?.data
            })
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false
            })
        }).catch(() => {
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false
            })

        })
    }
}

const removeFromCart = ({ foodId }) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true
        })
        CartService.removeFromCart({ foodId }).then(cardResponse => {
            dispatch({
                type: types.GET_CART_ITEM,
                payload: cardResponse?.data,
            })
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false
            })
        }).catch(() => {
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false
            })

        })
    }
}

const getCardItems = () => {
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true
        })
        CartService.getCartItems()
            .then(cardResponse => {
                dispatch({
                    type: types.GET_CART_ITEM,
                    payload: cardResponse?.data,
                })
                dispatch({
                    type: types.SET_IS_LOADING,
                    payload: false
                })
            }).catch(() => {
                dispatch({
                    type: types.SET_IS_LOADING,
                    payload: false
                })

            })
    }
}



export default { types, addToCart, removeFromCart, getCardItems }