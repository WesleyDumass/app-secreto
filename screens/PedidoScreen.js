import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const sabores = {
  calabresa: { nome: 'Calabresa', preco: 50.99, imagem: require('../assets/pizza_calabresa.png') },
  portuguesa: { nome: 'Portuguesa', preco: 53.99, imagem: require('../assets/pizza_portuguesa.png') },
  frango: { nome: 'Frango', preco: 45.0, imagem: require('../assets/pizza_frango_queijo.png') },
  brigadeiro: { nome: 'Brigadeiro', preco: 35.0, imagem: require('../assets/pizza_brigadeiro.png') },
};

export default function PedidoScreen({ navigation, route }) {
  const [sabor1, setSabor1] = useState('calabresa');
  const [sabor2, setSabor2] = useState('portuguesa');
  const [usarDoisSabores, setUsarDoisSabores] = useState(false);
  const [bordaRecheada, setBordaRecheada] = useState(false);

  const pedidoAtual = route.params?.pedido || [];
  const endereco = route.params?.endereco || null;

  const calculaPreco = () => {
    let precoBase = usarDoisSabores
      ? (sabores[sabor1].preco + sabores[sabor2].preco) / 2
      : sabores[sabor1].preco;
    return precoBase + (bordaRecheada ? 8 : 0);
  };

  const handleAdicionarPizza = () => {
    const novaPizza = {
      sabores: usarDoisSabores ? [sabores[sabor1].nome, sabores[sabor2].nome] : [sabores[sabor1].nome],
      preco: calculaPreco(),
      bordaRecheada,
    };

    navigation.navigate('Resumo', {
      pedido: [...pedidoAtual, novaPizza],
      endereco,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.logo}>Monte sua Pizza</Text>

        <View style={styles.imageContainer}>
          <Image source={sabores[sabor1].imagem} style={styles.imagem} />
          {usarDoisSabores && <Image source={sabores[sabor2].imagem} style={styles.imagem} />}
        </View>

        <Picker selectedValue={sabor1} onValueChange={setSabor1} style={styles.picker}>
          {Object.entries(sabores).map(([key, { nome }]) => (
            <Picker.Item key={key} value={key} label={nome} />
          ))}
        </Picker>

        {usarDoisSabores && (
          <>
            <Text style={styles.text}>Escolha o segundo sabor:</Text>
            <Picker selectedValue={sabor2} onValueChange={setSabor2} style={styles.picker}>
              {Object.entries(sabores).map(([key, { nome }]) => (
                <Picker.Item key={key} value={key} label={nome} />
              ))}
            </Picker>
          </>
        )}

        <TouchableOpacity style={styles.botao} onPress={() => setUsarDoisSabores(!usarDoisSabores)}>
          <Text style={styles.botaoTexto}>
            {usarDoisSabores ? 'Voltar para 1 Sabor' : 'Adicionar 2 Sabores'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, bordaRecheada ? { backgroundColor: '#4CAF50' } : {}]}
          onPress={() => setBordaRecheada(!bordaRecheada)}
        >
          <Text style={styles.botaoTexto}>
            {bordaRecheada ? 'Borda adicionada (+R$8)' : 'Adicionar borda recheada'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>Preço: R$ {calculaPreco().toFixed(2)}</Text>

        <TouchableOpacity style={styles.botaoConfirmar} onPress={handleAdicionarPizza}>
          <Text style={styles.botaoTexto}>Adicionar Pizza ao Pedido</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  picker: {
    width: 250,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  botao: {
    backgroundColor: '#DD7B22',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: 250,
    alignItems: 'center',
  },
  botaoConfirmar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: 250,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
