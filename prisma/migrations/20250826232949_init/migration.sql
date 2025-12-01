-- CreateTable
CREATE TABLE "public"."PF_usuario" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "papelUsuarioID" INTEGER NOT NULL,

    CONSTRAINT "PF_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PF_papelUsuario" (
    "id" SERIAL NOT NULL,
    "papelUsuario" TEXT NOT NULL,

    CONSTRAINT "PF_papelUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PF_postagem" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "visibilidade" BOOLEAN NOT NULL,
    "dataPublicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caminhoImagem" TEXT NOT NULL,
    "autorID" INTEGER NOT NULL,

    CONSTRAINT "PF_postagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PF_usuario_email_key" ON "public"."PF_usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."PF_usuario" ADD CONSTRAINT "PF_usuario_papelUsuarioID_fkey" FOREIGN KEY ("papelUsuarioID") REFERENCES "public"."PF_papelUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PF_postagem" ADD CONSTRAINT "PF_postagem_autorID_fkey" FOREIGN KEY ("autorID") REFERENCES "public"."PF_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
