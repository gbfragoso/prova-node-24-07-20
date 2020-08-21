import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();
var lastUserId : number;

describe("Testando o UsersController", () => {
    describe("GET /users", () => {
        it("Listar todos os usuários da base", (done) => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("Listar apenas um usuário", (done) => {
            const id = 1;
            chai.request(app)
                .get(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Disparar erro de usuário não encontrado", (done) => {
            const id = 100;
            chai.request(app)
                .get(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("POST /users", () => {
        it("Cadastrar novo usuário", (done) => {
            chai.request(app)
                .post('/users')
                .send({
                    "name": "test",
                    "username": "test",
                    "email": "teste@gmail.com"
                })
                .end((err, res) => {
                    const {userId} = res.body;
                    lastUserId = userId;
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Dados de cadastro inválidos retornam erro", (done) => {
            chai.request(app)
                .post('/users')
                .send({
                    "name": "test",
                    "username": "test"
                })
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });
    });

    describe("PUT /users", () => {
        it("Atualizando um usuário", (done) => {
            const id = lastUserId;
            chai.request(app)
                .put(`/users/${id}`)
                .send({
                    "name": "test",
                    "username": "test",
                    "email": "teste@gmail.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Atualizando um usuário inexistente", (done) => {
            const id = lastUserId + 1;
            chai.request(app)
                .put(`/users/${id}`)
                .send({
                    "name": "test",
                    "username": "test",
                    "email": "teste@gmail.com"
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe("DELETE /users", () => {
        it("Deletando um usuário", (done) => {
            const id = lastUserId;
            chai.request(app)
                .delete(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Deletando um usuário inexistente", (done) => {
            const id = lastUserId + 1;
            chai.request(app)
                .delete(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});