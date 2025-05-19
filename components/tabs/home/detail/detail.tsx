import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DetailComponent() {
  // Refs for animations
  const scrollY = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  // Product data state
  const [heartAnimValue] = useState(new Animated.Value(1));
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState('42');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');
  
  // Product data
  const product = {
    name: 'Nike Air Max 270',
    brand: 'Nike',
    rating: 4.8,
    reviews: 1256,
    currentPrice: 139.99,
    originalPrice: 179.99,
    discount: '22%',
    stock: 'En stock',
    sku: 'NK-AM270-BK',
    categories: ['Chaussures', 'Sport', 'Running'],
    description: 'Ces Nike Air Max 270 offrent un amorti exceptionnel et un style urbain moderne. Conçues pour un confort optimal tout au long de la journée avec une unité Air visible à l\'arrière.',
    features: [
      'Empeigne en mesh pour une respirabilité optimale',
      'Unité Air Max 270 pour un amorti réactif',
      'Semelle intermédiaire en mousse pour plus de souplesse',
      'Semelle extérieure en caoutchouc pour une adhérence durable',
      'Logo Nike sur la languette et le côté',
    ],
    specifications: [
      { name: 'Matière', value: 'Mesh, Synthétique, Caoutchouc' },
      { name: 'Style', value: 'Sportif, Casual' },
      { name: 'Hauteur de tige', value: 'Basse' },
      { name: 'Pays d\'origine', value: 'Vietnam' },
      { name: 'Référence', value: 'NK-AM270-BK-42' },
    ],
    shippingInfo: [
      { icon: 'truck', text: 'Livraison gratuite à partir de 50€' },
      { icon: 'calendar', text: 'Livraison en 2-4 jours ouvrables' },
      { icon: 'refresh', text: 'Retours gratuits sous 30 jours' },
    ],
    warranty: '2 ans de garantie fabricant',
  };
  
  // Colors to choose from with more vibrant options
  const colors = [
    { name: 'black', hex: '#000000', label: 'Noir' },
    { name: 'purple', hex: '#7B1FA2', label: 'Violet' },
    { name: 'red', hex: '#E53935', label: 'Rouge' },
    { name: 'blue', hex: '#1E88E5', label: 'Bleu' },
    { name: 'green', hex: '#43A047', label: 'Vert' },
  ];
  
  // Sizes available
  const sizes = ['38', '39', '40', '41', '42', '43', '44'];
  
  // Product images - using the same image for demo, but would be different angles in real app
  const productImages = [
    require('@/assets/images/home/gmx.png'),
    require('@/assets/images/home/gmx.png'),
    require('@/assets/images/home/gmx.png'),
  ];
  
  // Animation effects
  React.useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Animation for heart button
  const animateHeart = () => {
    setIsFavorite(!isFavorite);
    Animated.sequence([
      Animated.timing(heartAnimValue, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(heartAnimValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Increment and decrement quantity
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  // Header animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#5B21B6" />
      
      {/* Animated Header */}
      <Animated.View style={[
        styles.animatedHeader,
        { 
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslate }]
        }
      ]}>
        <Text style={styles.animatedHeaderTitle}>{product.name}</Text>
        <Text style={styles.animatedHeaderPrice}>{product.currentPrice} €</Text>
      </Animated.View>
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.brand}</Text>
        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="#fff" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Main product image with favorite button */}
        <View style={styles.mainImageContainer}>
          <Image 
            source={productImages[activeImageIndex]} 
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          <Animated.View 
            style={[
              styles.favoriteButton, 
              { transform: [{ scale: heartAnimValue }] }
            ]}
          >
            <TouchableOpacity onPress={animateHeart}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={24} 
                color={isFavorite ? "#E53935" : "#333"} 
              />
            </TouchableOpacity>
          </Animated.View>
          
          {/* Image slider indicator */}
          <View style={styles.imageIndicator}>
            {productImages.map((_, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.indicatorDot,
                  activeImageIndex === index && styles.activeDot
                ]}
                onPress={() => setActiveImageIndex(index)}
              />
            ))}
          </View>
          
          {/* Stock badge */}
          <View style={styles.stockBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.stockText}>{product.stock}</Text>
          </View>
        </View>
        
        {/* Product info card */}
        <Animated.View 
          style={[styles.productInfoCard, { opacity: opacityAnim }]}
        >
          {/* Brand and rating */}
          <View style={styles.brandRow}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandText}>{product.brand.toUpperCase()}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.reviews} avis)</Text>
            </View>
          </View>
          
          {/* Product name */}
          <Text style={styles.productName}>{product.name}</Text>
          
          {/* Categories */}
          <View style={styles.categoriesContainer}>
            {product.categories.map((category, index) => (
              <View key={index} style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
          
          {/* Price section */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.currentPrice} €</Text>
            <Text style={styles.originalPrice}>{product.originalPrice} €</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}</Text>
            </View>
            <Text style={styles.taxInfo}>Prix TTC</Text>
          </View>

          {/* SKU */}
          <Text style={styles.skuText}>Réf: {product.sku}</Text>
        </Animated.View>

        {/* Tabs for different sections */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'description' && styles.activeTab]}
            onPress={() => setSelectedTab('description')}
          >
            <Text style={[styles.tabText, selectedTab === 'description' && styles.activeTabText]}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'features' && styles.activeTab]}
            onPress={() => setSelectedTab('features')}
          >
            <Text style={[styles.tabText, selectedTab === 'features' && styles.activeTabText]}>Caractéristiques</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'shipping' && styles.activeTab]}
            onPress={() => setSelectedTab('shipping')}
          >
            <Text style={[styles.tabText, selectedTab === 'shipping' && styles.activeTabText]}>Livraison</Text>
          </TouchableOpacity>
        </View>
        
        {/* Tab content */}
        <View style={styles.tabContent}>
          {selectedTab === 'description' && (
            <>
              <Text style={styles.tabContentTitle}>Description</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              
              {/* Specifications */}
              <Text style={styles.specificationsTitle}>Spécifications</Text>
              {product.specifications.map((spec, index) => (
                <View key={index} style={styles.specificationRow}>
                  <Text style={styles.specificationName}>{spec.name}</Text>
                  <Text style={styles.specificationValue}>{spec.value}</Text>
                </View>
              ))}
            </>
          )}
          
          {selectedTab === 'features' && (
            <>
              <Text style={styles.tabContentTitle}>Caractéristiques</Text>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <AntDesign name="checkcircle" size={16} color="#4CAF50" style={styles.featureIcon} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
              
              <View style={styles.warrantySection}>
                <MaterialCommunityIcons name="shield-check" size={22} color="#5B21B6" />
                <Text style={styles.warrantyText}>{product.warranty}</Text>
              </View>
            </>
          )}
          
          {selectedTab === 'shipping' && (
            <>
              <Text style={styles.tabContentTitle}>Livraison & Retours</Text>
              {product.shippingInfo.map((info, index) => (
                <View key={index} style={styles.shippingInfoRow}>
                  {info.icon === 'truck' && (
                    <Feather name="truck" size={20} color="#5B21B6" style={styles.shippingIcon} />
                  )}
                  {info.icon === 'calendar' && (
                    <Feather name="calendar" size={20} color="#5B21B6" style={styles.shippingIcon} />
                  )}
                  {info.icon === 'refresh' && (
                    <Feather name="refresh-cw" size={20} color="#5B21B6" style={styles.shippingIcon} />
                  )}
                  <Text style={styles.shippingInfoText}>{info.text}</Text>
                </View>
              ))}
            </>
          )}
        </View>
        
        {/* Color selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.sectionTitle}>Couleur: <Text style={styles.selectedOptionText}>{colors.find(c => c.name === selectedColor)?.label}</Text></Text>
          <View style={styles.colorOptions}>
            {colors.map(color => (
              <TouchableOpacity 
                key={color.name}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.hex },
                  selectedColor === color.name && styles.selectedColorBorder,
                  color.name === 'white' && styles.whiteColorBorder
                ]}
                onPress={() => setSelectedColor(color.name)}
              >
                {selectedColor === color.name && (
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={color.name === 'white' ? '#333' : '#fff'} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Size selection */}
        <View style={styles.selectionContainer}>
          <View style={styles.sizeHeader}>
            <Text style={styles.sectionTitle}>Taille: <Text style={styles.selectedOptionText}>{selectedSize}</Text></Text>
            <TouchableOpacity style={styles.sizeGuideButton}>
              <Text style={styles.sizeGuideText}>Guide des tailles</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sizeScrollView}>
            <View style={styles.sizeOptions}>
              {sizes.map(size => (
                <TouchableOpacity 
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSize
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text 
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        
        {/* Quantity selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.sectionTitle}>Quantité</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Ionicons name="remove" size={20} color="#333" />
            </TouchableOpacity>
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Ionicons name="add" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Ionicons name="cart-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.addToCartText}>AJOUTER AU PANIER</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buyNowButton}>
            <Ionicons name="flash-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buyNowText}>ACHETER MAINTENANT</Text>
          </TouchableOpacity>
        </View>
        
        {/* Social proof section */}
        <View style={styles.socialProofContainer}>
          <View style={styles.socialProofItem}>
            <Ionicons name="people-outline" size={24} color="#5B21B6" />
            <Text style={styles.socialProofText}>15 personnes consultent ce produit</Text>
          </View>
          <View style={styles.socialProofItem}>
            <Ionicons name="bag-check-outline" size={24} color="#5B21B6" />
            <Text style={styles.socialProofText}>42 ventes ce mois-ci</Text>
          </View>
        </View>
        
        {/* Footer space */}
        <View style={styles.footerSpace} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#5B21B6',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  animatedHeaderTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '70%',
  },
  animatedHeaderPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#5B21B6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  backButton: {
    padding: 8,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    marginRight: 16,
    padding: 8,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF9800',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainImageContainer: {
    width: '100%',
    height: 350,
    position: 'relative',
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(91, 33, 182, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#5B21B6',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stockBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stockText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  productInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: -30,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandBadge: {
    backgroundColor: '#5B21B6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  brandText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: 'rgba(91, 33, 182, 0.1)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: '#5B21B6',
    fontSize: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountBadge: {
    backgroundColor: '#E53935',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taxInfo: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    width: '100%',
  },
  skuText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#5B21B6',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#5B21B6',
    fontWeight: '600',
  },
  tabContent: {
    backgroundColor: '#fff',
    padding: 16,
  },
  tabContentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  specificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  specificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  specificationName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  specificationValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  warrantySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(91, 33, 182, 0.05)',
    borderRadius: 8,
  },
  warrantyText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginLeft: 8,
  },
  shippingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shippingIcon: {
    marginRight: 12,
  },
  shippingInfoText: {
    fontSize: 14,
    color: '#333',
  },
  selectionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  selectedOptionText: {
    color: '#5B21B6',
    fontWeight: '700',
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorBorder: {
    borderWidth: 2,
    borderColor: '#5B21B6',
  },
  whiteColorBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sizeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sizeGuideButton: {
    padding: 4,
  },
  sizeGuideText: {
    fontSize: 14,
    color: '#5B21B6',
    textDecorationLine: 'underline',
  },
  sizeScrollView: {
    marginBottom: 10,
  },
  sizeOptions: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedSize: {
    borderColor: '#5B21B6',
    backgroundColor: '#5B21B6',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  quantityDisplay: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 9,
    minWidth: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  addToCartButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#5B21B6',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialProofContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  socialProofItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialProofText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  footerSpace: {
    height: 40,
  },
});
