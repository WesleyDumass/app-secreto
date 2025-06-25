import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function PagamentoScreen({ route, navigation }) {
  const { pedido, endereco } = route.params;
  const [metodoPagamento, setMetodoPagamento] = useState('pix');

  const total = pedido.reduce((acc, item) => acc + item.preco, 0);

  const handleConfirmarPagamento = async () => {
    try {
      await axios.post('http://192.168.100.16:3001/pedidos', {
        pedido,
        endereco,
        metodoPagamento,
        total,
        status: 'pendente',
      });

      Alert.alert('Sucesso', 'Pedido enviado para a pizzaria!');
      navigation.reset({ index: 0, routes: [{ name: 'Endereco' }] }); // Reinicia fluxo
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      Alert.alert('Erro', 'Não foi possível enviar o pedido.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pagamento</Text>

      <View style={styles.enderecoBox}>
        <Text style={styles.subtitulo}>Endereço:</Text>
        <Text style={styles.texto}>{endereco.rua}, {endereco.numero}</Text>
        <Text style={styles.texto}>{endereco.bairro} - {endereco.cidade}</Text>
      </View>

      <Text style={styles.subtitulo}>Resumo do Pedido:</Text>
      {pedido.map((pizza, index) => (
        <View key={index} style={styles.pizzaBox}>
          <Text style={styles.texto}>🍕 {pizza.sabores.join(' e ')} - R$ {pizza.preco.toFixed(2)}</Text>
        </View>
      ))}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <Text style={styles.subtitulo}>Forma de pagamento:</Text>
      <Picker
        selectedValue={metodoPagamento}
        onValueChange={(value) => setMetodoPagamento(value)}
        style={styles.picker}
      >
        <Picker.Item label="Pix" value="pix" />
        <Picker.Item label="Cartão de crédito" value="credito" />
        <Picker.Item label="Dinheiro" value="dinheiro" />
      </Picker>

      <TouchableOpacity style={styles.botao} onPress={handleConfirmarPagamento}>
        <Text style={styles.botaoTexto}>Confirmar Pagamento</Text>
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
  enderecoBox: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
  },
  pizzaBox: {
    backgroundColor: '#ffe9d6',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
  },
  picker: {
    height: 50,
    marginBottom: 200,
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
