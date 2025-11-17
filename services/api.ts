import axios, { AxiosError } from 'axios';
import { ApiError, ProductResponse, ProductsResponse } from './models';

// Configuration de base d'Axios
const API_BASE_URL_PROD = 'https://api.yuunna.coM'; // À remplacer par l'URL de votre API

// const API_BASE_URL_DEV = 'http://192.168.8.1000:3000'; // URL de développement avec votre adresse IP locale
const API_BASE_URL_DEV = 'http://192.168.11.21:3000'; // URL de développement avec votre adresse IP locale

// const API_BASE_URL_DEV = 'http://192.168.100.101:5000'; // URL de développement avec votre adresse IP locale
// const API_BASE_URL_DEV = 'http://192.168.1.124:5001'; // URL de développement avec votre adresse IP locale
// const API_BASE_URL_DEV = 'http://192.168.1.198:5000'; // URL de développement avec votre adresse IP locale

const API_BASE_URL = API_BASE_URL_DEV; // Utiliser l'URL de développement pour le moment
// Pour Expo Go, nous devons utiliser l'adresse IP de la machine hôte au lieu de localhost

// IMPORTANT: Pour Expo Go, remplacez 'localhost' par l'adresse IP de votre machine
// Exemple: Si votre adresse IP est 192.168.1.5, utilisez 'http://192.168.1.5:5000/api/v1'
// Configuration de l'API avec l'URL de base

const api = axios.create({
  baseURL: API_BASE_URL_DEV, // Pour le développement local
  timeout: 300000, // Timeout de 30 secondes pour éviter les timeouts
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
      // Rediriger vers la page de connexion ou rafraîchir le token
    }

    return Promise.reject(apiError);
  }
);

