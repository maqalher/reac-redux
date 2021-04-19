import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'; // manda a llamar index.js

const store = createStore(
    reducer, 
    compose( applyMiddleware(thunk), 

        // extension Readux devtools
        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f     
    )
);

export default store;