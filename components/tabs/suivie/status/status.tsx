import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SuiviColis() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

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
    </SafeAreaView>
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
