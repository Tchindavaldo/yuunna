import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Type pour les notifications
type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any; // On utilise 'any' pour éviter les problèmes de typage avec les icônes
  color: string;
};

const { width } = Dimensions.get('window');

// Données d'exemple pour les notifications
const notifications = [
  {
    id: '1',
    title: 'Nouvelle promotion',
    message:
      "Profitez de 20% de réduction sur votre prochaine commande avec le code PROMO20. Offre valable jusqu'au 30 juin.",
    time: 'Il y a 2h',
    read: false,
    icon: 'pricetag-outline',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'Commande expédiée',
    message: 'Votre commande #YU78542 a été expédiée et sera livrée dans 2-3 jours ouvrables.',
    time: 'Il y a 5h',
    read: false,
    icon: 'cube-outline',
    color: '#4CAF50',
  },
  {
    id: '3',
    title: 'Paiement confirmé',
    message: 'Le paiement de 89,99€ pour votre commande #YU78542 a été confirmé. Merci pour votre achat!',
    time: 'Hier',
    read: true,
    icon: 'card-outline',
    color: '#3D5AFE',
  },
  {
    id: '4',
    title: 'Nouveau produit disponible',
    message: 'Découvrez notre nouvelle collection été 2025 maintenant disponible sur notre boutique.',
    time: 'Il y a 2j',
    read: true,
    icon: 'star-outline',
    color: '#FF9800',
  },
  {
    id: '5',
    title: 'Avis client',
    message:
      "Merci d'avoir effectué un achat chez Yuunna. Pourriez-vous prendre un moment pour évaluer votre expérience?",
    time: 'Il y a 3j',
    read: true,
    icon: 'chatbubble-outline',
    color: '#607D8B',
  },
  {
    id: '6',
    title: "Mise à jour de l'application",
    message:
      "Une nouvelle version de l'application est disponible. Mettez à jour pour profiter des dernières fonctionnalités.",
    time: 'Il y a 4j',
    read: true,
    icon: 'refresh-outline',
    color: '#00BCD4',
  },
  {
    id: '7',
    title: 'Invitation à un événement',
    message: 'Vous êtes invité à notre événement exclusif de lancement de produit le 15 juillet à Paris.',
    time: 'Il y a 5j',
    read: true,
    icon: 'calendar-outline',
    color: '#9C27B0',
  },
  {
    id: '8',
    title: 'Rappel: Articles dans votre panier',
    message: "Vous avez des articles dans votre panier. Complétez votre achat avant qu'ils ne soient épuisés!",
    time: 'Il y a 6j',
    read: true,
    icon: 'cart-outline',
    color: '#E91E63',
  },
  {
    id: '9',
    title: 'Programme de fidélité',
    message:
      'Félicitations! Vous avez atteint le niveau Silver dans notre programme de fidélité. Profitez de nouveaux avantages exclusifs.',
    time: 'Il y a 1sem',
    read: true,
    icon: 'ribbon-outline',
    color: '#8BC34A',
  },
  {
    id: '10',
    title: 'Maintenance planifiée',
    message:
      'Notre application sera en maintenance le 25 juin de 2h à 4h du matin. Nous nous excusons pour la gêne occasionnée.',
    time: 'Il y a 2sem',
    read: true,
    icon: 'construct-outline',
    color: '#FFC107',
  },
];

// Composant simple de notification
function NotificationSimple() {
  // État pour le modal
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedNotification, setSelectedNotification] = React.useState<NotificationItem | null>(null);

  // Animation pour le modal
  const modalAnim = React.useRef(new Animated.Value(0)).current;

  // Fonction pour ouvrir le modal
  const openModal = (notification: NotificationItem) => {
    setSelectedNotification(notification);
    setModalVisible(true);

    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedNotification(null);
    });
  };

  // Styles d'animation
  const translateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const backdropOpacity = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  // Rendu d'un élément de notification
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        item.read ? styles.readNotification : styles.unreadNotification,
        { borderLeftColor: item.color },
      ]}
      onPress={() => openModal(item)}
      activeOpacity={0.7}>
      <Ionicons name={item.icon} size={22} color={item.color} style={styles.notificationIcon} />
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <View style={styles.timeContainer}>
            {!item.read && <View style={[styles.unreadDot, { backgroundColor: item.color }]} />}
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={1} ellipsizeMode="tail">
          {item.message}
        </Text>
      </View>
      <View style={styles.expandIndicator}>
        <Ionicons name="chevron-forward-outline" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.headerSubtitle}>
            <Text style={styles.headerSubtitleText}>Restez informé de toutes vos activités</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>{notifications.filter(n => !n.read).length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Liste des notifications */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <LinearGradient colors={['#f5f7fa', '#e4e8f0']} style={styles.emptyIconContainer}>
            <Ionicons name="notifications-off-outline" size={40} color="#8e9aaf" />
          </LinearGradient>
          <Text style={styles.emptyText}>Aucune notification</Text>
          <Text style={styles.emptySubtext}>Vous n'avez pas encore reçu de notifications</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Text style={styles.refreshButtonText}>Actualiser</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal pour les détails de notification */}
      <Modal visible={modalVisible} transparent={true} animationType="none" onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View style={[styles.modalOverlay, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
          <SafeAreaView style={styles.modalContent}>
            {selectedNotification && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalHeaderLeft}>
                    <View style={[styles.modalIconContainer, { backgroundColor: selectedNotification.color + '10' }]}>
                      <Ionicons name={selectedNotification.icon} size={24} color={selectedNotification.color} />
                    </View>
                    <View>
                      <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                      <Text style={styles.modalTime}>{selectedNotification.time}</Text>
                    </View>
                  </View>
                </View>

                <ScrollView style={styles.modalBody}>
                  <Text style={styles.modalMessage}>{selectedNotification.message}</Text>
                </ScrollView>

                <View style={styles.modalActions}>
                  {!selectedNotification.read && (
                    <TouchableOpacity style={styles.modalActionButton}>
                      <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" style={styles.actionIcon} />
                      <Text style={styles.modalActionText}>Marquer comme lu</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </SafeAreaView>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },

  expandIndicator: {
    marginLeft: 10,
  },

  notificationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationsList: {
    paddingHorizontal: 8,
    paddingRight: 15,
    paddingTop: 25,
    paddingBottom: 40,
    marginTop: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: 'red',
    borderRadius: 16,
    marginBottom: 40,
    padding: 0,
    borderLeftWidth: 0,
    overflow: 'hidden', // Masquer le contenu qui déborde
  },

  unreadNotification: {
    backgroundColor: '#FFFFFF',
  },
  readNotification: {
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
  notificationIcon: {
    marginRight: 12,
    marginLeft: 0,
  },
  notificationContent: {
    flex: 1,
    width: '85%',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
    width: '80%',
  },

  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontWeight: '400',
    marginTop: -5,
    // width: '95%',
  },
  expandedMessage: {
    marginTop: 8,
    marginBottom: 8,
    lineHeight: 22,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 10,
    maxHeight: '80%',
    padding: 15,
  },
  modalContent: {
    padding: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  modalTime: {
    fontSize: 14,
    color: '#999',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f5f7fa',
    marginLeft: 10,
  },
  actionIcon: {
    marginRight: 8,
  },
  modalActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
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
  refreshButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e8f0',
  },
  refreshButtonText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default NotificationSimple;
