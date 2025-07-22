import { expect } from 'chai';
import { sequelize, Matricula, Usuario, Curso, Progresso, Aula } from '../models/index.js';

describe('Modelo Matricula', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // Reset banco antes dos testes
    });

    let aluno, curso;

    beforeEach(async () => {

        aluno = await Usuario.create({
            nome: 'Aluno Teste',
            email: `aluno${Date.now()}@teste.com`,
            senha: 'senha123',
            tipo: 'aluno'
        });


        const instrutor = await Usuario.create({
            nome: 'Instrutor Teste',
            email: `instrutor${Date.now()}@teste.com`,
            senha: 'senha123',
            tipo: 'instrutor'
        });


        curso = await Curso.create({
            titulo: 'Curso Teste',
            descricao: 'Descrição do curso',
            categoria: 'Programação',
            instrutorId: instrutor.id
        });
    });
    // definir um caso de teste.
    it('Deve criar uma matrícula válida com data padrão', async () => {
        const matricula = await Matricula.create({
            usuarioId: aluno.id,
            cursoId: curso.id
            // data será default (NOW)
        });

        expect(matricula).to.have.property('id');
        expect(matricula.usuarioId).to.equal(aluno.id);
        expect(matricula.cursoId).to.equal(curso.id);
        expect(matricula.data).to.be.instanceOf(Date);
    });

    it('Deve associar corretamente com o aluno (Usuario)', async () => {
        const matricula = await Matricula.create({
            usuarioId: aluno.id,
            cursoId: curso.id
        });

        const alunoAssociado = await matricula.getAluno();
        expect(alunoAssociado).to.not.be.null;
        expect(alunoAssociado.id).to.equal(aluno.id);
    });

    it('Deve associar corretamente com o curso', async () => {
        const matricula = await Matricula.create({
            usuarioId: aluno.id,
            cursoId: curso.id
        });

        const cursoAssociado = await matricula.getCurso();
        expect(cursoAssociado).to.not.be.null;
        expect(cursoAssociado.id).to.equal(curso.id);
    });


});