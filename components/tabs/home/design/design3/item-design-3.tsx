import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ItemDesign3() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Featured food</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {/* Milkshake Card */}
        <View style={[styles.foodCard, styles.milkshakeCard]}>
          <Text style={styles.foodTitle}>Milkshake</Text>
          <Text style={styles.foodDescription}>The most delicious in this summer</Text>

          <View style={styles.ratingContainer}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png' }}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>4.8</Text>
          </View>

          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3075/3075977.png' }}
            style={styles.milkshakeImage}
          />
        </View>

        {/* Noodle Card */}
        <View style={styles.foodCard}>
          <Text style={styles.foodTitle}>Noodle</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png' }}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3480/3480618.png' }} style={styles.foodImage} />
        </View>

        {/* Sushi Card */}
        <View style={styles.foodCard}>
          <Text style={styles.foodTitle}>Sushi</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png' }}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1699/1699721.png' }} style={styles.foodImage} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f5f5f5',

    marginTop: 15,
    marginBottom: 10,
    // paddingTop: 50,
    // paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#888',
  },
  scrollView: {
    flexGrow: 0,
  },
  foodCard: {
    width: 140,
    height: 180,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginRight: 15,
    padding: 15,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  milkshakeCard: {
    width: 160,
    backgroundColor: '#FF9A3C',
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodDescription: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 15,
    width: '90%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  milkshakeImage: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    transform: [{ rotate: '15deg' }],
  },
  foodImage: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
