import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Account() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* En-tête du profil */}
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section des paramètres */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#d3d3d3', true: '#4CAF50' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={24} color="#333" />
            <Text style={styles.settingText}>Mode sombre</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#d3d3d3', true: '#4CAF50' }}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="language-outline" size={24} color="#333" />
            <Text style={styles.settingText}>Langue</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Section du compte */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="card-outline" size={24} color="#333" />
            <Text style={styles.settingText}>Méthodes de paiement</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="location-outline" size={24} color="#333" />
            <Text style={styles.settingText}>Adresses de livraison</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#333" />
            <Text style={styles.settingText}>Confidentialité et sécurité</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Section d'aide */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aide</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="help-circle-outline" size={24} color="#333" />
            <Text style={styles.settingText}>Centre d'aide</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle-outline" size={24} color="#333" />
            <Text style={styles.settingText}>À propos</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#333',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3b30',
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
