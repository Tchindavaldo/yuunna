import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Status() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suivi Colis</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Analytics Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Analytics</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Post views</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>0%</Text>
                <Text style={styles.daysText}>7d</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Net followers</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>0%</Text>
                <Text style={styles.daysText}>7d</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Likes</Text>
              <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>0%</Text>
                <Text style={styles.daysText}>7d</Text>
              </View>
            </View>
          </View>

          <View style={styles.latestPostContainer}>
            <Text style={styles.latestPostText}>Your latest post</Text>
            <View style={styles.latestPostStats}>
              <View style={styles.postStatItem}>
                <Ionicons name="play" size={16} color="#888" />
                <Text style={styles.postStatNumber}>1</Text>
              </View>
              <View style={styles.postStatItem}>
                <Ionicons name="heart-outline" size={16} color="#888" />
                <Text style={styles.postStatNumber}>1</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </View>
          </View>
        </View>

        {/* Monetization Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monetization</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <FontAwesome name="music" size={22} color="black" />
                <View style={styles.notificationDot} />
              </View>
              <Text style={styles.iconText}>Work with</Text>
              <Text style={styles.iconText}>Artists</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <MaterialCommunityIcons name="store" size={22} color="black" />
              </View>
              <Text style={styles.iconText}>TikTok Shop</Text>
              <Text style={styles.iconText}>for Seller</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <MaterialIcons name="card-giftcard" size={22} color="black" />
              </View>
              <Text style={styles.iconText}>Video Gifts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <MaterialCommunityIcons name="cash-multiple" size={22} color="black" />
              </View>
              <Text style={styles.iconText}>Creator</Text>
              <Text style={styles.iconText}>Rewards</Text>
              <Text style={styles.iconText}>Program</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.rewardsContainer}>
            <View>
              <Text style={styles.rewardsText}>Estimated rewards (last 7 days)</Text>
            </View>
            <View style={styles.rewardsAmount}>
              <Text style={styles.amountText}>$0.00</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </View>
          </TouchableOpacity>
        </View>

        {/* More Tools Section */}
        <View style={styles.section}>
          <Text style={styles.toolsTitle}>More tools</Text>

          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <MaterialIcons name="person" size={22} color="black" />
              </View>
              <Text style={styles.iconText}>Creator</Text>
              <Text style={styles.iconText}>Academy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <FontAwesome name="fire" size={22} color="black" />
              </View>
              <Text style={styles.iconText}>Promote</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <FontAwesome name="music" size={22} color="black" />
              </View>
              <Text style={styles.iconText}>Artist Hub</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconItem}>
              <View style={styles.iconBackground}>
                <MaterialCommunityIcons name="video-plus" size={22} color="black" />
              </View>
              <Text style={styles.iconText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Creation Inspirations Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Creation inspirations</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 8,
    padding: 16,
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
    marginBottom: 16,
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
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  iconItem: {
    width: '23%',
    alignItems: 'center',
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
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4d67',
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
