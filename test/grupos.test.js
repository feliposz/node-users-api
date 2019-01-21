process.env.NODE_ENV = 'test';

const Grupo = require('../models/grupo.model');
const Usuario = require('../models/usuario.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Grupos', function () {

    let usuarios = [];

    before((done) => {
        Usuario.deleteMany({})
            .then(() => {
                Usuario.insertMany([ { nome: 'A' }, { nome: 'B' }, { nome: 'C' } ], (err, resultado) => {
                    usuarios = resultado;
                    done();
                });
            });
    });

    beforeEach((done) => {
        Grupo.deleteMany({}).then(() => {
            done();
        });
    });

    describe('/GET /grupos', () => {
        it('deve devolver uma lista de grupos vazia', (done) => {
            chai.request(app)
                .get('/grupos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('deve devolver uma lista com três grupos', (done) => {
            Grupo.create([{ nome: '1' }, { nome: '2' }, { nome: '3' }])
                .then(() => {
                    chai.request(app)
                        .get('/grupos')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(3);
                            done();
                        });
                });
        });
    });

    describe('/POST /grupos', () => {
        it('deve criar um grupo', (done) => {
            chai.request(app)
                .post('/grupos')
                .send({ nome: "Nightwatch", usuarios: usuarios.map(u => u._id) })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('nome').eql('Nightwatch');
                    res.body.should.have.property('usuarios').be.a('array');
                    res.body.usuarios.length.should.be.eql(usuarios.length);
                    done();
                });
        });
    });

    describe('/GET /grupos/:id', () => {
        it('deve devolver um grupo específico', (done) => {
            Grupo.create({
                nome: 'Teste'
            }).then((grupo) => {
                chai.request(app)
                    .get('/grupos/' + grupo._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('nome').eql('Teste');
                        res.body.should.have.property('_id').eql(grupo.id);
                        done();
                    });
            });
        });
    });

    describe('/PUT /grupos/:id', () => {
        it('deve alterar um grupo', (done) => {
            Grupo.create({
                nome: 'Teste'
            }).then((grupo) => {
                chai.request(app)
                    .put('/grupos/' + grupo._id)
                    .send({ nome: 'Outro nome', usuarios: usuarios.map(u => u._id) })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('nome').eql('Outro nome');
                        res.body.should.have.property('_id').eql(grupo.id);
                        res.body.should.have.property('usuarios').be.a('array');
                        res.body.usuarios.length.should.be.eql(usuarios.length);    
                        done();
                    });
            });
        });
    });

    describe('/DELETE /grupos/:id', () => {
        it('deve excluir um grupo', (done) => {
            Grupo.create({
                nome: 'Teste'
            }).then((grupo) => {
                chai.request(app)
                    .delete('/grupos/' + grupo._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });
});
