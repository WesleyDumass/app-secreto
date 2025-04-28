import { useEffect, useState } from 'react';
import axios from 'axios';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  const buscarPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  useEffect(() => {
    const intervalo = setInterval(buscarPedidos, 3000); // Atualiza a lista a cada 3s
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ padding: '20px', margin:'0' }}>
      <h1>Fila de Pedidos 🍕</h1>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido no momento.</p>
      ) : (
        pedidos.map((pedido, idx) => (
          <div key={idx} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Pedido #{idx + 1}</h3>
            {pedido.map((pizza, index) => (
              <div key={index}>
                <p><strong>Pizza:</strong> {pizza.sabores.join(' / ')}</p>
                <p><strong>Preço:</strong> R$ {pizza.preco.toFixed(2)}</p>
                <p><strong>Borda:</strong> {pizza.bordaRecheada ? 'Sim' : 'Não'}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Pedidos;
