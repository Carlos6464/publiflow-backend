import type { Request, Response } from 'express';
import PostagemService from '../services/postagemService';

class PostagemController {
  /**
   *
   * @param req
   * @param res
   * @returns
   * Função para criar uma nova postagem.
   */
  public async create(req: Request, res: Response) {
    const autorID = req.usuarioId; // Populado pelo Middleware

    if (!autorID) {
      return res.status(401).json({ message: 'Usuário não identificado.' });
    }

    try {
      const { titulo, descricao, visibilidade } = req.body;

      // Pega o nome do arquivo salvo pelo multer
      const nomeDoArquivo = req.file?.filename;

      if (!nomeDoArquivo) {
        return res
          .status(400)
          .json({ message: 'O envio de uma imagem é obrigatório.' });
      }

      // Chama o serviço usando 'caminhoImagem'
      const post = await PostagemService.createPost({
        titulo,
        descricao,
        visibilidade: visibilidade === 'true',
        autorID: autorID,
        caminhoImagem: nomeDoArquivo, // Atribui o nome do arquivo ao campo correto
      });

      res.status(201).json(post);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   * Função para atualizar uma postagem existente.
   */
  public async update(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID da postagem não fornecido' });
    }



    try {
      const dadosParaAtualizar: { [key: string]: any } = { ...req.body };

      if (req.file) {
        dadosParaAtualizar.caminhoImagem = req.file.filename;
      }

      if (dadosParaAtualizar.visibilidade !== undefined) {
        dadosParaAtualizar.visibilidade =
          dadosParaAtualizar.visibilidade === 'true';
      }

      const post = await PostagemService.updatePost(
        parseInt(id),
        dadosParaAtualizar,
      );
      res.status(200).json(post);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Postagem não encontrada.' });
      }
      res.status(500).json({ message: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   * Função para obter todas as postagens.
   */
  public async getAll(req: Request, res: Response) {
    try {
      const posts = await PostagemService.getAllPosts();
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

   /**
   * Busca apenas as postagens do usuário logado (Professor)
   */
  public async getMyPosts(req: Request, res: Response) {
    const autorID = req.usuarioId; // Populado pelo Middleware

    if (!autorID) {
      return res.status(401).json({ message: 'Usuário não identificado.' });
    }

    try {
      // Pega paginação da URL (Query Params)
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10; // Lista administrativa costuma mostrar mais itens

      const result = await PostagemService.getPostsByAuthor(autorID, page, limit);
      
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   * Função para obter uma postagem por ID.
   */
  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID da postagem não fornecido' });
    }

    try {
      const post = await PostagemService.getPostById(parseInt(id));
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Postagem não encontrada' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   * Função para deletar uma postagem por ID.
   */
  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID da postagem não fornecido' });
    }

    try {
      await PostagemService.deletePost(parseInt(id));
      res.status(204).send();
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Postagem não encontrada.' });
      }
      res.status(500).json({ message: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   * Função para obter o feed de postagens visíveis.
   */
  public async getFeed(req: Request, res: Response) {
    try {
      // Pega os parâmetros da URL, com valores padrão se não forem passados
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const q = (req.query.q as string) || '';

      const result = await PostagemService.getFeedPosts(page, limit, q);
      
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   * Função para buscar postagens por termo de busca.
   */
  public async search(req: Request, res: Response) {
    const { q } = req.query;

    try {
      const posts = await PostagemService.searchPosts(q as string);
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new PostagemController();

