import express from 'express';
import { Progresso } from '../models/Index.js';

const ProgressoRouters = express.Router();


ProgressoRouters.get('/', async (_req, res) => {
  try {
    const progresso = await Progresso.findAll();
    res.json(progresso);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar progresso', details: err.message });
  }
});


ProgressoRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const progresso = await Progresso.findByPk(id);

    if (progresso)
      res.json(progresso);
    else
      res.status(404).json({ error: 'Nenhum progresso encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar progresso', details: err.message });
  }
});

ProgressoRouters.post('/', async (req, res) => {
  try {
    const progresso  = await Progresso.build(req.body);
    await progresso.validate();
    await progresso.save();

    res.status(201).json(progresso);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o progresso', details: err.message, errorFull: err });
  }
});

ProgressoRouters.post('/batch', async (req, res) => {
  try {
    const result = await Progresso.bulkCreate(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o progresso', details: err.message, errorFull: err });
  }
});

ProgressoRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Progresso.update(req.body, {
      where: { id },
    });

    if (updated) {
      const ProgressoAtualizado = await Progresso.findByPk(id);
      return res.json(ProgressoAtualizado);
    }

    return res.status(404).json({ error: 'Progresso não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar progresso', details: err.message });
  }
});


ProgressoRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Progresso.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Deletado com sucesso' });
    }

    return res.status(404).json({ error: 'Progresso não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar progresso', details: err.message });
  }
});

export default ProgressoRouters;