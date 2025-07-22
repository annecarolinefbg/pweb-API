import express from 'express';
import { Curso } from '../models/Index.js';

const CursosRouters = express.Router();


CursosRouters.get('/', async (_req, res) => {
  try {
    const curso = await Curso.findAll();
    res.json(curso);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar curso', details: err.message });
  }
});


CursosRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findByPk(id);

    if (curso)
      res.json(curso);
    else
      res.status(404).json({ error: 'Nenhum curso encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar curso', details: err.message });
  }
});

CursosRouters.post('/', async (req, res) => {
  try {
    const curso  = await Curso.build(req.body);
    await curso.validate();
    await curso.save();

    res.status(201).json(curso);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o curso', details: err.message, errorFull: err });
  }
});

CursosRouters.post('/batch', async (req, res) => {
  try {
    const result = await Curso.bulkCreate(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o curso', details: err.message, errorFull: err });
  }
});



CursosRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Curso.update(req.body, {
      where: { id },
    });

    if (updated) {
      const cursoAtualizado = await Curso.findByPk(id);
      return res.json(cursoAtualizado);
    }

    return res.status(404).json({ error: 'Curso não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar cursi', details: err.message });
  }
});


CursosRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Curso.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Deletado com sucesso' });
    }

    return res.status(404).json({ error: 'Curso não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar curso', details: err.message });
  }
});

export default CursosRouters;