import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PageHeaderProps = {
  title: string;
  subtitle: string;
  iconName: any; // Type 'any' pour éviter les problèmes de typage avec les icônes
  badgeCount: number;
  badgeColor?: string;
  onIconPress?: () => void;
};

const PageHeader = ({ title, subtitle, iconName, badgeCount, badgeColor = 'red', onIconPress }: PageHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerSubtitle}>
          <Text style={styles.headerSubtitleText}>{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={onIconPress}>
        <Ionicons name={iconName} size={22} color="#333" />
        {badgeCount > 0 && (
          <View style={[styles.notificationBadge, { backgroundColor: badgeColor }]}>
            <Text style={styles.notificationBadgeText}>{badgeCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
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
});

export default PageHeader;