// Service pour les produits
export const productService = {
  // Méthode pour récupérer les produits avec le nouveau système de pagination basé sur un curseur
  async getTaobaoProducts(
    cursor: number = 0,
    limit: number = 10,
    keyword: string = '',
    lastDocId?: string
  ): Promise<ProductsResponse> {
    try {
      // Construire l'URL avec les paramètres de pagination et de recherche
      let url = `/taobao-products?cursor=${cursor}&limit=${limit}`;

      // Ajouter le mot-clé de recherche s'il est présent
      if (keyword) {
        url += `&keyword=${keyword}`;
      }

      // Ajouter le lastDocId s'il est présent pour la pagination Firestore
      if (lastDocId) {
        url += `&lastDocId=${lastDocId}`;
      }

      const fullUrl = `${API_BASE_URL_DEV}${url}`;
      // console.log(`[API] Appel à l'API Taobao avec l'URL: ${fullUrl}`);

      const response = await api.get<ProductsResponse>(url);

      // Vérifier si items existe dans la réponse
      if (!response.data.items) {
        // Créer un objet items vide pour éviter les erreurs
        response.data.items = [];
      }

      // Log des données reçues pour le débogage
      console.log(
        `[API] Reçu ${response.data.items.length} produits, lastDoc: ${response.data.lastDoc || 'non défini'}`
      );

      return response.data;
    } catch (error: any) {
      console.error('[API] Erreur lors de la récupération des produits Taobao:', error);
      throw error;
    }
  },

  // Récupérer tous les produits avec pagination
  getProducts: async (cursor = 0, limit = 10, keyword = '', lastDocId?: string): Promise<ProductsResponse> => {
    try {
      // Construire l'URL avec les paramètres de pagination et de filtrage
      // Garder l'URL existante mais utiliser les nouveaux paramètres
      let url = `/products?cursor=${cursor}&limit=${limit}`;

      // Ajouter le mot-clé de recherche s'il est présent
      if (keyword) {
        url += `&search=${keyword}`;
      }

      // Ajouter le lastDocId s'il est présent pour la pagination Firestore
      if (lastDocId) {
        url += `&lastDocId=${lastDocId}`;
      }

      const fullUrl = `${API_BASE_URL_DEV}${url}`;

      // console.log(`[API] Appel à l'API avec l'URL: ${fullUrl}`);
      const response = await api.get<ProductsResponse>(url);

      // S'assurer que les métadonnées de pagination sont complètes
      // Si le backend ne renvoie pas certaines informations, les ajouter manuellement
      if (response.data.cursor === undefined) {
        response.data.cursor = cursor;
      }

      // Log des données reçues pour le débogage
      // console.log(
      //   `[API] Reçu ${response.data.items.length} produits, lastDoc: ${response.data.lastDoc || 'non défini'}`
      // );

      return response.data;
    } catch (error: any) {
      console.error('[API] Erreur lors de la récupération des produits:', error);
      // Réessayer avec les données mockées en cas d'erreur
      return productService.getMockProducts(cursor, limit, { search: keyword });
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
  getProductsByCategory: async (category: string, cursor = 0, limit = 10): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>(
        `/products/category/${category}?cursor=${cursor}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des produits de la catégorie ${category}:`, error);
      throw error;
    }
  },

  // Rechercher des produits
  searchProducts: async (query: string, cursor = 0, limit = 10): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>(`/products/search?q=${query}&cursor=${cursor}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la recherche de produits avec la requête ${query}:`, error);
      throw error;
    }
  },

  // Simuler une API pour le développement (utile en attendant que le backend soit prêt)
  getMockProducts: async (
    page = 1,
    limit = 10,
    options?: { sort?: string; category?: string; search?: string }
  ): Promise<ProductsResponse> => {
    // Simuler un délai réseau plus court pour les pages suivantes
    const delay = page === 1 ? 1500 : 800;
    console.log(`[API] Début du chargement des produits - Page: ${page}, Limit: ${limit}, Délai: ${delay}ms`);
    await new Promise(resolve => setTimeout(resolve, delay));

    console.log(`[API] Chargement des produits - Page: ${page}, Limit: ${limit}, Options:`, options);

    // Catégories disponibles pour la simulation
    const categories = [
      { id: 'habit', name: 'Vêtements', count: 45 },
      { id: 'electronics', name: 'Électronique', count: 32 },
      { id: 'toys', name: 'Jouets', count: 18 },
      { id: 'home', name: 'Maison', count: 25 },
      { id: 'beauty', name: 'Beauté', count: 15 },
    ];

    // Sous-catégories pour les vêtements
    const subCategories = ['chemise', 't-shirt', 'pantalon', 'robe', 'veste', 'chaussures'];

    // Images pour la simulation
    const images = [
      'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2639246106/O1CN01cOeB291uyb9UVRT8S_!!2639246106.jpg_580x580q90.jpg',

      'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2213776641680/O1CN01VL4UJw1OHUROsEj1x_!!2213776641680.jpg_580x580q90.jpg',

      'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/2032126449/O1CN01WecMfq1xVhGj4MtfO_!!4611686018427382257-0-item_pic.jpg_580x580q90.jpg_.webp',

      'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2218159811393/O1CN01VF6NMF1MA2lcoTlen_!!4611686018427382593-0-item_pic.jpg_460x460q90.jpg_.webp',
    ];

    // Calculer l'index de départ pour la pagination
    const pageStartIndex = (page - 1) * limit;

    // Générer des données factices basées sur la structure réelle du backend
    const items = Array.from({ length: limit }, (_, i) => {
      const index = pageStartIndex + i;
      const id = `product-${index + 1}`;
      const categoryIndex = index % categories.length;
      const subCategoryIndex = index % subCategories.length;
      const imageIndex = index % images.length;

      // Générer un prix aléatoire entre 50 et 500
      const price = Math.floor(Math.random() * 450) + 50;
      // Générer un nombre de ventes aléatoire
      const sales = Math.floor(Math.random() * 1000);

      return {
        id,
        titre: `Produit ${index + 1} - ${subCategories[subCategoryIndex]} tendance`,
        titreOriginal: `Original Product ${index + 1} - Trendy ${subCategories[subCategoryIndex]}`,
        prix: `¥${price}`,
        imageUrl: images[imageIndex],
        vendeur: `Boutique ${Math.floor(index / 5) + 1}`,
        localisation: 'Chine',
        ventes: `${sales} ventes`,
        categoryId: categories[categoryIndex].id,
        subCategoryId: subCategories[subCategoryIndex],
        mainCategory: categories[categoryIndex].name,
        subCategory: subCategories[subCategoryIndex],
        status: index % 10 === 0 ? 'out_of_stock' : 'active', // Simuler quelques produits en rupture de stock
      };
    });

    // Simuler une recherche si un terme est fourni
    let filteredItems = items;
    if (options?.search) {
      const searchTerm = options.search.toLowerCase();
      filteredItems = items.filter(
        item =>
          item.titre.toLowerCase().includes(searchTerm) ||
          item.mainCategory.toLowerCase().includes(searchTerm) ||
          item.subCategory.toLowerCase().includes(searchTerm)
      );
    }

    // Simuler un filtrage par catégorie si une catégorie est fournie
    if (options?.category) {
      filteredItems = filteredItems.filter(item => item.categoryId === options.category);
    }

    // Simuler un tri si demandé
    if (options?.sort) {
      switch (options.sort) {
        case 'price_asc':
          filteredItems.sort((a, b) => {
            const priceA = parseInt(a.prix.replace('¥', ''));
            const priceB = parseInt(b.prix.replace('¥', ''));
            return priceA - priceB;
          });
          break;
        case 'price_desc':
          filteredItems.sort((a, b) => {
            const priceA = parseInt(a.prix.replace('¥', ''));
            const priceB = parseInt(b.prix.replace('¥', ''));
            return priceB - priceA;
          });
          break;
        case 'popularity':
          filteredItems.sort((a, b) => {
            const salesA = parseInt(a.ventes.split(' ')[0]);
            const salesB = parseInt(b.ventes.split(' ')[0]);
            return salesB - salesA;
          });
          break;
        default:
          // Par défaut, pas de tri spécifique
          break;
      }
    }

    // Calculer s'il y a plus de pages
    const totalItems = filteredItems.length;
    const hasMorePages = pageStartIndex + limit < totalItems;

    // Créer la structure de réponse complète
    const response: ProductsResponse = {
      success: true,
      items: filteredItems.slice(0, limit), // Limiter les résultats à la taille de la page
      pagination: {
        cursor: pageStartIndex,
        nextCursor: hasMorePages ? pageStartIndex + limit : pageStartIndex, // Toujours un nombre, même s'il n'y a plus de pages
        limit,
        hasMore: hasMorePages,
        totalAvailable: totalItems,
      },
      cursor: pageStartIndex,
      nextCursor: hasMorePages ? pageStartIndex + limit : undefined,
      hasMore: hasMorePages,
      total: totalItems,
      page,
      limit,
      categories,
      lastUpdated: new Date().toISOString(),
      lastDoc: hasMorePages ? `mock_doc_${pageStartIndex + limit - 1}` : undefined, // Simuler un ID de document Firestore
      message:
        filteredItems.length > 0 ? `${Math.min(filteredItems.length, limit)} produits trouvés` : 'Aucun produit trouvé',
    };

    return response;
  },
};

export default api;
