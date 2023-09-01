import { combineReducers } from 'redux';
import GeneralReducer from './GeneralReducer';
import CardReducer from './CardReducer';
import BookmarkReducer from './BookmarkReducer';

export default combineReducers({
    generalState: GeneralReducer,
    cartState: CardReducer,
    bookmarkState: BookmarkReducer,
})