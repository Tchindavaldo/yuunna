import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SuiviColis() {
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Analytics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Statistiques</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Tout voir</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Colis en transit</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>+20%</Text>
                <Text style={styles.daysText}>7j</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Livraisons en attente</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>-10%</Text>
                <Text style={styles.daysText}>7j</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Livraisons totales</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>+15%</Text>
                <Text style={styles.daysText}>7j</Text>
              </View>
            </View>

            {/* <View style={styles.statItem}>
              <Text style={styles.statLabel}>Dernier colis expédié</Text>
              <View style={styles.latestPostStats}>
                <View style={styles.postStatItem}>
                  <MaterialCommunityIcons name="package-variant" size={16} color="#888" />
                  <Text style={styles.postStatNumber}>1</Text>
                </View>
                <View style={styles.postStatItem}>
                  <Ionicons name="time-outline" size={16} color="#888" />
                  <Text style={styles.postStatNumber}>2j</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#888" />
              </View>
            </View> */}
          </View>
        </View>

        {/* Points d'acheminement Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Points d'acheminement</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Détails</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressTrackingContainer}>
            {/* First row of icons above progress bar */}
            <View style={styles.progressRowContainer}>
              <TouchableOpacity style={styles.iconProgressItem}>
                <View style={[styles.iconBackground, styles.completedStep]}>
                  <MaterialIcons name="shopping-cart" size={22} color="black" />
                  <View style={styles.completedDot} />
                </View>
                <Text style={styles.iconText}>Commande</Text>
                <Text style={styles.iconText}>passée</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconProgressItem}>
                <View style={[styles.iconBackground, styles.completedStep]}>
                  <MaterialCommunityIcons name="store" size={22} color="black" />
                  <View style={styles.completedDot} />
                </View>
                <Text style={styles.iconText}>Fournisseur</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconProgressItem}>
                <View style={[styles.iconBackground, styles.activeStep]}>
                  <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={22} color="black" />
                  <View style={styles.notificationDot} />
                </View>
                <Text style={styles.iconText}>Vérification</Text>
                <Text style={styles.iconText}>qualité</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconProgressItem}>
                <View style={styles.iconBackground}>
                  <MaterialCommunityIcons name="warehouse" size={22} color="black" />
                </View>
                <Text style={styles.iconText}>Transitaire</Text>
                <Text style={styles.iconText}>local</Text>
              </TouchableOpacity>
            </View>

            {/* Custom progress bar with vertical drop */}
            <View style={styles.customProgressBar}>
              {/* Horizontal line for first row */}
              <View style={styles.progressLineTop}>
                <View style={styles.progressCompletedTop} />
              </View>
              {/* Vertical line connecting to second row */}
              <View style={styles.progressLineVertical}>
                <View style={styles.progressCompletedVertical} />
              </View>
              {/* Horizontal line for second row */}
              <View style={styles.progressLineBottom}>
                <View style={styles.progressCompletedBottom} />
              </View>
            </View>

            {/* Second row of icons */}

            <View style={styles.progressSecondRowContainer}>
              <View>
                <TouchableOpacity style={styles.rewardsContainer}>
                  <View>
                    <Text style={styles.rewardsText}>Estimation d'arrivée</Text>
                  </View>
                  <View style={styles.rewardsAmount}>
                    <Text style={styles.amountText}>15 Mai 2025</Text>
                    <Ionicons name="chevron-forward" size={16} color="#888" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.progressSecondRowContainer2}>
                <TouchableOpacity style={styles.iconProgressItemBottom}>
                  <View style={styles.iconBackground}>
                    <MaterialIcons name="local-shipping" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Expédition</Text>
                  <Text style={styles.iconText}>en cours</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconProgressItemBottom}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="truck-delivery" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Agence</Text>
                  <Text style={styles.iconText}>Cameroun</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Mes Colis Section */}
        <View style={styles.section}>
          <Text style={styles.toolsTitle}>Mes Colis</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colisScrollView}>
            <View style={styles.colisGridContainer}>
              {/* Row 1 */}
              <View style={styles.colisRow}>
                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="shoe-formal" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Chaussures Nike</Text>
                  <Text style={styles.statusTag}>En transit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="headphones" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Écouteurs BT</Text>
                  <Text style={styles.statusTagDelivered}>Livré</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="tshirt-crew" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>T-shirt XL</Text>
                  <Text style={styles.statusTagPending}>En attente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialIcons name="phone-android" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Smartphone</Text>
                  <Text style={styles.statusTag}>En transit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="laptop" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Ordinateur</Text>
                  <Text style={styles.statusTagPending}>En attente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="watch" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Montre</Text>
                  <Text style={styles.statusTagVerification}>Vérification</Text>
                </TouchableOpacity>
              </View>

              {/* Row 2 */}
              <View style={styles.colisRow}>
                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="details" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Parfum</Text>
                  <Text style={styles.statusTagDelivered}>Livré</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="book-open-variant" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Livre</Text>
                  <Text style={styles.statusTag}>En transit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="camera" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Appareil Photo</Text>
                  <Text style={styles.statusTagDelivered}>Livré</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="toy-brick" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Jouets</Text>
                  <Text style={styles.statusTagVerification}>Vérification</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialCommunityIcons name="food" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Aliments</Text>
                  <Text style={styles.statusTagPending}>En attente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.colisItem}>
                  <View style={styles.iconBackground}>
                    <MaterialIcons name="add" size={22} color="black" />
                  </View>
                  <Text style={styles.iconText}>Nouveau</Text>
                  <Text style={styles.iconText}>Colis</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9fa',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 16,
    paddingBottom: 10,
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

  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#888',
    marginRight: 4,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  statItem: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
    marginVertical: 2,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
  },
  daysText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  latestPostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  latestPostText: {
    fontSize: 14,
    fontWeight: '500',
  },
  latestPostStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  postStatNumber: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  activeStep: {
    backgroundColor: '#c6f7e2',
    borderWidth: 1,
    borderColor: '#60c89b',
  },
  completedStep: {
    backgroundColor: '#d0f0d0',
    borderWidth: 1,
    borderColor: '#60c89b',
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#60c89b',
  },
  completedDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2a6b2a',
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  statusTag: {
    fontSize: 10,
    backgroundColor: '#e0f2ff',
    color: '#0066cc',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
    overflow: 'hidden',
  },
  statusTagDelivered: {
    fontSize: 10,
    backgroundColor: '#d0f0d0',
    color: '#2a6b2a',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
    overflow: 'hidden',
  },
  statusTagPending: {
    fontSize: 10,
    backgroundColor: '#fff3cd',
    color: '#856404',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
    overflow: 'hidden',
  },
  statusTagVerification: {
    fontSize: 10,
    backgroundColor: '#e2d6ff',
    color: '#5a3db8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
    overflow: 'hidden',
  },
  rewardsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  rewardsText: {
    fontSize: 14,
  },
  rewardsAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  toolsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // Progress tracking styles
  progressTrackingContainer: {
    marginBottom: 0,
    position: 'relative',
  },
  customProgressBar: {
    position: 'relative',
    height: 55, // Total height for the connecting lines
    zIndex: 1,
  },
  progressLineTop: {
    position: 'absolute',
    top: 0,
    left: 24,
    right: 24,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  progressCompletedTop: {
    width: '37%', // Width corresponding to current progress
    height: 4,
    backgroundColor: '#60c89b',
    borderRadius: 2,
  },
  progressLineVertical: {
    position: 'absolute',
    top: 0,
    right: '25%', // Position at the end of the first row
    width: 4,
    height: 55,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  progressCompletedVertical: {
    width: 4,
    height: 0, // No completion for vertical part
    backgroundColor: '#60c89b',
    borderRadius: 2,
  },
  progressLineBottom: {
    position: 'absolute',
    bottom: 0,
    right: 24,
    width: '35%', // Width for the last two steps
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  progressCompletedBottom: {
    width: 0, // No completion for bottom part
    height: 4,
    backgroundColor: '#60c89b',
    borderRadius: 2,
  },
  progressRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    overflow: 'visible',
  },
  progressSecondRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    // paddingRight: 24,
    // gap: 12,
  },
  progressSecondRowContainer2: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // flexGrow: 1,
    // paddingRight: 24,
    // gap: 50,
  },
  iconProgressItem: {
    width: '22%',
    alignItems: 'center',
  },
  iconProgressItemBottom: {
    width: '44%',
    alignItems: 'center',
  },
  // Colis section styles
  colisScrollView: {
    marginBottom: 0,
  },
  colisGridContainer: {
    flexDirection: 'column',
  },
  colisRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  colisItem: {
    width: 85,
    alignItems: 'center',
    marginRight: 14,
  },
});
