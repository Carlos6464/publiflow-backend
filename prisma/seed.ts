import { PrismaClient } from '@prisma/client';

//-- Inicializa o Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o seeding...`);

  //-- Cria os papéis de usuário se eles não existirem
  const papelAluno = await prisma.pF_papelUsuario.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      papelUsuario: 'Aluno',
    },
  });

  const papelProfessor = await prisma.pF_papelUsuario.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      papelUsuario: 'Professor',
    },
  });

  console.log({ papelAluno, papelProfessor });
  console.log(`Seeding finalizado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    //-- Fecha a conexão com o banco
    await prisma.$disconnect();
  });

