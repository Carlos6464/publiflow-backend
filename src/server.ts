import app from './index';

const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(
    `Documentação da API disponível em http://localhost:${PORT}/api-docs`
  );
});
