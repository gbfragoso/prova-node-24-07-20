import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

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
            const id = 5;
            chai.request(app)
                .get(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("POST /users", () => {
        it("Cadastrar novo usuário", (done) => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});