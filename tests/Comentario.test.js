import { expect } from 'chai';
import { sequelize, Comentario, Usuario, Curso } from '../models/index.js';

describe('Modelo Comentario', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // Reset banco
    });

    let usuario, curso;

    beforeEach(async () => {

        usuario = await Usuario.create({
            nome: 'Usuário Teste',
            email: `usuario${Date.now()}@teste.com`,
            senha: 'senha123',
            tipo: 'aluno'
        });


        curso = await Curso.create({
            titulo: 'Curso Teste',
            descricao: 'Descrição do curso',
            categoria: 'Categoria X',
            instrutorId: usuario.id
        });
    });




    it('Não deve criar comentário sem texto', async () => {
        try {
            await Comentario.create({
                nota: 3,
                usuarioId: usuario.id,
                cursoId: curso.id
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('texto');
        }
    });

    it('Não deve criar comentário com nota menor que 1', async () => {
        try {
            await Comentario.create({
                texto: 'Nota muito baixa',
                nota: 0,
                usuarioId: usuario.id,
                cursoId: curso.id
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('nota');
        }
    });

    it('Não deve criar comentário com nota maior que 5', async () => {
        try {
            await Comentario.create({
                texto: 'Nota muito alta',
                nota: 6,
                usuarioId: usuario.id,
                cursoId: curso.id
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('nota');
        }
    });

    it('Deve associar corretamente com o usuário autor', async () => {
        const comentario = await Comentario.create({
            texto: 'Comentário para teste de associação',
            nota: 5,
            usuarioId: usuario.id,
            cursoId: curso.id
        });

        const autor = await comentario.getAutor();
        expect(autor).to.not.be.null;
        expect(autor.id).to.equal(usuario.id);
    });


});