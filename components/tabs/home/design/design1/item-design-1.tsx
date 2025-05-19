import { ItemProps } from '@/interface/itemsProps';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ItemDesign1({ article, onPressItem }: ItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPressItem();
      }}>
      <View style={styles.card}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>Pain Omelettes</Text>
          <Text style={styles.status}>indisponible</Text>
          <View style={styles.rowPriceTime}>
            <Text style={styles.price}>500f</Text>
            <Text style={styles.time}>15-20min</Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <Image
            source={require('../../../../../assets/images/home/gmx.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 160,
    backgroundColor: 'darkred',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 15,
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  status: {
    fontSize: 11,
    color: 'white',
    marginBottom: 8,
  },
  rowPriceTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    marginRight: 12,
  },
  time: {
    color: 'white',
    fontSize: 10,
  },
  image: {
    width: 80,
    height: 80,
    transform: [{ scale: 1.5 }],
    marginRight: -10,
    marginTop: 10,
  },
});

// Définition des PropTypes ici
ItemDesign1.propTypes = {
  onPressItem: PropTypes.func.isRequired, // une fonction obligatoire
  data: PropTypes.arrayOf(PropTypes.object),
};
