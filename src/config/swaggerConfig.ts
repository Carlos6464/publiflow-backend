import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PubliFlow API',
      version: '1.0.0',
      description: 'API para a plataforma de postagem de conteúdo PubliFlow',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    //-- Centralizando as definições reutilizáveis
    components: {
      // Definimos o esquema de segurança, mas NÃO o aplicamos globalmente aqui
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Usuario: {
          type: 'object',
          required: [
            'nomeCompleto',
            'email',
            'senha',
            'telefone',
            'papelUsuarioID',
          ],
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-gerado do usuário.',
              readOnly: true,
            },
            nomeCompleto: {
              type: 'string',
              description: 'Nome completo do usuário.',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email único do usuário.',
            },
            senha: {
              type: 'string',
              format: 'password',
              description:
                'Senha do usuário (não será retornada nas respostas).',
              writeOnly: true,
            },
            telefone: {
              type: 'string',
              description: 'Telefone do usuário.',
            },
            papelUsuarioID: {
              type: 'integer',
              description: 'ID do papel do usuário.',
            },
            dataCadastro: {
              type: 'string',
              format: 'date-time',
              description: 'Data de cadastro do usuário.',
              readOnly: true,
            },
          },
          example: {
            nomeCompleto: 'Jane Doe',
            email: 'jane.doe@example.com',
            senha: 'password123',
            telefone: '11987654321',
            papelUsuarioID: 1,
          },
        },
        Postagem: {
          type: 'object',
          required: [
            'titulo',
            'descricao',
            'visibilidade',
            'caminhoImagem',
            'autorID',
          ],
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-gerado da postagem.',
              readOnly: true,
            },
            titulo: {
              type: 'string',
              description: 'Título da postagem.',
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada da postagem.',
            },
            visibilidade: {
              type: 'boolean',
              description: 'Define se a postagem é pública ou privada.',
            },
            dataPublicacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de publicação da postagem.',
              readOnly: true,
            },
            caminhoImagem: {
              type: 'string',
              description: 'Caminho ou URL da imagem associada à postagem.',
            },
            autorID: {
              type: 'integer',
              description: 'ID do usuário autor da postagem.',
            },
            autor: {
              $ref: '#/components/schemas/Usuario',
            },
          },
          example: {
            titulo: 'Minha primeira postagem',
            descricao: 'Essa é uma postagem de teste no PubliFlow.',
            visibilidade: true,
            caminhoImagem: '/uploads/imagem1.png',
            autorID: 1,
          },
        },
        PapelUsuario: {
          type: 'object',
          required: ['papelUsuario'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-gerado do papel do usuário.',
              readOnly: true,
            },
            papelUsuario: {
              type: 'string',
              description: 'Nome do papel (ex.: admin, editor, leitor).',
            },
          },
          example: {
            id: 1,
            papelUsuario: 'admin',
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;