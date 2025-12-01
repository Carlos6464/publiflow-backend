import request from 'supertest';
import app from '../../src/index';
import { prisma } from '../../src/database/prisma';

beforeEach(async () => {
  //-- Limpa as tabelas na ordem de dependência correta
  await prisma.pF_postagem.deleteMany({});
  await prisma.pF_usuario.deleteMany({});
  await prisma.pF_papelUsuario.deleteMany({});

  //-- (Re)Cria os dados base necessários para os testes, como papéis de usuário
  // Isso garante que o papel com id: 1 sempre exista para os testes de criação de usuário.
  await prisma.pF_papelUsuario.create({
    data: { id: 1, papelUsuario: 'Aluno' },
  });
});

describe('Testando rota /api/users', () => {
  it('Criação de usuário', async () => {
    const userData = {
      nome: 'cristhian',
      sobrenome: 'mendes',

      telefone: '11933049341',
      email: 'cris456mendes@gmail.com',
      papelUsuarioID: 1,
      senha: '123',
    };
    const response = await request(app).post('/api/users').send(userData);

    //-- Ajustei a resposta esperada para ser mais flexível
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nomeCompleto: 'cristhian mendes',
        email: 'cris456mendes@gmail.com',
        papelUsuarioID: 1,
      }),
    );
    //-- Verifica que a senha não foi retornada
    expect(response.body.senha).toBeUndefined();
  });

  it('Lista usuário por id', async () => {
    const userData = {
      nomeCompleto: 'cristhian mendes',
      telefone: '11933049341',
      email: 'cris456mendes@gmail.com',
      papelUsuarioID: 1,
      senha: '123',
    };
    //-- Criando usuário diretamente no banco para o teste ser mais rápido e isolado
    const user = await prisma.pF_usuario.create({ data: userData });

    const getUserResponse = await request(app).get(`/api/users/${user.id}`);

    expect(getUserResponse.statusCode).toBe(200);
    expect(getUserResponse.body).toEqual(
      expect.objectContaining({
        id: user.id,
        nomeCompleto: user.nomeCompleto,
        email: user.email,
      }),
    );
    expect(getUserResponse.body.senha).toBeUndefined();
  });

  it('Lista todos os usuários', async () => {
    //-- Criando um usuário para garantir que a lista não esteja vazia
    await prisma.pF_usuario.create({
      data: {
        nomeCompleto: 'cristhian mendes',
        telefone: '11933049341',
        email: 'cris456mendes@gmail.com',
        papelUsuarioID: 1,
        senha: '123',
      },
    });

    const getUserResponse = await request(app).get(`/api/users`);

    expect(getUserResponse.statusCode).toBe(200);
    expect(Array.isArray(getUserResponse.body)).toBe(true);
    expect(getUserResponse.body.length).toBeGreaterThan(0); // Garante que o usuário criado foi retornado
  });

  it('Atualiza usuário', async () => {
    const user = await prisma.pF_usuario.create({
      data: {
        nomeCompleto: 'cristhian mendes',
        telefone: '11933049341',
        email: 'cris456mendes@gmail.com',
        papelUsuarioID: 1,
        senha: '123',
      },
    });

    const updatedUserData = {
      email: 'email_novo@gmail.com',
    };
    const updateUserResponse = await request(app)
      .put(`/api/users/${user.id}`)
      .send(updatedUserData);

    expect(updateUserResponse.statusCode).toBe(200);
    expect(updateUserResponse.body.email).toBe(updatedUserData.email);
  });

  it('Deletar usuário', async () => {
    const user = await prisma.pF_usuario.create({
      data: {
        nomeCompleto: 'cristhian mendes',
        telefone: '11933049341',
        email: 'cris456mendes@gmail.com',
        papelUsuarioID: 1,
        senha: '123',
      },
    });

    const deleteResponse = await request(app).delete(`/api/users/${user.id}`);

    expect(deleteResponse.statusCode).toBe(204);
  });
});

