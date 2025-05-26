import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const SanLorenzo = require('./assets/Escudo.png')
const Romana = require('./assets/romana.jpg')
const Tonga = require('./assets/Tonga.jpg')

function ScreenA1() {
  const navigation = useNavigation(); 
  return (
    <View style={styles.Home}>
      <Image 
        source={SanLorenzo}
        style={styles.Imagen}
      />
      <Text style={styles.Texto}>HOME</Text>
      <Text style={styles.Descripcion}>
        Primer Stack - Primer Screen
        {'\n\n'}
        Boton para navegar a ScreenA2
      </Text>
      <Button title="Detalles" onPress={() => navigation.navigate('ScreenA2')} />
    </View>
  );
}

function ScreenA2() {
  const navigation = useNavigation();
  return (
    <View style={styles.Home}>
      <Text style={styles.Texto}>HOME - DETALLE</Text>
      <Text style={styles.Descripcion}>
        Contenido detallado de la sección Home
      </Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ScreenB1() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = React.useState('');

  return (
    <View style={styles.Busqueda}>
      <Text style={styles.Texto}>BUSCADOR</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button 
        title="Buscar item 1" 
        onPress={() => navigation.navigate('ScreenB2', { itemId: 1, searchQuery: searchText })} 
      />
      <Button 
        title="Buscar item 2" 
        onPress={() => navigation.navigate('ScreenB2', { itemId: 2, searchQuery: searchText })} 
      />
      <TouchableOpacity onPress={() => alert('Búsqueda realizada!')}>
        <Ionicons name="search" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function ScreenB2({ route }) {
  const { itemId, searchQuery } = route.params;
  const navigation = useNavigation();
  
  return (
    <View style={styles.Busqueda}>
      <Text style={styles.Texto}>RESULTADO DE BÚSQUEDA</Text>
      <Text style={styles.Texto}>Item ID: {itemId}</Text>
      <Text style={styles.Texto}>Término buscado: {searchQuery || 'Ninguno'}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ScreenC1() {
  const navigation = useNavigation();
  return (
    <View style={styles.Perfil}>
      <Image 
        source={Romana}
        style={styles.Imagen}
      />
      <Text style={styles.Texto}>MI PERFIL</Text>
      <Text style={styles.Descripcion}>
        Información básica del usuario
      </Text>
      <Button title="Editar Perfil" onPress={() => navigation.navigate('ScreenC2')} />
    </View>
  );
}

function ScreenC2() {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View style={styles.Perfil}>
      <Text style={styles.Texto}>EDITAR PERFIL</Text>
      
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nombre"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Button 
        title="Guardar y Ver" 
        onPress={() => navigation.navigate('ScreenC3', { userName: name, userPhone: phone })} 
      />
    </View>
  );  
}

function ScreenC3({ route }) {
  const { userName, userPhone } = route.params;
  const navigation = useNavigation();
  
  return (
    <View style={styles.Perfil}>
      <Text style={styles.Texto}>DATOS GUARDADOS</Text>
      <Text style={styles.Texto}>Nombre: {userName}</Text>
      <Text style={styles.Texto}>Teléfono: {userPhone}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ScreenD1() {
  const navigation = useNavigation();
  return (
    <View style={styles.Configuracion}>
      <Text style={styles.Texto}>CONFIGURACIÓN</Text>
      <Text style={styles.Descripcion}>
        Ajustes de la aplicación
      </Text>
      <Button 
        title="Acerca de" 
        onPress={() => navigation.navigate('ScreenD2')} 
      />
    </View>
  );
}

function ScreenD2() {
  const navigation = useNavigation();
  return (
    <View style={styles.Configuracion}>
      <Text style={styles.Texto}>ACERCA DE</Text>
      <Text style={styles.Descripcion}>
        Versión 1.0.0
        {'\n'}
        React Navigation Demo
      </Text>
      <Image 
        source={Tonga}
        style={styles.Imagen}
      />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const StackA = createNativeStackNavigator();
const StackB = createNativeStackNavigator();
const StackC = createNativeStackNavigator();
const StackD = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}

function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      <StackB.Screen name="ScreenB2" component={ScreenB2} />
    </StackB.Navigator>
  );
}

function StackCNavigator() {
  return (
    <StackC.Navigator>
      <StackC.Screen 
        name="ScreenC1" 
        component={ScreenC1} 
        options={{ 
          title: 'Mi Perfil',
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              onPress={() => alert('Hiciste el click')}
              title="Toca aca"
              color="#00cc00"
            />
          ),
        }}
      />
      <StackC.Screen name="ScreenC2" component={ScreenC2} />
      <StackC.Screen name="ScreenC3" component={ScreenC3} />
    </StackC.Navigator>
  );
}

function StackDNavigator() {
  return (
    <StackD.Navigator>
      <StackD.Screen name="ScreenD1" component={ScreenD1} />
      <StackD.Screen name="ScreenD2" component={ScreenD2} />
    </StackD.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={StackANavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Buscador" 
        component={StackBNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={StackCNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Configuración" 
        component={StackDNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Texto: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  Descripcion: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '90%',
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
  },
  Imagen: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  Home: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#ff0000',
    padding: 20,
  },
  Busqueda: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#044a16',
    padding: 20,
  },
  Perfil: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0000ff',
    padding: 20,
  },
  Configuracion: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#8a2be2',
    padding: 20,
  },
});