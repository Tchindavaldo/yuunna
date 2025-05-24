// Modèles de données pour l'API
import { Product } from '../store/types';

// Réponse de l'API pour la liste des produits
export interface ProductsResponse {
  // Structure actuelle du backend
  items: Product[];
  
  // Attributs de pagination utiles
  total?: number;           // Nombre total de produits disponibles
  page?: number;            // Page actuelle
  limit?: number;           // Nombre d'éléments par page
  hasMore?: boolean;        // S'il y a plus de produits à charger
  nextCursor?: string;      // Curseur pour la pagination basée sur des curseurs
  prevCursor?: string;      // Curseur précédent pour la navigation en arrière
  
  // Métadonnées utiles pour l'interface utilisateur
  lastUpdated?: string;     // Date de dernière mise à jour des données
  filters?: {               // Filtres appliqués à la requête
    category?: string;
    priceRange?: { min: number; max: number };
    sortBy?: string;
    searchQuery?: string;
  };
  categories?: {            // Catégories disponibles pour le filtrage
    id: string;
    name: string;
    count: number;
  }[];
}

// Réponse de l'API pour un produit individuel
export interface ProductResponse {
  product: Product;
}

// Réponse de l'API pour les catégories
export interface CategoriesResponse {
  categories: Category[];
}

// Modèle pour les catégories
export interface Category {
  id: string;
  name: string;
  image?: string;
  description?: string;
}

// Modèle pour les erreurs API
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
