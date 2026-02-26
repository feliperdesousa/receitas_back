import Fastify from "fastify";
const servidor = Fastify();


servidor.get('/usuarios', () => {
    return 'ta tudo certo'
})

servidor.listen({
    port: 3000
});