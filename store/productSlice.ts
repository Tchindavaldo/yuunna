import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../services/api';
import { ProductsResponse } from '../services/models';
import { Product, productGroup, ProductsState } from './types';

// État initial
const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  // Nouvelle pagination basée sur un curseur
  cursor: 0,
  nextCursor: null,
  limit: 10,
  hasMore: true,
  totalAvailable: 0,
  lastDoc: null, // Identifiant du dernier document pour la pagination Firestore
  // Ancienne pagination (pour compatibilité)
  page: 1,
  total: 0,
  // Métadonnées
  categories: [],
  filters: {},
  lastUpdated: null,
  source: null,
};

// Thunk pour récupérer les produits
export const fetchProducts = createAsyncThunk<
  ProductsResponse & { page: number },
  { cursor?: number; limit?: number; category?: string; search?: string; sort?: string; keyword?: string },
  { rejectValue: string }
>('products/fetchProducts', async (params = {}, { getState, rejectWithValue }) => {
  try {
    // Récupérer l'état actuel pour déterminer le curseur par défaut
    const state = getState() as { products: ProductsState };

    // Utiliser le curseur fourni ou le curseur actuel de l'état (ou 0 par défaut)
    const {
      cursor = state.products.nextCursor || state.products.cursor || 0,
      limit = 10,
      category,
      search,
      sort,
      keyword,
    } = params;

    // Récupérer le lastDoc de l'état pour la pagination Firestore
    // Extraire le lastDocId de l'objet lastDoc
    let lastDocId: string | undefined = undefined;

    if (state.products.lastDoc) {
      // Vérifier si lastDoc est déjà une chaîne
      if (typeof state.products.lastDoc === 'string') {
        lastDocId = state.products.lastDoc;
        // console.log(`[REDUX] lastDoc est une chaîne: ${lastDocId}`);
      } else {
        // Si lastDoc est un objet, extraire la propriété lastDocId ou id
        try {
          const lastDoc = state.products.lastDoc as { id?: string; lastDocId?: string };
          // console.log(`[REDUX] lastDoc est un objet:`, lastDoc);

          // Utiliser lastDocId s'il existe, sinon utiliser id
          if (lastDoc.lastDocId) {
            lastDocId = lastDoc.lastDocId;
            // console.log(`[REDUX] Utilisation de lastDocId: ${lastDocId}`);
          } else if (lastDoc.id) {
            lastDocId = lastDoc.id;
            // console.log(`[REDUX] Utilisation de id: ${lastDocId}`);
          } else {
            // console.log(`[REDUX] Aucun ID valide trouvé dans l'objet lastDoc`);
            lastDocId = undefined;
          }
        } catch (error) {
          console.error(`[REDUX] Erreur lors de l'extraction de lastDocId:`, error);
          lastDocId = undefined;
        }
      }
    }

    // Calculer la page pour la compatibilité avec l'ancien système
    const page = cursor === 0 ? 1 : Math.floor(cursor / limit) + 1;

    // Préparer les options pour la requête API
    const options = { category, search, sort, keyword };

    // Log pour déboguer les paramètres de requête
    // console.log(`[REDUX] Requête produits: cursor=${cursor}, limit=${limit}, keyword=${keyword || 'non défini'}, lastDocId=${lastDocId || 'non défini'}`);

    // Utiliser le backend réel avec le nouveau système de curseur et lastDoc
    const response: ProductsResponse = await productService.getProducts(cursor, limit, keyword || '', lastDocId);

    // Ajouter la page aux données de réponse pour la compatibilité
    return {
      ...response,
      page,
    };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Une erreur est survenue lors de la récupération des produits');
  }
});

