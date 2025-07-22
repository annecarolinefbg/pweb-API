import { expect } from 'chai';
import { sequelize, Aula, Curso, Usuario } from '../models/index.js';

describe('Modelo Aula', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // Zera o banco antes dos testes
    });

    let cursoCriado;

    beforeEach(async () => { // Cria um curso e instrutor antes de cada teste
        // Gera um timestamp para garantir unicidade dos emails
        const timestamp = Date.now();

        const instrutor = await Usuario.create({
            nome: 'Instrutor Teste',
            email: `instrutor${timestamp}@teste.com`, // email único por execução
            senha: 'senha123',
            tipo: 'instrutor'
        });

        cursoCriado = await Curso.create({
            titulo: 'Curso Teste',
            descricao: 'Curso para testar aulas',
            categoria: 'Programação',
            instrutorId: instrutor.id
        });
    });

    it('Deve criar uma aula válida', async () => {

        const aula = await Aula.create({
            titulo: 'Aula 1',
            videoUrl: 'http://video.com/aula1',
            cursoId: cursoCriado.id
        });

        expect(aula).to.have.property('id');
        expect(aula.titulo).to.equal('Aula 1');
        expect(aula.videoUrl).to.equal('http://video.com/aula1');
        expect(aula.cursoId).to.equal(cursoCriado.id);
    });

    it('Não deve criar uma aula sem título', async () => {
        try {
            await Aula.create({
                videoUrl: 'http://video.com/sem-titulo',
                cursoId: cursoCriado.id
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('titulo');
        }
    });

    it('Não deve criar uma aula sem videoUrl', async () => {
        try {
            await Aula.create({
                titulo: 'Aula sem vídeo',
                cursoId: cursoCriado.id
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('videoUrl');
        }
    });

});