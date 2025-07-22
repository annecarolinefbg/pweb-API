import { expect } from 'chai';
import { sequelize, Usuario } from '../models/index.js';

describe('Modelo Usuario', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // Reseta o banco antes dos testes
    });

    it('Deve criar um usuário válido do tipo instrutor', async () => {
        const usuario = await Usuario.create({
            nome: 'Maria Silva',
            email: 'maria@teste.com',
            senha: '123456',
            tipo: 'instrutor'
        });

        expect(usuario).to.have.property('id');
        expect(usuario.nome).to.equal('Maria Silva');
        expect(usuario.email).to.equal('maria@teste.com');
        expect(usuario.tipo).to.equal('instrutor');
    });

    it('Deve criar um usuário válido do tipo aluno', async () => {
        const usuario = await Usuario.create({
            nome: 'João Alves',
            email: 'joao@teste.com',
            senha: 'abcdef',
            tipo: 'aluno'
        });

        expect(usuario.tipo).to.equal('aluno');
    });

    it('Não deve criar usuário sem nome', async () => {
        try {
            await Usuario.create({
                email: 'semnome@teste.com',
                senha: '123456',
                tipo: 'aluno'
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('nome');
        }
    });

    it('Não deve criar usuário sem email', async () => {
        try {
            await Usuario.create({
                nome: 'Sem Email',
                senha: '123456',
                tipo: 'aluno'
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('email');
        }
    });

    it('Não deve criar usuário sem senha', async () => {
        try {
            await Usuario.create({
                nome: 'Sem Senha',
                email: 'semsenha@teste.com',
                tipo: 'aluno'
            });
        } catch (err) {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].path).to.equal('senha');
        }
    });


});