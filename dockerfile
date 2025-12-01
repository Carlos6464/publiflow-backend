# Usa a imagem oficial do Node
FROM node:20-alpine

# Cria um diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
RUN npm install
COPY . .

# Prisma client
RUN npx prisma generate


# Expõe a porta
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
