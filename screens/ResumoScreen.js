import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ResumoScreen({ navigation, route }) {
  const pedido = route.params?.pedido || [];
  const endereco = route.params?.endereco || {};

  const total = pedido.reduce((acc, item) => acc + item.preco, 0);

  const handleFinalizar = () => {
    navigation.navigate('Pagamento', { pedido, endereco });
  };

  const handleAdicionarMais = () => {
    navigation.navigate('Pedido', { pedido, endereco });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Resumo do Pedido</Text>

      <View style={styles.enderecoBox}>
        <Text style={styles.subtitulo}>Endereço de entrega:</Text>
        <Text style={styles.texto}>{endereco.rua}, {endereco.numero}</Text>
        <Text style={styles.texto}>{endereco.bairro} - {endereco.cidade}</Text>
      </View>

      {pedido.map((pizza, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.pizzaTitulo}>Pizza {index + 1}</Text>
          <Text style={styles.texto}>Sabores: {pizza.sabores.join(' e ')}</Text>
          <Text style={styles.texto}>Borda recheada: {pizza.bordaRecheada ? 'Sim' : 'Não'}</Text>
          <Text style={styles.texto}>Preço: R$ {pizza.preco.toFixed(2)}</Text>
        </View>
      ))}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.botaoAdicionar} onPress={handleAdicionarMais}>
        <Text style={styles.botaoTexto}>Adicionar mais pizzas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoFinalizar} onPress={handleFinalizar}>
        <Text style={styles.botaoTexto}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
  },
  enderecoBox: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    marginVertical: 2,
  },
  card: {
    backgroundColor: '#ffe9d6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  pizzaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
  },
  botaoAdicionar: {
    backgroundColor: '#DD7B22',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  botaoFinalizar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
