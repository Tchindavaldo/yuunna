// Définition des types pour les produits
export interface Product {
  // Attributs actuels du backend
  id: string;
  titre: string;
  prix: string;
  imageUrl: string;
  lien?: string;
  vendeur?: string;
  localisation?: string;
  ventes?: string;
  categoryId?: string;
  subCategoryId?: string | null;
  mainCategory?: string;
  subCategory?: string | null;
  titreOriginal?: string;
  titreTraduit?: string;
  searchKeyword?: string;
  status?: string;
  createdAt?: string;
  source?: string;
  
  // Attributs utiles pour l'interface utilisateur et les fonctionnalités futures
  description?: string;           // Description détaillée du produit
  rating?: number;                // Évaluation du produit (ex: 4.5/5)
  stock?: number;                 // Quantité en stock
  discount?: number;              // Pourcentage de réduction
  originalPrice?: string;         // Prix avant réduction
  colors?: string[];              // Couleurs disponibles
  sizes?: string[];               // Tailles disponibles
  isFavorite?: boolean;           // Si le produit est dans les favoris de l'utilisateur
  isInCart?: boolean;             // Si le produit est dans le panier
  cartQuantity?: number;          // Quantité dans le panier
  tags?: string[];                // Tags associés au produit
  relatedProducts?: string[];     // IDs des produits similaires
  shipping?: {                    // Informations de livraison
    cost?: string;
    estimatedDelivery?: string;
    freeShipping?: boolean;
  };
}

// État du reducer des produits
export interface ProductsState {
  // Données principales
  items: Product[];
  loading: boolean;
  error: string | null;
  
  // Pagination
  page: number;
  limit: number;
  hasMore: boolean;
  total: number;
  nextCursor: string | null;
  prevCursor: string | null;
  
  // Métadonnées
  categories: {
    id: string;
    name: string;
    count: number;
  }[];
  filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    sortBy?: string;
    searchQuery?: string;
  };
  lastUpdated: string | null;
}

// Types d'actions pour les produits
export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
  RESET_PRODUCTS = 'RESET_PRODUCTS',
}
