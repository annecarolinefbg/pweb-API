import express from 'express';
import { Aula } from '../models/Index.js';

const AulaRouters = express.Router();


AulaRouters.get('/', async (_req, res) => {
  try {
    const aula = await Aula.findAll();
    res.json(aula);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar aula', details: err.message });
  }
});


AulaRouters.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aula = await Aula.findByPk(id);

    if (aula)
      res.json(aula);
    else
      res.status(404).json({ error: 'Nenhum aula encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao encontrar aula', details: err.message });
  }
});

AulaRouters.post('/', async (req, res) => {
  try {
    const aula = await Aula.build(req.body);
 
    await aula.validate();
    await aula.save();

    res.status(201).json(aula);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o aula', details: err.message, errorFull: err });
  }
});

AulaRouters.post('/batch', async (req, res) => {
  try {
    const result = await Aula.bulkCreate(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar o aula', details: err.message, errorFull: err });
  }
});



AulaRouters.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [updated] = await Aula.update(req.body, {
      where: { id },
    });

    if (updated) {
      const aulaAtualizado = await Aula.findByPk(id);
      return res.json(aulaAtualizado);
    }

    return res.status(404).json({ error: 'Aula não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar aula', details: err.message });
  }
});


AulaRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Aula.destroy({
      where: { id },
    });

    if (deleted) {
      return res.json({ message: 'Deletado com sucesso' });
    }

    return res.status(404).json({ error: 'Aula não encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar aula', details: err.message });
  }
});

export default AulaRouters;