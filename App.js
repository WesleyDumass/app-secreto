import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando suas telas
import EnderecoScreen from './screens/EnderecoScreen';
import PedidoScreen from './screens/PedidoScreen';
import ResumoScreen from './screens/ResumoScreen';
import PagamentoScreen from './screens/PagamentoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Endereco"
        screenOptions={{
          headerStyle: { backgroundColor: '#DD7B21' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Endereco"
          component={EnderecoScreen}
          options={{ title: 'Coloque seu Endereço' }}
        />
        <Stack.Screen
          name="Pedido"
          component={PedidoScreen}
          options={{ title: 'Monte sua Pizza' }}
        />
        <Stack.Screen
          name="Resumo"
          component={ResumoScreen}
          options={{ title: 'Resumo do Pedido' }}
        />
        <Stack.Screen
          name="Pagamento"
          component={PagamentoScreen}
          options={{ title: 'Pagamento' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
