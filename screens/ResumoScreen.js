import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ResumoScreen({ navigation, route }) {
  const pedido = route.params?.pedido || [];

  const precoTotal = pedido.reduce((acc, pizza) => acc + pizza.preco, 0);

  const handleFinalizarPedido = () => {
    navigation.navigate('Pagamento', { pedido, precoTotal });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo do Pedido</Text>

      <FlatList
        data={pedido}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.pizzaItem}>
            <Text style={styles.texto}>
              Pizza {index + 1}: {item.sabores.join(' + ')}
            </Text>
            <Text style={styles.texto}>
              {item.bordaRecheada ? 'Com Borda Recheada' : 'Sem Borda'}
            </Text>
            <Text style={styles.texto}>R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {precoTotal.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Pedido', { pedido })}>
        <Text style={styles.botaoTexto}>Adicionar Outra Pizza</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoConfirmar} onPress={handleFinalizarPedido}>
        <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pizzaItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#ccc',
  },
  texto: {
    fontSize: 18,
    marginVertical: 2,
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#DD7B22',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  botaoConfirmar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
