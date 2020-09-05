import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';
import { favorites } from './favorites'
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)
        // compose(
        //     applyMiddleware(thunk,logger),
        //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
         
    );

    return store;
}
