import React from 'react';
import { StyleSheet } from 'react-native';
import Status from './status/status';

export default function Suivie() {
  return <Status></Status>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
