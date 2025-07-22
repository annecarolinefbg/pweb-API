import express from 'express';
import { Comentario } from '../models/Index.js';

const ComentarioRouters = express.Router();


ComentarioRouters.get('/', async (_req, res) => {
  try {
    const comentario = await Comentario.findAll();
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar comentario', details: err.message });
  }
});


ComentarioRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comentario = await Comentario.findByPk(id);

    if (comentario)
      res.json(comentario);
    else
      res.status(404).json({ error: 'Nenhum comentario encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar comentario', details: err.message });
  }
});

ComentarioRouters.post('/', async (req, res) => {
  try {
    const comentario = await Comentario.build(req.body);
    await comentario.validate();
    await comentario.save();

    res.status(201).json(comentario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o comentario', details: err.message, errorFull: err });
  }
});

ComentarioRouters.post('/batch', async (req, res) => {
  try {
    const result = await Comentario.bulkCreate(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o comentario', details: err.message, errorFull: err });
  }
});



ComentarioRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Comentario.update(req.body, {
      where: { id },
    });

    if (updated) {
      const comentarioAtualizado = await Comentario.findByPk(id);
      return res.json(comentarioAtualizado);
    }

    return res.status(404).json({ error: 'Comentario não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar comentario', details: err.message });
  }
});


ComentarioRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Comentario.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Deletado com sucesso' });
    }

    return res.status(404).json({ error: 'Comentario não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar comentario', details: err.message });
  }
});

export default ComentarioRouters;