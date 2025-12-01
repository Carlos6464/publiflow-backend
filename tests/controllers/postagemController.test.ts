import request from 'supertest';
import app from '../../src/index';
import { prisma } from '../../src/database/prisma';
import path from 'path';
import fs from 'fs';

let authorId: number;

beforeEach(async () => {
  // Ordem de deleção corrigida para evitar erro de chave estrangeira
  await prisma.pF_postagem.deleteMany({});
  await prisma.pF_usuario.deleteMany({});
  await prisma.pF_papelUsuario.deleteMany({});

  await prisma.pF_papelUsuario.create({
    data: { id: 1, papelUsuario: 'Aluno' },
  });

  const author = await prisma.pF_usuario.create({
    data: {
      nomeCompleto: 'Cristhian Mendes',
      telefone: '11933049341',
      email: 'cris456mendes@gmail.com',
      papelUsuarioID: 1,
      senha: '123',
    },
  });
  authorId = author.id;
});

describe('Testando rota /api/posts', () => {
  it('Criação de post', async () => {
    const imagePath = path.join(__dirname, '..', 'assets', 'test-image.png');

    if (!fs.existsSync(imagePath)) {
      if (!fs.existsSync(path.dirname(imagePath))) {
        fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      }
      fs.writeFileSync(imagePath, 'fake image data');
    }

    const response = await request(app)
      // Adicionada a barra inicial '/'
      .post('/api/posts')
      .field('titulo', 'Post criativo')
      .field('descricao', 'Esta é a descrição do meu primeiro post.')
      .field('visibilidade', 'true')
      .field('autorID', authorId.toString())
      .attach('imagem', imagePath);

    expect(response.status).toBe(201);
    expect(response.body.autorID).toEqual(authorId);
    expect(response.body.titulo).toEqual('Post criativo');
  });

  it('Lista todos os posts', async () => {
    // Adicionada a barra inicial '/'
    const response = await request(app).get('/api/posts');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Busca post por id', async () => {
    const postData = await prisma.pF_postagem.create({
      data: {
        titulo: 'teste',
        descricao: 'teste',
        visibilidade: true,
        caminhoImagem: 'fake-path.jpg',
        autorID: authorId,
      },
    });

    // Adicionada a barra inicial '/'
    const response = await request(app).get(`/api/posts/${postData.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(postData.id);
  });

  it('Atualizar post', async () => {
    const postData = await prisma.pF_postagem.create({
      data: {
        titulo: 'teste',
        descricao: 'teste',
        visibilidade: true,
        caminhoImagem: 'fake-path.jpg',
        autorID: authorId,
      },
    });

    const updatedPostData = {
      descricao: 'descrição da postagem atualizada',
    };

    // Adicionada a barra inicial '/'
    const response = await request(app)
      .put(`/api/posts/${postData.id}`)
      .send(updatedPostData);

    expect(response.statusCode).toBe(200);
    expect(response.body.descricao).toBe(updatedPostData.descricao);
  });

  it('Deletar post', async () => {
    const postData = await prisma.pF_postagem.create({
      data: {
        titulo: 'teste',
        descricao: 'teste',
        visibilidade: true,
        caminhoImagem: 'fake-path.jpg',
        autorID: authorId,
      },
    });

    // Adicionada a barra inicial '/'
    const response = await request(app).delete(`/api/posts/${postData.id}`);

    expect(response.statusCode).toBe(204);
  });

  it('Listar feed com postagens visiveis', async () => {
    const postData = await prisma.pF_postagem.create({
      data: {
        titulo: 'teste',
        descricao: 'teste',
        visibilidade: true,
        caminhoImagem: 'fake-path.jpg',
        autorID: authorId,
      },
    });

    const response = await request(app).get(`/api/posts/feed`);

    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toEqual(postData.id);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Busca post por titulo ou descrição', async () => {
    const postData = await prisma.pF_postagem.create({
      data: {
        titulo: 'titulo criativo',
        descricao: 'teste',
        visibilidade: true,
        caminhoImagem: 'fake-path.jpg',
        autorID: authorId,
      },
    });

    const response = await request(app)
      .get(`/api/posts/search`)
      .query({ q: 'titulo criativo' });

    expect(response.statusCode).toBe(200);
    expect(response.body[0].id).toEqual(postData.id);
  });
});

