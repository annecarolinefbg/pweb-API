import express from 'express';
import { Usuario } from '../models/Index.js';

const Usuariorouter = express.Router();


Usuariorouter.get('/', async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: err.message });
  }
});


Usuariorouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario)
      res.json(usuario);
    else
      res.status(404).json({ error: 'Nenhum usuário encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar usuário', details: err.message });
  }
});

Usuariorouter.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.build(req.body);
 
    await usuario.validate();
    await usuario.save();

    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});

Usuariorouter.post('/batch', async (req, res) => {
  try {
    const result = await Usuario.bulkCreate(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o usuário', details: err.message, errorFull: err });
  }
});



Usuariorouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id },
    });

    if (updated) {
      const usuarioAtualizado = await Usuario.findByPk(id);
      return res.json(usuarioAtualizado);
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: err.message });
  }
});


Usuariorouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Usuario.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Deletado com sucesso' });
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: err.message });
  }
});

export default Usuariorouter;