// Slice pour les produits
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: state => {
      // Réinitialiser complètement l'état
      state.items = [];
      state.loading = false;
      state.error = null;
      state.page = 1;
      state.hasMore = true;
      state.cursor = 0;
      state.nextCursor = null;
      state.total = 0;
      state.totalAvailable = 0;
      // Garder les catégories et les filtres
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    // Action pour mettre à jour les filtres
    setFilters: (state, action: PayloadAction<{ category?: string; search?: string; sort?: string }>) => {
      // Quand on change les filtres, on réinitialise les données
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      // Mais on garde les filtres
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { items, page, source, lastDoc } = action.payload;

        // Extraire les données de pagination du nouveau format ou de l'ancien format
        // Par défaut, on suppose qu'il y a plus de données à charger (true)
        let hasMoreData = true;
        let currentCursor = 0;
        let nextCursorValue = null;
        let totalItems = 0;
        let limitValue = state.limit;
        let lastDocValue = lastDoc || null;

        // Vérifier si nous avons la nouvelle structure de pagination
        if (action.payload.pagination) {
          const { cursor, nextCursor, hasMore, totalAvailable, limit } = action.payload.pagination;
          currentCursor = cursor;
          // S'assurer que nextCursor est défini, sinon utiliser cursor + limit
          nextCursorValue = hasMore ? nextCursor : null;
          // S'assurer que hasMore est défini (true ou false)
          hasMoreData = hasMore !== undefined ? hasMore : items.length > 0;
          totalItems = totalAvailable || 0;
          limitValue = limit || state.limit;

          // console.log(
          //   `[REDUX] Pagination: cursor=${cursor}, nextCursor=${nextCursor}, hasMore=${hasMoreData}, total=${totalItems}, lastDoc=${lastDocValue}`
          // );
        } else {
          // Utiliser l'ancien format de pagination si disponible
          hasMoreData = action.payload.hasMore !== undefined ? action.payload.hasMore : items.length > 0;
          totalItems = action.payload.total || 0;
          limitValue = action.payload.limit || state.limit;
          // console.log(`[REDUX] Ancienne pagination: page=${page}, hasMore=${hasMoreData}, total=${totalItems}, lastDoc=${lastDocValue}`);
        }

        // Vérifier si items est un tableau
        if (!items || !Array.isArray(items)) {
          console.error(
            `[REDUX] Erreur: items est ${items === undefined ? 'undefined' : 'non valide'} dans la réponse de l'API`
          );
          return;
        }

        // Transformer les produits en groupes de produits si nécessaire
        let productGroups: productGroup[] = [];

        // Vérifier si les items sont déjà des productGroup ou des Product
        if (items.length > 0 && items[0] && typeof items[0] === 'object' && 'products' in items[0]) {
          // Les items sont déjà des productGroup
          productGroups = items as unknown as productGroup[];
        } else {
          // Les items sont des Product, les convertir en productGroup
          productGroups = (items as unknown as Product[]).map((product: Product) => ({
            id: product.id,
            products: [product],
          }));
        }

        // Déboguer les données reçues
        // console.log(`[REDUX] Reçu ${productGroups.length} groupes de produits`);
        // console.log(`[REDUX] État actuel: ${state.items.length} groupes de produits, cursor=${state.cursor}`);

        // Si c'est la première requête (cursor=0), remplacer les items, sinon les ajouter
        if (currentCursor === 0) {
          state.items = productGroups;
          // console.log(`[REDUX] Réinitialisation des données avec ${productGroups.length} groupes de produits`);
          state.hasMore = hasMoreData;
        } else {
          // Ajouter les nouveaux éléments à la fin de la liste
          // Éviter les doublons en vérifiant les IDs
          const existingIds = new Set(state.items.map((item: productGroup) => item.id));

          // Filtrer les nouveaux produits (ceux qui n'existent pas déjà)
          const newItems = productGroups.filter((item: productGroup) => !existingIds.has(item.id));
          // console.log(`[REDUX] ${newItems.length} nouveaux groupes de produits sur ${productGroups.length} reçus`);

          // Ajouter les nouveaux produits s'il y en a
          if (newItems.length > 0) {
            // console.log(`[REDUX] Ajout de ${newItems.length} nouveaux produits`);
            state.items = [...state.items, ...newItems];
            state.hasMore = hasMoreData;
          } else {
            // Même si tous les produits reçus existent déjà, on continue à essayer
            // de charger plus de données, car le backend pourrait avoir d'autres pages
            // console.log(`[REDUX] Tous les produits reçus existent déjà, mais on continue à chercher`);

            // Incrémenter le curseur manuellement pour éviter de charger toujours la même page
            if (!nextCursorValue && currentCursor !== undefined) {
              // console.log(
              //   `[REDUX] Incrémentation manuelle du curseur de ${currentCursor} à ${currentCursor + limitValue}`
              // );
              state.nextCursor = currentCursor + limitValue;
            }

            // Garder hasMore à true pour permettre plus de chargements
            state.hasMore = true;
          }
        }

        // Mettre à jour l'état avec toutes les données enrichies
        state.loading = false;
        state.page = page; // Pour compatibilité
        state.cursor = currentCursor;
        state.nextCursor = nextCursorValue;
        state.totalAvailable = totalItems;
        state.total = totalItems; // Pour compatibilité
        state.limit = limitValue;
        state.source = source || null;
        // Stocker l'objet lastDoc tel quel, sans conversion
        if (action.payload.lastDoc) {
          state.lastDoc = action.payload.lastDoc;
          // console.log(`[REDUX] Stockage de lastDoc:`, action.payload.lastDoc);
        }

        // Mettre à jour les métadonnées si elles sont présentes
        if (action.payload.categories) state.categories = action.payload.categories;
        if (action.payload.filters) state.filters = { ...state.filters, ...action.payload.filters };
        if (action.payload.lastUpdated) state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProducts, setHasMore } = productSlice.actions;
export default productSlice.reducer;
