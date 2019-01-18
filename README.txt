/
    package.json
    /src
        app.js
        /controllers
            index.controller.js
            usuarios.controller.js
            grupos.controller.js
            

Listar todos os usuários
GET /usuarios

Cadastrar novos usuários
POST /usuarios

Alterar usuário
PUT /usuarios/:id

Excluir usuário
DELETE /usuarios/:id

Não pode haver um grupo sem pelo menos um usuário;
Ao excluir o último usuário de um grupo o grupo deve ser excluído junto;

Listar grupos
GET /grupos

Criar grupo
POST /grupos

Só é possível criar um grupo com dois ou mais usuários;

Adicionar um usuário à um grupo
POST /grupos/:id/usuarios

Listar usuários de um grupo
GET /grupos/:id/usuarios

Listar grupos de um usuário
GET /usuarios/:id/grupos

Excluir grupo
DELETE /grupos/:id

Alterar grupo
PUT /grupos/:id
