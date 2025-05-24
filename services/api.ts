import axios, { AxiosError } from 'axios';
import { ApiError, ProductResponse, ProductsResponse } from './models';

// Configuration de base d'Axios
const API_BASE_URL_PROD = 'https://api.yuunna.coM'; // À remplacer par l'URL de votre API
const API_BASE_URL_DEV = 'localhost:5000'; // À remplacer par l'URL de votre API

const API_BASE_URL = API_BASE_URL_PROD; // À remplacer par l'URL de votre API
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Intercepteur pour ajouter des tokens d'authentification si nécessaire
api.interceptors.request.use(
  config => {
    // Vous pouvez ajouter un token d'authentification ici si nécessaire
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'Une erreur est survenue',
      status: error.response?.status,
    };

    // Vous pouvez ajouter une logique spécifique en fonction du code d'erreur
    if (error.response?.status === 401) {
      // Gérer l'authentification expirée
      console.error('Session expirée. Veuillez vous reconnecter.');
      // Rediriger vers la page de connexion ou rafraîchir le token
    }

    return Promise.reject(apiError);
  }
);

// Service pour les produits
export const productService = {
  // Récupérer tous les produits avec pagination
  getProducts: async (page = 1, limit = 10): Promise<ProductsResponse> => {
    try {
      // const response = await api.get<ProductsResponse>(`/products?page=${page}&limit=${limit}`);
      const response = await api.get<ProductsResponse>(`/products?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw error;
    }
  },

  // Récupérer un produit par son ID
  getProductById: async (id: string): Promise<ProductResponse> => {
    try {
      const response = await api.get<ProductResponse>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les produits par catégorie
  getProductsByCategory: async (category: string, page = 1, limit = 10): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>(`/products/category/${category}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des produits de la catégorie ${category}:`, error);
      throw error;
    }
  },

  // Rechercher des produits
  searchProducts: async (query: string, page = 1, limit = 10): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>(`/products/search?q=${query}&page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la recherche de produits avec la requête ${query}:`, error);
      throw error;
    }
  },

  // Simuler une API pour le développement (utile en attendant que le backend soit prêt)
  getMockProducts: async (page = 1, limit = 10): Promise<ProductsResponse> => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, page === 1 ? 2000 : 1000));
    
    // Catégories disponibles pour la simulation
    const categories = [
      { id: 'habit', name: 'Vêtements', count: 45 },
      { id: 'electronics', name: 'Électronique', count: 32 },
      { id: 'toys', name: 'Jouets', count: 18 },
      { id: 'home', name: 'Maison', count: 25 },
      { id: 'beauty', name: 'Beauté', count: 15 }
    ];
    
    // Sous-catégories pour les vêtements
    const subCategories = [
      'chemise', 't-shirt', 'pantalon', 'robe', 'veste', 'chaussures'
    ];
    
    // Images pour la simulation
    const images = [
      'https://g-search1.alicdn.com/img/bao/uploaded/i4/i1/805794591/O1CN01gl1dz91jmiwL4dZvt_!!805794591.jpg_580x580q90.jpg',
      'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2200724907121/O1CN01gCMSGD1CTBo1xbDjQ_!!0-item_pic.jpg_580x580q90.jpg',
      'https://g-search1.alicdn.com/img/bao/uploaded/i4/i4/2208876287052/O1CN01Xt9vI41xFPcBM0ZWI_!!0-item_pic.jpg_580x580q90.jpg',
      'https://g-search1.alicdn.com/img/bao/uploaded/i4/i3/2212330857676/O1CN01qNWGpS1FCg8sBUCeF_!!0-item_pic.jpg_580x580q90.jpg'
    ];
    
    // Générer des données factices basées sur la structure réelle du backend
    const startIndex = (page - 1) * limit;
    const items = Array.from({ length: limit }, (_, i) => {
      const index = startIndex + i;
      const categoryIndex = index % categories.length;
      const subCategoryIndex = index % subCategories.length;
      const imageIndex = index % images.length;
      const isDiscounted = Math.random() > 0.7;
      const originalPrice = (Math.random() * 200 + 50).toFixed(1);
      const discountPercent = isDiscounted ? Math.floor(Math.random() * 30 + 10) : 0;
      const finalPrice = isDiscounted 
        ? (parseFloat(originalPrice) * (1 - discountPercent / 100)).toFixed(1) 
        : originalPrice;
      
      return {
        // Attributs actuels du backend
        id: `Q80rmveXxFtdVeptR4Z${index + 1}`,
        titre: `Produit ${index + 1} - 领带白色长袖衬衫男宽松情侣套装`,
        prix: `¥${finalPrice}`,
        imageUrl: images[imageIndex],
        lien: `https://item.taobao.com/item.htm?id=62804669${index + 1000}`,
        vendeur: "男的国",
        localisation: "广东 / 潮州",
        ventes: `${Math.floor(Math.random() * 100)}人付款`,
        categoryId: `${categories[categoryIndex].id} / ${subCategories[subCategoryIndex]}`,
        subCategoryId: subCategories[subCategoryIndex],
        mainCategory: categories[categoryIndex].id,
        subCategory: subCategories[subCategoryIndex],
        titreOriginal: "领带白色长袖衬衫男宽松情侣套装港风学生班服休闲学院风衬衣秋季",
        titreTraduit: "领带白色长袖chemisehomme宽松情侣套装港风学生班服休闲学院风衬衣秋季",
        searchKeyword: "衬衫",
        status: Math.random() > 0.1 ? "active" : "inactive",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        source: "taobao",
        
        // Attributs utiles pour l'interface utilisateur et les fonctionnalités futures
        description: `Description détaillée du produit ${index + 1}. Ce produit est de haute qualité et offre d'excellentes performances. Fabriqué avec des matériaux durables et un design élégant.`,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),  // Note entre 3 et 5
        stock: Math.floor(Math.random() * 50),
        discount: isDiscounted ? discountPercent : undefined,
        originalPrice: isDiscounted ? `¥${originalPrice}` : undefined,
        colors: ['rouge', 'bleu', 'noir', 'blanc'].slice(0, Math.floor(Math.random() * 4) + 1),
        sizes: ['S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 4) + 1),
        isFavorite: Math.random() > 0.8,
        isInCart: Math.random() > 0.9,
        cartQuantity: Math.random() > 0.9 ? Math.floor(Math.random() * 3) + 1 : undefined,
        tags: ['tendance', 'nouveau', 'promotion'].filter(() => Math.random() > 0.6),
        relatedProducts: Array.from({ length: 3 }, (_, j) => `Q80rmveXxFtdVeptR4Z${Math.floor(Math.random() * 100) + 1}`),
        shipping: {
          cost: Math.random() > 0.3 ? `¥${(Math.random() * 20 + 5).toFixed(1)}` : '0',
          estimatedDelivery: `${Math.floor(Math.random() * 10) + 3}-${Math.floor(Math.random() * 10) + 10} jours`,
          freeShipping: Math.random() > 0.7
        }
      };
    });
    
    // Créer une réponse enrichie
    return {
      items,
      total: 100, // Nombre total fictif de produits
      page,
      limit,
      hasMore: page * limit < 100, // Il y a plus de produits si on n'a pas atteint la fin
      nextCursor: page * limit < 100 ? `cursor_${page + 1}` : undefined,
      prevCursor: page > 1 ? `cursor_${page - 1}` : undefined,
      lastUpdated: new Date().toISOString(),
      filters: {
        category: page % 2 === 0 ? 'habit' : undefined,
        priceRange: { min: 10, max: 200 },
        sortBy: 'popularity',
        searchQuery: ''
      },
      categories
    };
  },
};

export default api;
