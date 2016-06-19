/**
 * Created by genffy on 16/6/5.
 */

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducer.js'

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, createLogger())
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducer.js', () => {
            const nextRootReducer = require('./reducer.js').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
