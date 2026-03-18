import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  Platform,
  StatusBar 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Tipagem básica para a navegação
interface ValeBusProps {
  navigation: any;
}

const ValeBusScreen: React.FC<ValeBusProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3d1a" />
      
      {/* Header Verde Escuro */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>VB</Text>
            </View>
            <Text style={styles.logoText}>
              Vale<Text style={{ color: '#a3cc39' }}>Bus</Text>
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Campo de Busca */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput 
            placeholder="Buscar linha ou destino..." 
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        {/* Botões de Ação Rápida */}
        <View style={styles.quickActionsRow}>
          <QuickAction 
            icon="star" 
            label="Favoritos" 
            onPress={() => navigation.navigate('Favoritos')} 
          />
          <QuickAction icon="location-on" label="Próximos" isMaterial />
          <QuickAction icon="warning" label="Alertas"
          onPress={() => navigation.navigate('Alertas')} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Seção Linhas Frequentes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Linhas Frequentes</Text>
          <TouchableOpacity><Text style={styles.seeAll}>Ver todas</Text></TouchableOpacity>
        </View>

        <BusLineCard 
          number="100" route="Registro ↔ Eldorado" 
          time="5h30 - 22h00" eta="12 min" status="NO HORÁRIO" 
        />
        <BusLineCard 
          number="201" route="Iporanga ↔ Apiaí" 
          time="6h00 - 21h30" eta="25 min" status="ATRASADO" isDelayed 
        />
        <BusLineCard 
          number="305" route="Cananéia ↔ Ilha Comprida" 
          time="5h00 - 23h00" eta="8 min" status="NO HORÁRIO" 
        />

        {/* Seção Ônibus Próximos */}
        <View style={styles.upcomingHeader}>
          <View style={styles.busIconBadge}>
            <FontAwesome5 name="bus" size={16} color="white" />
          </View>
          <Text style={styles.sectionTitle}>Ônibus Próximos</Text>
        </View>

        <UpcomingBusCard 
          title="Linha 100 • Eldorado" 
          distance="1.2 km" arrival="12 minutos" 
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-componentes ---

const QuickAction = ({ icon, label, isMaterial, onPress }: any) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    {isMaterial ? 
      <MaterialIcons name={icon} size={24} color="#a3cc39" /> : 
      <Ionicons name={icon} size={24} color="#a3cc39" />
    }
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const BusLineCard = ({ number, route, time, eta, status, isDelayed }: any) => (
  <View style={styles.busCard}>
    <View style={styles.busNumberCircle}>
      <Text style={styles.busNumberText}>{number}</Text>
    </View>
    <View style={styles.busInfo}>
      <Text style={styles.busTitle}>Linha {number}</Text>
      <Text style={styles.busRoute}>{route}</Text>
      <View style={styles.timeRow}>
        <Ionicons name="time-outline" size={12} color="#999" />
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
    <View style={styles.busEtaContainer}>
      <Text style={styles.etaText}>{eta}</Text>
      <View style={[styles.statusBadge, isDelayed && { backgroundColor: '#e67e22' }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  </View>
);

const UpcomingBusCard = ({ title, distance, arrival }: any) => (
  <View style={styles.upcomingCard}>
    <View style={styles.upcomingTop}>
      <Text style={styles.upcomingTitle}>{title}</Text>
      <Text style={styles.upcomingDistance}>{distance}</Text>
    </View>
    
    <View style={styles.timelineContainer}>
      <View style={styles.dotSmall} />
      <View style={[styles.line, { backgroundColor: '#a3cc39' }]} />
      <View style={styles.dotLarge} />
      <View style={[styles.line, { backgroundColor: '#eee' }]} />
      <View style={[styles.dotSmall, { backgroundColor: '#ccc' }]} />
    </View>

    <View style={styles.arrivalRow}>
      <Text style={styles.arrivalLabel}>Chega em:</Text>
      <Text style={styles.arrivalTime}>{arrival}</Text>
    </View>
  </View>
);

// --- Estilos ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a3d1a',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    backgroundColor: '#a3cc39',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#1a3d1a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    width: '31%',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  actionLabel: {
    color: 'white',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#a3cc39',
    fontWeight: 'bold',
  },
  busCard: {
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#a3cc39',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  busNumberCircle: {
    backgroundColor: '#1a3d1a',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  busNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  busInfo: {
    flex: 1,
  },
  busTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  busRoute: {
    fontSize: 13,
    color: '#777',
    marginVertical: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#aaa',
    marginLeft: 4,
  },
  busEtaContainer: {
    alignItems: 'flex-end',
  },
  etaText: {
    color: '#a3cc39',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statusBadge: {
    backgroundColor: '#a3cc39',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 5,
  },
  statusText: {
    color: '#1a3d1a',
    fontSize: 9,
    fontWeight: 'bold',
  },
  upcomingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  busIconBadge: {
    backgroundColor: '#6b8e23',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  upcomingCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#a3cc39',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  upcomingTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  upcomingDistance: {
    fontSize: 13,
    color: '#999',
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  dotSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#a3cc39',
  },
  dotLarge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#a3cc39',
  },
  line: {
    flex: 1,
    height: 2,
  },
  arrivalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrivalLabel: {
    fontSize: 15,
    color: '#666',
  },
  arrivalTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a3d1a',
  },
});

export default ValeBusScreen;