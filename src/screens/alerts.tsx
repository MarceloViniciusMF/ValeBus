import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

interface Alerta {
  id: number;
  tipo: string;
  titulo: string;
  desc: string;
  icon: MaterialIconName;
  color: string;
}

const AlertasScreen = ({ navigation }: any) => {
  
  const alertas: Alerta[] = [
    { id: 1, tipo: 'ATRASADO', titulo: 'Linha 100 está atrasada', desc: 'O ônibus para Eldorado está atrasado em 15 minutos.', icon: 'warning', color: '#d9534f' },
    { id: 2, tipo: 'CANCELADA', titulo: 'Rota de Linha 305 cancelada', desc: 'Um problema mecanico no ônibus ocorreu.', icon: 'cancel', color: '#d9534f' },
    { id: 3, tipo: 'AVISO', titulo: 'Greve programada para amanhã', desc: 'Uma paralisação geral dos motoristas está programada a partir das 6:00.', icon: 'report-problem', color: '#f0ad4e' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3d1a" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alertas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {alertas.length > 0 ? (
          alertas.map((item) => (
            <View key={item.id} style={styles.alertCard}>
              <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                <MaterialIcons name={item.icon} size={30} color={item.color} />
              </View>
              <View style={styles.alertInfo}>
                <View style={styles.alertHeaderRow}>
                  <Text style={[styles.alertTitle, { color: item.color }]}>{item.titulo}</Text>
                  {item.tipo !== 'AVISO' && (
                    <View style={[styles.badge, { backgroundColor: item.color }]}>
                      <Text style={styles.badgeText}>{item.tipo}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.alertDesc}>{item.desc}</Text>
              </View>
            </View>
          ))
        ) : (
          /* Estado Vazio (Imagem de baixo) */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyCard}>
              <Ionicons name="warning-outline" size={120} color="#b0b0b0" style={{ marginBottom: 20 }} />
              <Text style={styles.emptyTitle}>Nenhum alerta no momento</Text>
              <Text style={styles.emptySubtitle}>Você está atualizado sobre suas linhas de ônibus.</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e9f0e6' },
  header: {
    backgroundColor: '#1a3d1a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  backButton: { marginRight: 20 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: '500' },
  scrollContent: { padding: 20 },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertInfo: { flex: 1 },
  alertHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  alertTitle: { fontSize: 15, fontWeight: 'bold', flex: 1, marginRight: 5 },
  alertDesc: { fontSize: 13, color: '#666', lineHeight: 18 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  // Estilos Estado Vazio
  emptyContainer: { flex: 1, marginTop: 100 },
  emptyCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    elevation: 2,
  },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a3d1a', textAlign: 'center', marginBottom: 10 },
  emptySubtitle: { fontSize: 14, color: '#666', textAlign: 'center' },
});

export default AlertasScreen;