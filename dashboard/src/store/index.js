import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducers'

const store = configureStore({

    reducer : rootReducer,
    middleware : getDefaultMiddleware => {
        return getDefaultMiddleware({
            // Toast/error kimi plain olmayan deyerler problem yaratmasin deye yoxlama sondurulur.
            serializableCheck : false
        })
    },
    devTools : true

})
export default store
