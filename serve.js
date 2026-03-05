import Fastify from "fastify";
import { Pool } from "pg";

const servidor = Fastify();
const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'receitas'
});


servidor.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuarios');
    return resultado.rows
});

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body;
    const resultado = await sql.query('insert into usuarios (nome, senha) values ($1, $2)', [body.nome, body.senha]);
    return 'Usuário Cadastrado!'
});

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body;
    const id = request.params.id;
    const resultado = await sql.query('update usuarios set nome = $1, senha = $2 where id = $3', [body.nome, body.senha, id]);
    return 'Usuário Alterado!'
});

servidor.delete('/usuarios/:id', async (request, reply) => {
    const id = request.params.id;
    const resultado = await sql.query('delete from usuarios where id = $1', [id]);
    reply.status(200).send({message: 'Usuário Deletado!'})
});

servidor.listen({
    port: 3000
});