import { expect } from 'chai';
import { sequelize, Curso, Usuario, Aula, Matricula, Comentario } from '../models/index.js';

describe('Modelo Curso', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // Reseta banco antes dos testes
    });

    let instrutor; // Variável para armazenar o instrutor criado

    beforeEach(async () => { // Cria um instrutor antes de cada teste
        instrutor = await Usuario.create({
            nome: 'Instrutor Teste',
            email: `instrutor${Date.now()}@teste.com`,
            senha: 'senha123',
            tipo: 'instrutor'
        });
    });
    // definir um caso de teste.
    it('Deve criar um curso válido', async () => {
        const curso = await Curso.create({
            titulo: 'Curso de Teste',
            descricao: 'Descrição do curso',
            categoria: 'Programação',
            instrutorId: instrutor.id
        });

        expect(curso).to.have.property('id');
        expect(curso.titulo).to.equal('Curso de Teste');
        expect(curso.descricao).to.equal('Descrição do curso');
        expect(curso.categoria).to.equal('Programação');
        expect(curso.instrutorId).to.equal(instrutor.id);
    });

    it('Não deve criar curso sem título', async () => {
        try {
            await Curso.create({
                descricao: 'Sem título',
                categoria: 'Categoria',
                instrutorId: instrutor.id
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('titulo');
        }
    });

    it('Deve associar corretamente com o instrutor', async () => {
        const curso = await Curso.create({
            titulo: 'Curso com Instrutor',
            instrutorId: instrutor.id
        });

        const instrutorAssociado = await curso.getInstrutor();
        expect(instrutorAssociado).to.not.be.null;
        expect(instrutorAssociado.id).to.equal(instrutor.id);
    });

    it('Deve associar corretamente com aulas', async () => {
        const curso = await Curso.create({
            titulo: 'Curso com Aulas',
            instrutorId: instrutor.id
        });

        const aula1 = await Aula.create({
            titulo: 'Aula 1',
            videoUrl: 'http://video.com/aula1',
            cursoId: curso.id
        });

        const aula2 = await Aula.create({
            titulo: 'Aula 2',
            videoUrl: 'http://video.com/aula2',
            cursoId: curso.id
        });

        const aulas = await curso.getAulas();
        expect(aulas).to.be.an('array').with.lengthOf(2);
        expect(aulas.map(a => a.titulo)).to.include.members(['Aula 1', 'Aula 2']);
    });



    
});