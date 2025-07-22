import { expect } from 'chai';
import { sequelize, Progresso, Matricula, Aula, Curso, Usuario } from '../models/index.js';

describe('Modelo Progresso', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // Reseta banco antes dos testes
    });

    // Declarar as variáveis aqui para acesso em todos os testes
    let usuario, curso, aluno, matricula, aula;

    beforeEach(async () => {
        // Criar usuário (instrutor)
        usuario = await Usuario.create({
            nome: 'Instrutor Teste',
            email: `instrutor${Date.now()}@teste.com`, // email único
            senha: 'senha123',
            tipo: 'instrutor'
        });

        // Criar curso
        curso = await Curso.create({
            titulo: 'Curso Teste',
            descricao: 'Descrição do curso',
            categoria: 'Programação',
            instrutorId: usuario.id
        });

        // Criar usuário (aluno)
        aluno = await Usuario.create({
            nome: 'Aluno Teste',
            email: `aluno${Date.now()}@teste.com`, // email único
            senha: 'senha123',
            tipo: 'aluno'
        });

        // Criar matrícula
        matricula = await Matricula.create({
            usuarioId: aluno.id,
            cursoId: curso.id
        });

        // Criar aula
        aula = await Aula.create({
            titulo: 'Aula 1',
            videoUrl: 'http://video.com/aula1',
            cursoId: curso.id
        });
    });

    it('Deve criar progresso com valor padrão false', async () => {
        const progresso = await Progresso.create({
            matriculaId: matricula.id,
            aulaId: aula.id
        });

        expect(progresso).to.have.property('id');
        expect(progresso.concluido).to.be.false;
        expect(progresso.matriculaId).to.equal(matricula.id);
        expect(progresso.aulaId).to.equal(aula.id);
    });

    it('Deve permitir atualizar o progresso para concluído', async () => {
        const progresso = await Progresso.create({
            matriculaId: matricula.id,
            aulaId: aula.id
        });

        progresso.concluido = true;
        await progresso.save();

        const atualizado = await Progresso.findByPk(progresso.id);
        expect(atualizado.concluido).to.be.true;
    });


    it('Deve associar corretamente a aula', async () => {
        const progresso = await Progresso.create({
            matriculaId: matricula.id,
            aulaId: aula.id
        });

        const aulaAssociada = await progresso.getAula();
        expect(aulaAssociada).to.not.be.null;
        expect(aulaAssociada.id).to.equal(aula.id);
    });
});