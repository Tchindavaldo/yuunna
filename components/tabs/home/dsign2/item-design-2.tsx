import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ItemDesign2({ article = {} as any }) {
  const {
    titre = 'Titre par défaut',
    disponibilite = 'indisponible',
    prix1 = '0 f',
    image = require('../../../../assets/images/home/gm4.webp'), // image locale par défaut
  } = article;

  return (
    <View style={styles.container}>
      <View style={styles.imageCard}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>

      <Text style={styles.title}>{titre}</Text>
      <Text style={styles.status}>{disponibilite}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>{prix1}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="options" size={12} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    paddingRight: 0,
    marginTop: 15,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  imageCard: {
    height: 115,
    width: 135,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkred',
  },
  image: {
    height: '100%',
    width: '125%',
    transform: [{ scale: 1.1 }],
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 0,
  },
  status: {
    fontSize: 11,
    color: 'green',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '900',
  },
  iconButton: {
    backgroundColor: 'darkred',
    padding: 6,
    borderRadius: 20,
  },
});
