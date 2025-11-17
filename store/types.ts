// Définition des types pour les produits
export interface Product {
  // Attributs actuels du backend
  id: string;
  titre: string;
  prix: string | number; // Peut être une chaîne ("¥489") ou un nombre (489)
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
  description?: string; // Description détaillée du produit
  rating?: number; // Évaluation du produit (ex: 4.5/5)
  stock?: number; // Quantité en stock
  discount?: number; // Pourcentage de réduction
  originalPrice?: string; // Prix avant réduction
  colors?: string[]; // Couleurs disponibles
  sizes?: string[]; // Tailles disponibles
  isFavorite?: boolean; // Si le produit est dans les favoris de l'utilisateur
  isInCart?: boolean; // Si le produit est dans le panier
  cartQuantity?: number; // Quantité dans le panier
  tags?: string[]; // Tags associés au produit
  relatedProducts?: string[]; // IDs des produits similaires
  shipping?: {
    // Informations de livraison
    cost?: string;
    estimatedDelivery?: string;
    freeShipping?: boolean;
  };
}
export interface productGroup {
  id: string;
  products: Product[];
}
// État du reducer des produits
export interface ProductsState {
  // Données principales
  items: productGroup[];
  loading: boolean;
  error: string | null;

  // Nouvelle pagination basée sur un curseur
  cursor: number;
  nextCursor: number | null;
  limit: number;
  hasMore: boolean;
  totalAvailable: number;
  lastDoc: {
    id: string;              // ID du dernier document
    lastDocId: string;       // ID du dernier document (redondant)
    lastDocData: string;     // Données du dernier document en format JSON
  } | string | null;         // Identifiant du dernier document pour la pagination Firestore

  // Ancienne pagination (pour compatibilité)
  page: number;
  total: number;

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
    keyword?: string; // Pour les recherches Taobao
  };
  lastUpdated: string | null;
  source: string | null; // Source des données (ex: 'taobao_direct')
}

// Types d'actions pour les produits
export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
  RESET_PRODUCTS = 'RESET_PRODUCTS',
}
