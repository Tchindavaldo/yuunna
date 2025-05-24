import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

// Configuration du store Redux
const store = configureStore({
  reducer: {
    products: productReducer,
    // Ajoutez d'autres reducers ici si nécessaire
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types d'inférence pour useSelector et useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
