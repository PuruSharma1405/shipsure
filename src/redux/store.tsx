import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/user";
import { alertSlice } from "./reducers/alertSlice";
import { requisitionSlice } from "./reducers/requisitionSlice";
import { deliveryDetailsSlice } from "./reducers/deliveryDetailsSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';


const persistConfig = {
  key: "root",
  storage, 
};

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [alertSlice.name]: alertSlice.reducer,
  [deliveryDetailsSlice.name]: deliveryDetailsSlice.reducer,
  [requisitionSlice.name]: requisitionSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);