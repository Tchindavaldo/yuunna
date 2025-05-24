import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../services/api';
import { ProductsResponse } from '../services/models';
import { Product, ProductsState } from './types';

// État initial
const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  categories: [],
  filters: {},
  lastUpdated: null,
  nextCursor: null,
  prevCursor: null,
  total: 0,
  limit: 10,
};

// Thunk pour récupérer les produits
export const fetchProducts = createAsyncThunk<
  ProductsResponse & { page: number },
  { page?: number; limit?: number; category?: string; searchQuery?: string; sortBy?: string },
  { rejectValue: string }
>(
  'products/fetchProducts',
  async (params = {}, { getState, rejectWithValue }) => {
    const { page = 1, limit = 10, category, searchQuery, sortBy } = params;
    try {
      // Utiliser getMockProducts pour simuler une API en attendant que le backend soit prêt
      // Remplacer par productService.getProducts quand le backend sera disponible
      const response: ProductsResponse = await productService.getMockProducts(page, limit);
      
      // Ajouter la page aux données de réponse pour le reducer
      return {
        ...response,
        page,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Une erreur est survenue lors de la récupération des produits');
    }
  }
);

// Slice pour les produits
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: state => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { items, hasMore, page, categories, filters, lastUpdated, nextCursor, prevCursor, total, limit } = action.payload;
        
        // Si c'est la première page, remplacer les items, sinon les ajouter
        if (page === 1) {
          state.items = items;
        } else {
          // Éviter les doublons en vérifiant les IDs
          const existingIds = new Set(state.items.map(item => item.id));
          const newItems = items.filter(item => !existingIds.has(item.id));
          state.items = [...state.items, ...newItems];
        }
        
        // Mettre à jour l'état avec toutes les données enrichies
        state.loading = false;
        state.hasMore = hasMore || false;
        state.page = page;
        
        // Mettre à jour les métadonnées si elles sont disponibles
        if (categories) state.categories = categories;
        if (filters) state.filters = filters;
        if (lastUpdated) state.lastUpdated = lastUpdated;
        if (nextCursor) state.nextCursor = nextCursor;
        if (prevCursor) state.prevCursor = prevCursor;
        if (total !== undefined) state.total = total;
        if (limit !== undefined) state.limit = limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
