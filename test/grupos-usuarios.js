process.env.NODE_ENV = 'test';

const Grupo = require('../models/grupo.model');
const Usuario = require('../models/usuario.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Usuários de um grupo', function () {

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

    describe('/GET /grupos/:id/usuarios', () => {
        it('deve devolver uma lista com três usuários', (done) => {
            Grupo.create({ nome: "Nightwatch", usuarios: usuarios.map(u => u._id) })
                .then((grupo) => {
                    chai.request(app)
                        .get('/grupos/' + grupo._id + '/usuarios')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(3);
                            done();
                        });
                });
        });
    });

    describe('/POST /grupos/:id/usuarios', () => {
        it('deve associar um usuário ao grupo', (done) => {
            Grupo.create({ nome: "Nightwatch", usuarios: [usuarios[0]._id] })
                .then((grupo) => {
                    chai.request(app)
                        .post('/grupos/' + grupo._id + '/usuarios')
                        .send({ idUsuario: [usuarios[1]._id] })
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(2);
                            done();
                        });
                });
        });
    });

    describe('/DELETE /grupos/:id/usuarios/:id', () => {
        it('deve excluir um usuário de um grupo', (done) => {
            Grupo.create({ nome: "Nightwatch", usuarios: usuarios.map(u => u._id) })
                .then((grupo) => {
                    chai.request(app)
                        .delete('/grupos/' + grupo._id + '/usuarios/' + usuarios[0]._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });
});
