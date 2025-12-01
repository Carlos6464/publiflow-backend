import { Router } from 'express';
import PostagemController from '../controllers/postagemController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const upload = multer(multerConfig);

/**
 * @swagger
 * tags:
 *   - name: Postagens
 *     description: API para gerenciamento de postagens
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todas as postagens (Admin/Professor)
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de postagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postagem'
 *   post:
 *     summary: Cria uma nova postagem
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               visibilidade:
 *                 type: boolean
 *               autorID:
 *                 type: integer
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 *       400:
 *         description: Dados inválidos
 *
 * /posts/me:
 *   get:
 *     summary: Lista apenas as postagens do usuário logado
 *     description: Retorna as postagens criadas pelo professor autenticado.
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de postagens do professor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postagem'
 *
 * /posts/feed:
 *   get:
 *     summary: Lista o feed de postagens
 *     description: Retorna as postagens ordenadas por data de publicação (mais recentes primeiro).
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Feed de postagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postagem'
 *
 * /posts/search:
 *   get:
 *     summary: Busca postagens por termo
 *     description: Retorna postagens que correspondem ao termo de busca no título ou descrição.
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo de busca
 *     responses:
 *       200:
 *         description: Resultados da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postagem'
 *       400:
 *         description: Termo de busca não fornecido ou inválido
 */
router.get('/posts', authMiddleware(['Professor']), PostagemController.getAll);
router.get('/posts/me', authMiddleware(['Professor']), PostagemController.getMyPosts);
router.post('/posts', authMiddleware(['Professor']), upload.single('imagem'), PostagemController.create);
router.get('/posts/feed', authMiddleware(['Professor', 'Aluno']), PostagemController.getFeed);
router.get('/posts/search', authMiddleware(['Professor', 'Aluno']), PostagemController.search);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca uma postagem pelo ID
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da postagem
 *     responses:
 *       200:
 *         description: Postagem encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postagem'
 *       400:
 *         description: ID da postagem não fornecido
 *       404:
 *         description: Postagem não encontrada
 *   put:
 *     summary: Atualiza uma postagem
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da postagem
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               visibilidade:
 *                 type: boolean
 *               autorID:
 *                 type: integer
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Postagem atualizada com sucesso
 *       400:
 *         description: ID da postagem não fornecido
 *       404:
 *         description: Postagem não encontrada
 *   delete:
 *     summary: Deleta uma postagem
 *     tags: [Postagens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da postagem
 *     responses:
 *       204:
 *         description: Postagem deletada com sucesso
 *       400:
 *         description: ID da postagem não fornecido
 *       404:
 *         description: Postagem não encontrada
 */
router.get('/posts/:id', authMiddleware(['Professor']), PostagemController.getById);
router.put('/posts/:id', authMiddleware(['Professor']), upload.single('imagem'), PostagemController.update);
router.delete('/posts/:id', authMiddleware(['Professor']), PostagemController.delete);


export default router;
