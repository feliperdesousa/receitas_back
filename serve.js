import Fastify from "fastify";
import { Pool } from "pg";
import cors from '@fastify/cors'

const servidor = Fastify();

servidor.register(cors, {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'receitas'
});



servidor.post('/login', async (request, reply) => {
    const body = request.body;
    if (!body || !body.email || !body.senha) {
        reply.status(400).send({erro: "Email e senha obrigatórios!"})
    };
    const resultado = await sql.query('select * from usuarios where email = $1 and senha = $2', [body.email, body.senha]);
    if (resultado.rows.length === 0) {
        reply.status(401).send({message: 'Usuário ou senha inválidos!', login: false})
    } else if (resultado.rows.length === 1) {
        reply.status(200).send({message: 'Usuário logado', login: true})
    }
});



servidor.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuarios');
    return resultado.rows
});

servidor.post('/usuarios', async (request, reply) => {
    const body = request.body;
    if (!body || !body.nome || !body.senha || !body.email) {
        return reply.status(400).send({message:'Nome, Email e Senha são obrigatórios.'})
    };
    const resultado = await sql.query('insert into usuarios (nome, email, senha) values ($1, $2, $3)', [body.nome, body.email, body.senha]);
    reply.status(201).send({message: 'Usuário criado!'})
});

servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body;
    const id = request.params.id;
    if (!body || !body.nome || !body.senha || !body.email || !id) {
        return reply.status(400).send({message:'Nome, Email, Senha e Id são obrigatórios.'})
    };
    const resultado = await sql.query('update usuarios set nome = $1, email = $2, senha = $3 where id = $4', [body.nome, body.email, body.senha, id]);
    reply.status(201).send({message: 'Usuário alterado!'})
});

servidor.delete('/usuarios/:id', async (request, reply) => {
    const id = request.params.id;
    if (!id) {
        return reply.status(400).send({message:'Id é obrigatório.'})
    };
    const resultado = await sql.query('delete from usuarios where id = $1', [id]);
    console.log(resultado);
    reply.status(200).send({message: 'Usuário Deletado!'})
});

servidor.listen({
    port: 3000
});