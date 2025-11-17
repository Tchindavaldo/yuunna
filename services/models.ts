// Modèles de données pour l'API
import { Product } from '../store/types';

// Réponse de l'API pour la liste des produits
export interface ProductsResponse {
  // Structure actuelle du backend
  success?: boolean;        // Indique si la requête a réussi
  items: Product[];         // Liste des produits
  source?: string;          // Source des données (ex: 'taobao_direct')
  message?: string;         // Message de l'API (ex: '10 produits trouvés')
  lastDoc?: {
    id: string;              // ID du dernier document
    lastDocId: string;       // ID du dernier document (redondant)
    lastDocData: string;     // Données du dernier document en format JSON
  } | string;                // Pour la compatibilité avec l'ancien format
  
  // Nouvelle structure de pagination basée sur un curseur
  pagination?: {
    cursor: number;          // Position actuelle du curseur
    nextCursor: number;      // Position pour la prochaine requête
    limit: number;           // Nombre d'éléments par page
    hasMore: boolean;        // S'il y a plus de produits à charger
    totalAvailable: number;  // Nombre total de produits disponibles
  };
  
  // Attributs de pagination ancienne version (pour compatibilité)
  total?: number;           // Nombre total de produits disponibles
  page?: number;            // Page actuelle (pour compatibilité avec l'ancien système)
  limit?: number;           // Nombre d'éléments par page
  hasMore?: boolean;        // S'il y a plus de produits à charger
  
  // Attributs de pagination par curseur au niveau racine
  cursor?: number;          // Position actuelle du curseur
  nextCursor?: number;      // Position pour la prochaine requête
  
  // Métadonnées utiles pour l'interface utilisateur
  lastUpdated?: string;     // Date de dernière mise à jour des données
  filters?: {               // Filtres appliqués à la requête
    category?: string;
    priceRange?: { min: number; max: number };
    sortBy?: string;
    searchQuery?: string;
    keyword?: string;        // Mot-clé pour la recherche Taobao
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
