import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/prisma';

// Interface do payload do token
interface TokenPayload {
  id: number;
  papelUsuarioID: number;
  iat: number;
  exp: number;
}

// Extensão do tipo Request do Express
declare global {
  namespace Express {
    interface Request {
      usuarioId?: number;
      papelUsuarioID?: number;
    }
  }
}

export function authMiddleware(rolesPermitidas: string[] = []) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const [, token] = authorization.split(' ');

    try {
      // 1. Decodifica o token
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
      const { id, papelUsuarioID } = decoded as TokenPayload;

      // 2. Adiciona dados ao request para uso posterior
      req.usuarioId = id;
      req.papelUsuarioID = papelUsuarioID;

      // 3. Se a rota não exige papéis específicos, passa
      if (rolesPermitidas.length === 0) {
        return next();
      }

      // 4. Busca o nome do papel no banco baseando-se no ID do token
      const papel = await prisma.pF_papelUsuario.findUnique({
        where: { id: papelUsuarioID },
      });

      if (!papel) {
        return res.status(403).json({ message: 'Papel de usuário não encontrado.' });
      }

      // 5. Verifica se o papel do usuário está na lista de permitidos
      // O seed define 'Aluno' e 'Professor' (com letras maiúsculas)
      if (!rolesPermitidas.includes(papel.papelUsuario)) {
        return res.status(403).json({ 
          message: 'Acesso negado: Você não tem permissão para acessar este recurso.' 
        });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
  };
}