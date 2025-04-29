import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function PagamentoScreen({ navigation, route }) {
  const pedido = route.params?.pedido || [];

  const handleConfirmarPagamento = async () => {
    try {
      const response = await fetch('http://192.168.100.16:3001/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pedido }),
      });
      

      if (response.ok) {
        Alert.alert('Sucesso!', 'Pedido enviado para a pizzaria.');
        navigation.popToTop(); // Voltar para a tela inicial
      } else {
        Alert.alert('Erro', 'Erro ao enviar pedido.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pagamento</Text>

      <TouchableOpacity style={styles.botao} onPress={handleConfirmarPagamento}>
        <Text style={styles.botaoTexto}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  texto: { fontSize: 24, marginBottom: 30 },
  botao: { backgroundColor: '#4CAF50', padding: 20, borderRadius: 10 },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
