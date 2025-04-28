const express = require('express');
const cors = require('cors');

const app = express();
const pedidos = []; // Fila de pedidos

app.use(cors());
app.use(express.json());

// Endpoint para receber novos pedidos
app.post('/pedidos', (req, res) => {
  const novoPedido = req.body.pedido;
  if (!novoPedido) {
    return res.status(400).json({ message: 'Pedido inválido' });
  }
  pedidos.push(novoPedido);
  console.log('Novo pedido recebido:', novoPedido);
  res.status(201).json({ message: 'Pedido recebido com sucesso' });
});

// Endpoint para listar todos os pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Rodando servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
