import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Cart() {
  // Animation pour le défilement
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });
  // Données d'exemple pour les articles du panier
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'T-shirt Premium',
      price: 29.99,
      quantity: 2,
      image: 'https://i.pinimg.com/736x/f7/24/fc/f724fc898fc38bb918388da6891651f2.jpg',
      color: 'Noir',
      size: 'M',
    },
    {
      id: '2',
      name: 'Jean Slim',
      price: 49.99,
      quantity: 1,
      image: 'https://i.pinimg.com/736x/bd/db/67/bddb67d49b9cf9a9e4db75712d7ade48.jpg',
      color: 'Bleu',
      size: 'L',
    },
    {
      id: '3',
      name: 'Chaussures de sport',
      price: 89.99,
      quantity: 1,
      image: 'https://i.pinimg.com/736x/e1/93/a8/e193a84e453a9ce8f619a4443be30d21.jpg',
      color: 'Blanc',
      size: '42',
    },
    {
      id: '5',
      name: 'Chaussures de sport',
      price: 89.99,
      quantity: 1,
      image: 'https://i.pinimg.com/736x/23/f3/2e/23f32e6d2b9bd3ddc5ed7d8d9a97f020.jpg',
      color: 'Blanc',
      size: '42',
    },
  ]);

  // https://i.pinimg.com/736x/f4/a1/ee/f4a1ee71a2eb9b3eaf72194970283c59.jpg
  // https://i.pinimg.com/736x/a6/b0/21/a6b021f6f3addc7a42948345b9ab3ba3.jpg

  // Calcul du total du panier
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  // Fonction pour augmenter la quantité d'un article
  const increaseQuantity = (id: string) => {
    setCartItems(cartItems.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  // Fonction pour diminuer la quantité d'un article
  const decreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map(item => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    );
  };

  // Fonction pour supprimer un article du panier
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Rendu de chaque article du panier
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
            <Ionicons name="close-outline" size={14} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>€{(item.price * item.quantity).toFixed(2)}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={[styles.quantityButton, item.quantity <= 1 ? styles.quantityButtonDisabled : null]}
              onPress={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}>
              <Ionicons name="remove" size={16} color={item.quantity <= 1 ? '#ccc' : '#555'} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
              <Ionicons name="add" size={16} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Mon Panier</Text>
          <View style={styles.headerSubtitle}>
            <Text style={styles.headerSubtitleText}>Gérez vos articles et commandes</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="cart-outline" size={22} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {cartItems.length > 0 ? (
        <>
          <Animated.FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            scrollEventThrottle={16}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sous-total</Text>
              <Text style={styles.summaryValue}>€{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Frais de livraison</Text>
              <Text style={styles.summaryValue}>€{shipping.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>€{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
              <LinearGradient
                colors={['#4CAF50', '#2E7D32']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.checkoutGradient}>
                <Text style={styles.checkoutButtonText}>Procéder au paiement</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <LinearGradient colors={['#f5f7fa', '#e4e8f0']} style={styles.emptyIconContainer}>
            <Ionicons name="cart-outline" size={40} color="#8e9aaf" />
          </LinearGradient>
          <Text style={styles.emptyText}>Votre panier est vide</Text>
          <Text style={styles.emptySubtext}>Ajoutez des articles à votre panier pour commencer vos achats</Text>
          <TouchableOpacity style={styles.shopButton}>
            <LinearGradient
              colors={['#2196F3', '#1976D2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shopGradient}>
              <Text style={styles.shopButtonText}>Continuer mes achats</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Type pour les éléments du panier
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    height: 120,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    opacity: 1,
  },
  headerSubtitleText: {
    fontSize: 14,
    color: '#888',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  cartList: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    borderRadius: 0,
    marginBottom: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  itemImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
    lineHeight: 20,
  },
  removeButton: {
    width: 17,
    height: 17,
    borderRadius: 14,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginBottom: 10,
  },
  itemProperties: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  propertyBadge: {
    backgroundColor: '#f5f7fa',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  propertyText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    marginBottom: 18,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  checkoutButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkoutGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  shopButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  shopGradient: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
