import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritosScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3d1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>

      {/* Conteúdo Centralizado */}
      <View style={styles.content}>
        <View style={styles.emptyCard}>
          <Ionicons name="star-outline" size={120} color="#c2d1b2" style={styles.starIcon} />
          
          <Text style={styles.emptyTitle}>Você ainda não tem favoritos</Text>
          <Text style={styles.emptySubtitle}>Adicione linhas para acesso rápido</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f0e6', // Fundo levemente esverdeado da imagem
  },
  header: {
    backgroundColor: '#1a3d1a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyCard: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 60,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    // Sombra
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  starIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a3d1a',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default FavoritosScreen;