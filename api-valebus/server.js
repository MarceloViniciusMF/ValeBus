const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'valebus'
});

db.connect((err) => {
  if (err) { console.error('❌ Erro:', err.message); return; }
  console.log('✅ MySQL conectado!');
});

// LISTAR QUADRINHOS (Com o Nome do Gênero)
app.get('/quadrinhos', (req, res) => {
  const sql = `
    SELECT q.*, g.nome as genero_nome 
    FROM quadrinhos q 
    LEFT JOIN generos g ON q.genero_id = g.id`;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// CRIAR QUADRINHO (Guardando o genero_id)
app.post('/quadrinhos', (req, res) => {
  const { nome, preco, estoque, genero_id } = req.body;
  const sql = 'INSERT INTO quadrinhos (nome, preco, estoque, genero_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, preco, estoque || 0, genero_id || null], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: result.insertId, nome, preco, estoque, genero_id });
  });
});

// ATUALIZAR QUADRINHO
app.put('/quadrinhos/:id', (req, res) => {
  const { nome, preco, estoque, genero_id } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE quadrinhos SET nome=?, preco=?, estoque=?, genero_id=? WHERE id=?';
  db.query(sql, [nome, preco, estoque, genero_id, id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: '✅ Atualizado!' });
  });
});

// DELETE E GÊNEROS
app.delete('/quadrinhos/:id', (req, res) => {
  db.query('DELETE FROM quadrinhos WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: '🗑️ Removido!' });
  });
});

app.get('/generos', (req, res) => {
  db.query('SELECT * FROM generos', (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

app.post('/generos', (req, res) => {
  const { nome } = req.body;
  db.query('INSERT INTO generos (nome) VALUES (?)', [nome], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: result.insertId, nome });
  });
});

app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));