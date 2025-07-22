import express from 'express';
import {Matricula } from '../models/Index.js';

const MatriculasRouters = express.Router();


MatriculasRouters.get('/', async (_req, res) => {
  try {
    const matricula = await Matricula.findAll();
    res.json(matricula);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar matricula', details: err.message });
  }
});


MatriculasRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matricula = await Matricula.findByPk(id);

    if (matricula)
      res.json(matricula);
    else
      res.status(404).json({ error: 'Nenhuma matricula encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar matricula', details: err.message });
  }
});

MatriculasRouters.post('/', async (req, res) => {
  try {
    const matricula  = await Matricula.build(req.body);
    await matricula.validate();
    await matricula.save();

    res.status(201).json(matricula);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o matricula', details: err.message, errorFull: err });
  }
});

MatriculasRouters.post('/batch', async (req, res) => {
  try {
    const result = await Matricula.bulkCreate(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o matricula', details: err.message, errorFull: err });
  }
});

MatriculasRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Matricula.update(req.body, {
      where: { id },
    });

    if (updated) {
      const matriculaAtualizado = await Matricula.findByPk(id);
      return res.json(matriculaAtualizado);
    }

    return res.status(404).json({ error: 'matricula não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar matricula', details: err.message });
  }
});


MatriculasRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Matricula.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Deletado com sucesso' });
    }

    return res.status(404).json({ error: 'Matricula não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar matricula', details: err.message });
  }
});

export default MatriculasRouters;