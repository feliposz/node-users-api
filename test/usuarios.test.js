process.env.NODE_ENV = 'test';

const Usuario = require('../models/usuario.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Usuarios', function () {

    beforeEach((done) => {
        Usuario.deleteMany({}, () => {
            done();
        });
    });

    describe('/GET /usuarios', () => {
        it('deve devolver uma lista de usuarios vazia', (done) => {
            chai.request(app)
                .get('/usuarios')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('deve devolver uma lista com três usuários', (done) => {
            Usuario.create([{ nome: '1' }, { nome: '2' }, { nome: '3' }])
                .then(() => {
                    chai.request(app)
                        .get('/usuarios')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(3);
                            done();
        
                        });
                });
        });
    });

    describe('/POST /usuarios', () => {
        it('deve criar um usuário', (done) => {
            chai.request(app)
                .post('/usuarios')
                .send({ nome: "Jon Snow" })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nome').eql('Jon Snow');
                    done();
                });
        });
    });

    describe('/GET /usuarios/:id', () => {
        it('deve devolver um usuário específico', (done) => {
            Usuario.create({
                nome: 'Teste'
            }).then((usuario) => {
                chai.request(app)
                    .get('/usuarios/' + usuario._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('nome').eql('Teste');
                        res.body.should.have.property('_id').eql(usuario.id);
                        done();
                    });
            });
        });
    });

    describe('/PUT /usuarios/:id', () => {
        it('deve alterar um usuário', (done) => {
            Usuario.create({
                nome: 'Teste'
            }).then((usuario) => {
                chai.request(app)
                    .put('/usuarios/' + usuario._id)
                    .send({ nome: 'Outro nome' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('nome').eql('Outro nome');
                        res.body.should.have.property('_id').eql(usuario.id);
                        done();
                    });
            });
        });
    });

    describe('/DELETE /usuarios/:id', () => {
        it('deve excluir um usuário', (done) => {
            Usuario.create({
                nome: 'Teste'
            }).then((usuario) => {
                chai.request(app)
                    .delete('/usuarios/' + usuario._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

});
