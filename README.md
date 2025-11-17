# 🛍️ Yuunna - Application Mobile de Commerce Électronique

> **Une application mobile moderne et performante pour la découverte et l'achat de produits en ligne, intégrée avec l'API Taobao.**

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Caractéristiques principales](#caractéristiques-principales)
3. [Architecture technique](#architecture-technique)
4. [Structure du projet](#structure-du-projet)
5. [Installation et configuration](#installation-et-configuration)
6. [Guide de développement](#guide-de-développement)
7. [Gestion de l'état](#gestion-de-létat)
8. [API et services](#api-et-services)
9. [Composants principaux](#composants-principaux)
10. [Styles et thème](#styles-et-thème)
11. [Déploiement](#déploiement)
12. [Dépannage](#dépannage)
13. [Contribution](#contribution)

---

## 🎯 Vue d'ensemble

**Yuunna** est une application mobile cross-platform construite avec **Expo** et **React Native**. Elle offre une expérience utilisateur fluide et intuitive pour naviguer, découvrir et acheter des produits provenant de plateformes de commerce électronique comme Taobao.

### Objectifs principaux

- ✅ Afficher un catalogue de produits dynamique et actualisable
- ✅ Implémenter un système de défilement infini performant
- ✅ Gérer un panier d'achat complet
- ✅ Fournir un système de notifications en temps réel
- ✅ Offrir une gestion de compte utilisateur
- ✅ Supporter plusieurs plateformes (iOS, Android, Web)

### Technologies clés

| Technologie          | Version | Rôle                        |
| -------------------- | ------- | --------------------------- |
| **React Native**     | 0.81.5  | Framework mobile            |
| **Expo**             | 54.0.21 | Plateforme de développement |
| **Expo Router**      | 6.0.14  | Routage et navigation       |
| **Redux Toolkit**    | 2.8.2   | Gestion d'état global       |
| **Axios**            | 1.9.0   | Client HTTP                 |
| **TypeScript**       | 5.3.3   | Typage statique             |
| **React Reanimated** | 4.1.1   | Animations performantes     |

---

## ⭐ Caractéristiques principales

### 1. **Catalogue de produits dynamique**

- Chargement initial de 20 produits
- Défilement infini avec pagination par curseur
- Support de la recherche par mots-clés
- Filtrage par catégories
- Affichage de détails produit enrichis

### 2. **Bannière défilante automatique**

- Défilement continu et fluide des produits en vedette
- Pause automatique au toucher de l'utilisateur
- Reprise du défilement après relâchement
- Animation smooth sans pagination visible

### 3. **Système de panier**

- Ajout/suppression de produits
- Gestion des quantités
- Calcul automatique du sous-total et des frais
- Persistance des données du panier

### 4. **Gestion des notifications**

- Affichage des notifications utilisateur
- Marquage comme lu/non lu
- Icônes et statuts visuels distincts
- État vide quand aucune notification

### 5. **Gestion de compte**

- Profil utilisateur
- Paramètres (notifications, mode sombre, langue)
- Méthodes de paiement
- Adresses de livraison
- Centre d'aide

### 6. **Loaders personnalisés**

- **Pulse loader** : Cercle vert semi-transparent avec animation
- **Dots loader** : Trois points qui s'illuminent successivement
- **Progress bar** : Barre de progression horizontale
- **Compact loader** : Version réduite pour le footer

---

## 🏗️ Architecture technique

### Modèle d'architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Couche Présentation                  │
│  (Composants React Native, Pages, Écrans)              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Couche de Gestion d'État                   │
│  (Redux Store, Slices, Hooks personnalisés)            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            Couche Services & API                        │
│  (Axios, Services API, Modèles de données)             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│         Backend (API Taobao / Serveur)                  │
│  (Endpoints, Base de données, Logique métier)          │
└─────────────────────────────────────────────────────────┘
```

### Flux de données

```
Utilisateur interagit
        ↓
Composant React Native
        ↓
Dispatch Redux Action
        ↓
Thunk Redux (async)
        ↓
Service API (Axios)
        ↓
Backend API
        ↓
Réponse JSON
        ↓
Reducer Redux
        ↓
Store mis à jour
        ↓
Composant re-rendu
        ↓
Interface mise à jour
```

---

## 📁 Structure du projet

```
yuunna/
├── app/                              # Routage et pages (Expo Router)
│   ├── _layout.tsx                  # Layout racine avec Redux Provider
│   ├── index.tsx                    # Page d'accueil
│   └── (route)/                     # Routes groupées
│       ├── (tabs)/                  # Onglets principaux
│       │   ├── index.tsx            # Accueil
│       │   ├── panier.tsx           # Panier
│       │   ├── notification.tsx     # Notifications
│       │   ├── suivie.tsx           # Suivi des commandes
│       │   └── account.tsx          # Compte utilisateur
│       ├── (tabsChild)/             # Routes enfants des onglets
│       ├── auth/                    # Routes d'authentification
│       ├── other/                   # Autres routes
│       └── payment/                 # Routes de paiement
│
├── components/                       # Composants réutilisables
│   ├── tabs/                        # Composants des onglets
│   │   ├── home/                    # Composants de la page d'accueil
│   │   │   ├── design/              # Designs d'items (design1, design2, etc.)
│   │   │   ├── detail/              # Détails produit
│   │   │   ├── header/              # En-tête
│   │   │   ├── utils/               # Utilitaires (loaders, helpers)
│   │   │   └── home.tsx             # Composant principal Home
│   │   ├── panier/                  # Composants du panier
│   │   ├── notification/            # Composants des notifications
│   │   ├── suivie/                  # Composants du suivi
│   │   └── account/                 # Composants du compte
│   ├── auth/                        # Composants d'authentification
│   ├── payment/                     # Composants de paiement
│   ├── common/                      # Composants communs
│   ├── ui/                          # Composants UI génériques
│   ├── gloabal/                     # Composants globaux
│   └── __tests__/                   # Tests unitaires
│
├── store/                            # Gestion d'état Redux
│   ├── index.ts                     # Configuration du store
│   ├── hooks.ts                     # Hooks Redux personnalisés
│   ├── productSlice.ts              # Reducer pour les produits
│   └── types.ts                     # Types TypeScript
│
├── services/                         # Services et API
│   ├── api.ts                       # Configuration Axios et endpoints
│   └── models.ts                    # Modèles de données
│
├── types/                            # Types TypeScript globaux
│   └── index.ts                     # Exports de types
│
├── hooks/                            # Hooks React personnalisés
│   ├── useColorScheme.web.ts        # Hook pour le thème
│   └── ...autres hooks
│
├── constants/                        # Constantes de l'application
│   └── index.ts                     # Constantes globales
│
├── assets/                           # Ressources statiques
│   ├── images/                      # Images (icônes, splash, favicon)
│   └── fonts/                       # Polices personnalisées
│
├── scripts/                          # Scripts utilitaires
│   └── reset-project.js             # Script de réinitialisation
│
├── app.json                          # Configuration Expo
├── package.json                      # Dépendances et scripts
├── tsconfig.json                     # Configuration TypeScript
├── .prettierrc.js                    # Configuration Prettier
├── .eslintrc                         # Configuration ESLint
├── theme.ts                          # Thème de l'application
└── cmd.js                            # Commandes personnalisées
```

---

## 🚀 Installation et configuration

### Prérequis

- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn** >= 3.x
- **Expo CLI** (optionnel, mais recommandé)
- **Git**

### Étapes d'installation

#### 1. Cloner le repository

```bash
git clone <url-du-repository>
cd yuunna
```

#### 2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

#### 3. Configurer l'API

Modifiez le fichier `services/api.ts` pour pointer vers votre backend :

```typescript
// services/api.ts
const API_BASE_URL_DEV = 'http://192.168.11.21:3000'; // Remplacez par votre IP
```

**Important pour Expo Go** : Utilisez l'adresse IP locale de votre machine, pas `localhost`.

#### 4. Démarrer l'application

**Mode développement (Expo Go)** :

```bash
npm start
# ou
yarn start
```

Scannez le code QR avec votre téléphone (Expo Go app).

**Mode Web** :

```bash
npm run web
```

**Mode Android** :

```bash
npm run android
```

**Mode iOS** :

```bash
npm run ios
```

---

## 📚 Guide de développement

### Conventions de code

#### Nommage

- **Fichiers composants** : PascalCase (ex: `HomeScreen.tsx`)
- **Fichiers utilitaires** : camelCase (ex: `formatPrice.ts`)
- **Constantes** : UPPER_SNAKE_CASE (ex: `PAGE_SIZE = 20`)
- **Variables/fonctions** : camelCase (ex: `fetchMoreData()`)

#### Structure d'un composant

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  const [state, setState] = useState('');

  useEffect(() => {
    // Logique d'effet
  }, []);

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

#### Imports

```typescript
// 1. Imports React/React Native
import React, { useState } from 'react';
import { View, Text } from 'react-native';

// 2. Imports de dépendances externes
import { useDispatch } from 'react-redux';

// 3. Imports locaux
import { useAppSelector } from '@/store/hooks';
import { Product } from '@/store/types';
```

### Ajouter une nouvelle page

#### 1. Créer le fichier de route

```typescript
// app/(route)/(tabs)/mypage.tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function MyPage() {
  return (
    <View>
      <Text>Ma nouvelle page</Text>
    </View>
  );
}
```

#### 2. Ajouter la navigation (si nécessaire)

Les routes sont automatiquement détectées par Expo Router.

### Ajouter un nouveau composant

#### 1. Créer le fichier

```typescript
// components/MyComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
}

export const MyComponent: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

#### 2. Exporter depuis un fichier index (optionnel)

```typescript
// components/index.ts
export { MyComponent } from './MyComponent';
```

### Ajouter une nouvelle action Redux

#### 1. Modifier le slice

```typescript
// store/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: { cursor: number; limit: number }) => {
    // Logique de récupération
    return data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducers synchrones
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});
```

#### 2. Utiliser dans un composant

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/productSlice';

export const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ cursor: 0, limit: 20 }));
  }, [dispatch]);

  return (
    // Rendu
  );
};
```

---

## 🎛️ Gestion de l'état

### Architecture Redux

L'application utilise **Redux Toolkit** pour la gestion d'état centralisée.

#### Store

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### Hooks personnalisés

```typescript
// store/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T) =>
  useSelector<RootState, T>(selector);
```

#### Types d'état

```typescript
// store/types.ts
export interface Product {
  id: string;
  titre: string;
  prix: string | number;
  imageUrl: string;
  // ... autres propriétés
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  cursor: number;
  hasMore: boolean;
  // ... autres propriétés
}
```

### Flux de données avec Redux

```
Utilisateur clique
        ↓
dispatch(fetchProducts())
        ↓
Thunk intercepte l'action
        ↓
Appel API via Axios
        ↓
action.pending → state.loading = true
        ↓
Backend répond
        ↓
action.fulfilled → state.items = data
        ↓
Composant re-rendu avec nouvelles données
```

---

## 🔌 API et services

### Configuration Axios

```typescript
// services/api.ts
const api = axios.create({
  baseURL: API_BASE_URL_DEV,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
```

### Endpoints disponibles

#### Récupérer les produits Taobao

```typescript
GET /taobao-products?cursor=0&limit=20&keyword=美国T恤&lastDocId=xyz
```

**Paramètres** :

- `cursor` (number) : Position du curseur pour la pagination
- `limit` (number) : Nombre de produits à retourner
- `keyword` (string, optionnel) : Mot-clé de recherche
- `lastDocId` (string, optionnel) : ID du dernier document pour Firestore

**Réponse** :

```json
{
  "success": true,
  "items": [
    {
      "id": "123",
      "titre": "T-shirt",
      "prix": "¥489",
      "imageUrl": "https://...",
      "vendeur": "Shop Name",
      "ventes": "1000+"
    }
  ],
  "pagination": {
    "cursor": 0,
    "nextCursor": 20,
    "limit": 20,
    "hasMore": true,
    "totalAvailable": 1000
  },
  "lastDoc": {
    "id": "123",
    "lastDocId": "123",
    "lastDocData": "{...}"
  }
}
```

### Service API

```typescript
// services/api.ts
export const productService = {
  async getTaobaoProducts(
    cursor: number = 0,
    limit: number = 10,
    keyword: string = '',
    lastDocId?: string
  ): Promise<ProductsResponse> {
    // Implémentation
  },
};
```

### Gestion des erreurs

```typescript
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'Une erreur est survenue',
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);
```

---

## 🎨 Composants principaux

### Home (Accueil)

**Fichier** : `components/tabs/home/home.tsx`

**Responsabilités** :

- Affichage du catalogue de produits
- Gestion du défilement infini
- Chargement des données initiales et supplémentaires
- Affichage des loaders personnalisés

**Props** : Aucune (utilise Redux pour l'état)

**État** :

```typescript
const { items, loading, hasMore } = useAppSelector(state => state.products);
```

**Fonctionnalités clés** :

- Défilement infini avec seuil de 0 (déclenché à la fin)
- Chargement de 20 produits par requête
- Réutilisation des produits pour les différents designs
- Gestion des doublons

### Designs d'items

L'application utilise plusieurs designs pour afficher les produits :

#### Design 1 (design1Products)

- 1 produit principal + 2 produits supplémentaires

#### Design 2 (design2Products)

- 1 produit principal + 3 produits supplémentaires

#### Design 4 (design4Products)

- 1 produit principal + 4 produits supplémentaires

### Bannière défilante

**Fichier** : `components/tabs/home/design/Banner.tsx` (ou similaire)

**Caractéristiques** :

- Défilement automatique continu
- Pause au toucher
- Reprise après relâchement
- Animation smooth

### Panier

**Fichier** : `components/tabs/panier/`

**Fonctionnalités** :

- Affichage des articles du panier
- Modification des quantités
- Calcul du sous-total et des frais
- Suppression d'articles

### Notifications

**Fichier** : `components/tabs/notification/`

**Fonctionnalités** :

- Liste des notifications
- Marquage comme lu/non lu
- Affichage d'un état vide

### Compte utilisateur

**Fichier** : `components/tabs/account/`

**Sections** :

- Profil utilisateur
- Paramètres (notifications, mode sombre, langue)
- Informations de compte
- Méthodes de paiement
- Adresses de livraison
- Centre d'aide

---

## 🎨 Styles et thème

### Thème global

```typescript
// theme.ts
export const LightTheme = {
  dark: false,
  colors: {
    background: '#fff',
    text: '#000',
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    background: '#000',
    text: '#fff',
  },
};
```

### StyleSheet

Chaque composant utilise `StyleSheet.create()` pour les styles :

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
```

### Responsive Design

Utilisez les dimensions de l'écran pour un design responsive :

```typescript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.5,
  },
});
```

---

## 📦 Déploiement

### Préparation

#### 1. Mettre à jour la version

```json
{
  "version": "1.0.1"
}
```

#### 2. Configurer l'API de production

```typescript
// services/api.ts
const API_BASE_URL_PROD = 'https://api.yuunna.com';
const API_BASE_URL = API_BASE_URL_PROD;
```

#### 3. Vérifier les configurations

- `app.json` : Vérifier les icônes et configurations
- `tsconfig.json` : Vérifier les chemins d'alias
- `.eslintrc` : Vérifier les règles de linting

### Déploiement sur Expo

#### 1. Créer un compte Expo

```bash
expo login
```

#### 2. Publier l'application

```bash
expo publish
```

#### 3. Générer les builds

**iOS** :

```bash
eas build --platform ios
```

**Android** :

```bash
eas build --platform android
```

### Déploiement sur App Store / Google Play

Consultez la [documentation Expo](https://docs.expo.dev/deploy/submit-to-app-stores/) pour les détails complets.

---

## 🔧 Dépannage

### Problèmes courants

#### 1. Erreur de connexion à l'API

**Symptôme** : `Network Error` ou `Cannot connect to server`

**Solutions** :

- Vérifiez que le backend est en cours d'exécution
- Vérifiez l'adresse IP dans `services/api.ts`
- Assurez-vous que votre téléphone est sur le même réseau
- Vérifiez les pare-feu

#### 2. Produits ne se chargent pas

**Symptôme** : Liste vide ou loader infini

**Solutions** :

- Vérifiez les logs de la console
- Vérifiez la réponse de l'API dans DevTools
- Vérifiez que `hasMore` est correctement défini
- Vérifiez le mot-clé de recherche

#### 3. Défilement infini en boucle

**Symptôme** : Requêtes répétées sans fin

**Solutions** :

- Vérifiez que `hasMore` est défini à `false` quand il n'y a plus de données
- Vérifiez le seuil `onEndReachedThreshold` (doit être 0)
- Vérifiez la détection des doublons
- Ajoutez des logs pour déboguer

#### 4. Erreurs TypeScript

**Symptôme** : Erreurs de compilation

**Solutions** :

- Exécutez `npm run lint` pour vérifier les erreurs
- Vérifiez les types dans `store/types.ts`
- Vérifiez les imports

#### 5. Problèmes de performance

**Symptôme** : Application lente ou figée

**Solutions** :

- Réduisez le nombre de produits chargés (PAGE_SIZE)
- Utilisez `React.memo()` pour les composants coûteux
- Optimisez les images
- Utilisez `FlatList` avec `removeClippedSubviews`

### Logs et débogage

#### Activer les logs détaillés

```typescript
// services/api.ts
console.log(`[API] Appel à l'API: ${url}`);
console.log(`[API] Réponse: ${JSON.stringify(response.data)}`);
```

#### Utiliser Redux DevTools

```bash
npm install --save-dev redux-devtools-extension
```

```typescript
// store/index.ts
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
  reducer: { /* ... */ },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* middleware */),
});
```

---

## 🤝 Contribution

### Processus de contribution

1. **Fork** le repository
2. **Créez une branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Committez vos changements** (`git commit -m 'Add some AmazingFeature'`)
4. **Poussez vers la branche** (`git push origin feature/AmazingFeature`)
5. **Ouvrez une Pull Request**

### Standards de code

- Utilisez TypeScript pour tous les nouveaux fichiers
- Suivez les conventions de nommage
- Écrivez des commentaires clairs
- Testez votre code avant de soumettre
- Utilisez Prettier pour formater le code

```bash
npm run lint
```

### Signaler des bugs

Créez une issue avec :

- Description du bug
- Étapes pour reproduire
- Comportement attendu
- Logs d'erreur
- Environnement (OS, version, etc.)

---

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

---

## 📞 Support

Pour toute question ou problème :

- 📧 Email : support@yuunna.com
- 💬 Discord : [Lien Discord]
- 🐛 Issues : [GitHub Issues]
- 📖 Documentation : [Wiki]

---

## 🎉 Remerciements

Merci à tous les contributeurs et à la communauté React Native/Expo !

---

## 📊 Statistiques du projet

| Métrique             | Valeur |
| -------------------- | ------ |
| Lignes de code       | ~5000+ |
| Composants           | 40+    |
| Pages                | 6+     |
| Dépendances          | 30+    |
| Version              | 1.0.0  |
| Dernière mise à jour | 2024   |

---

**Dernière mise à jour** : Novembre 2024

**Mainteneur** : Équipe Yuunna

**Status** : ✅ En développement actif
