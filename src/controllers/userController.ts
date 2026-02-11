import type { Request, Response } from 'express';
import UsuarioService from '../services/userService';

class UsuarioController {
  /**
   * Função para criar um novo usuário
   * @param req 
   * @param res 
  */
  public async create(req: Request, res: Response) {
    try {
      const user = await UsuarioService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Função para listar todos os usuários
   * @param req 
   * @param res 
  */
  public async getAll(req: Request, res: Response) {
    try {
      const users = await UsuarioService.getAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Função para listar todos os usuários de um determinado tipo
   * @param req 
   * @param res 
   */
  public async getAllUsersType(req: Request, res: Response) {
    try {
      const { type } = req.params as { type: string };
      const users = await UsuarioService.getAllUsersType(type);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Função para buscar um usuário pelo ID
   * @param req 
   * @param res 
  */
  public async getById(req: Request, res: Response) {
    // 1. Pega o id dos parâmetros
    const { id } = req.params;

    // 2. Verifica se o id foi fornecido
    if (!id) {
      return res.status(400).json({ message: 'ID do usuário não fornecido' });
    }

    try {
      // 3. Agora é seguro usar o id
      const user = await UsuarioService.getById(parseInt(id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Função para atualizar um usuário
   * @param req 
   * @param res 
  */
  public async update(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID do usuário não fornecido' });
    }

    try {
      const user = await UsuarioService.update(parseInt(id), req.body);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Função para deletar um usuário
   * @param req 
   * @param res 
   * @returns 
   */
  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID do usuário não fornecido' });
    }

    try {
      await UsuarioService.delete(parseInt(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  public async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
      const result = await UsuarioService.login(email, senha);
      res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

}

// Exportamos uma instância única do controlador
export default new UsuarioController();
