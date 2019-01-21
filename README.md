API de usuários
===================

Esta *API de usuários* é um projeto simples de exemplo de API Rest usando o framework **Node.js**.

Dependências:
- Node.js
- NPM
- MongoDB

Bibliotecas externas usadas:
- Dotenv (configuração)
- Body Parser (tratamento do corpo das requisições)
- Express (tratamento das requisições HTTP)
- Mongoose (ORM para conexão com MongoDB)
- Morgan (log / desenvolvimento)
- Chai (biblioteca para os *assert*)
- Chai HTTP (testes HTTP)
- Mocha (testes automáticos)

----------

Estrutura de arquivos
-------------


```
.
│   .env
│   .gitignore
│   app.js
│   package-lock.json
│   package.json
│   README.md
│
├───controllers
│       index.js
│       grupos.controller.js
│       usuarios.controller.js
│
├───models
│       grupo.model.js
│       usuario.model.js
│
└───test
        grupos-usuarios.js
        grupos.test.js
        usuarios.test.js
```


Arquivo       | Descrição
--------      | ---
README.md     | Este documento
app.js        | Aplicação principal
.env          | Configurações para ambiente de desenvolvimento
.gitignore    | Arquivos ignorados do controle de versão
package*.json | Controle de dependências
/controllers  | Definição das rotas e lógica da API
/models       | Modelo de dados
/test         | Scripts de teste

-------------

Implantação
-------------

Na estrutura atual, não há necessidade de ferramenta de build para implantação bastando copiar os arquivos para o servidor desejado.

É necessário ter um servidor MongoDB configurado e disponível.

Definir a variável de ambiente para a aplicação:

``` 
set MONGODB='mongodb://localhost/gm-usuarios'
``` 

E para testes:

```
set MONGODB_TEST='mongodb://localhost/gm-usuarios-test'
``` 

Instalando dependências:

```
npm install
```

Execução
-------------

Em ambiente de testes:

```
npm start
```

Na configuração padrão, o serviço estará disponível em: http://localhost:3000

Em ambiente de produção:

```
set NODE_ENV=prod && npm start
```



Rotas disponíveis
-------------

### Listar todos os usuários

`GET /usuarios`

Exemplo de resposta:
```
[
    {
        "grupos": [],
        "_id": "5c4503983c52d1235c541d15",
        "nome": "Jon Snow",
        "__v": 0
    },
    {
        "grupos": [],
        "_id": "5c4504013c52d1235c541d16",
        "nome": "Tyrion Lannister",
        "__v": 0
    },
    {
        "grupos": [],
        "_id": "5c4504053c52d1235c541d17",
        "nome": "Eddard Stark",
        "__v": 0
    }
]
```

### Cadastrar novos usuários

`POST /usuarios`

Exemplo de requisição:
```
{
	"nome": "Jon Snow"
}
```

Exemplo de resposta:
```
{
    "grupos": [],
    "_id": "5c4503983c52d1235c541d15",
    "nome": "Jon Snow",
    "__v": 0
}
```

### Obter dados de um usuário

`GET /usuarios/:id`

`:id` é o identificador do usuário.

Exemplo de resposta:
```
{
    "grupos": [],
    "_id": "5c4504053c52d1235c541d17",
    "nome": "Eddard Stark",
    "__v": 0
}
```

### Obter grupos de um usuário

`GET /usuarios/:id/grupos`

`:id` é o identificador do usuário.

### Alterar usuário

`PUT /usuarios/:id`

`:id` é o identificador do usuário.

Exemplo de requisição:
```
{
	"nome": "Ned Stark"
}
```

Exemplo de resposta:
```
{
    "grupos": [],
    "_id": "5c4504053c52d1235c541d17",
    "nome": "Ned Stark",
    "__v": 0
}
```

### Excluir usuário

`DELETE /usuarios/:id`

`:id` é o identificador do usuário.

Exemplo de resposta:
``` 
ok
```


### Listar grupos

`GET /grupos`

Exemplo de resposta:
```
[
    {
        "usuarios": [
            "5c4503983c52d1235c541d15",
            "5c4504e43c52d1235c541d18"
        ],
        "_id": "5c45051b3c52d1235c541d19",
        "nome": "Nightwatch",
        "__v": 0
    },
    {
        "usuarios": [
            "5c4504013c52d1235c541d16",
            "5c45058c3c52d1235c541d1a",
            "5c45058f3c52d1235c541d1b",
            "5c4505a33c52d1235c541d1c"
        ],
        "_id": "5c4505e73c52d1235c541d1d",
        "nome": "Lannisters",
        "__v": 0
    }
]
```

### Criar grupo

`POST /grupos`

> **Nota:**
>
> É necessário informar no mínimo 2 usuários para criar um grupo.

Exemplo de requisição:
```
{
    "nome": "Nightwatch",
    "usuarios": ["5c4503983c52d1235c541d15", "5c4504e43c52d1235c541d18"]
}
```

Exemplo de resposta:
```
{
    "usuarios": [
        "5c4503983c52d1235c541d15",
        "5c4504e43c52d1235c541d18"
    ],
    "_id": "5c45051b3c52d1235c541d19",
    "nome": "Nightwatch",
    "__v": 0
}
```

### Obter um grupo específico

`PUT /grupos/:id`

`:id` é o identificador do grupo.

Exemplo de resposta:
```
{
    "usuarios": [
        "5c4504013c52d1235c541d16",
        "5c45058c3c52d1235c541d1a",
        "5c45058f3c52d1235c541d1b",
        "5c4505a33c52d1235c541d1c"
    ],
    "_id": "5c4505e73c52d1235c541d1d",
    "nome": "Lannisters",
    "__v": 0
}
```

### Alterar grupo

`PUT /grupos/:id`

`:id` é o identificador do grupo.

> **Nota:**
>
> É necessário informar no mínimo 1 usuários ao alterar um grupo.

Exemplo de requisição:
```
{
	"nome": "Lannister clan",
	"usuarios": ["5c4504013c52d1235c541d16", "5c45058c3c52d1235c541d1a"]
}
```

Exemplo de resposta:
```
{
    "usuarios": [
        "5c4504013c52d1235c541d16",
        "5c45058c3c52d1235c541d1a"
    ],
    "_id": "5c45068c3c52d1235c541d1e",
    "nome": "Lannister clan",
    "__v": 1
}
```

### Excluir grupo

`DELETE /grupos/:id`

`:id` é o identificador do grupo.

Exemplo de resposta:
``` 
ok
```

### Listar usuários de um grupo

`GET /grupos/:id/usuarios`

`:id` é o identificador do grupo.

Exemplo de resposta:
```
[
    {
        "grupos": [
            "5c4505e73c52d1235c541d1d"
        ],
        "_id": "5c4504013c52d1235c541d16",
        "nome": "Tyrion Lannister",
        "__v": 0
    },
    {
        "grupos": [
            "5c4505e73c52d1235c541d1d"
        ],
        "_id": "5c45058c3c52d1235c541d1a",
        "nome": "Tywin Lannister",
        "__v": 0
    },
    {
        "grupos": [
            "5c4505e73c52d1235c541d1d"
        ],
        "_id": "5c45058f3c52d1235c541d1b",
        "nome": "Cersei Lannister",
        "__v": 0
    }
]
```


### Adicionar um usuário a um grupo

`POST /grupos/:id/usuarios`

`:id` é o identificador do grupo.

Exemplo de requisição:
```
{
    "idUsuario": ""
}
```

Exemplo de resposta:
```
[
    "5c4504013c52d1235c541d16",
    "5c45058c3c52d1235c541d1a",
    "5c45058f3c52d1235c541d1b",
    "5c4505a33c52d1235c541d1c"
]
```

### Remover um usuário de um grupo

`POST /grupos/:id/usuarios/:idUsuario`

`:id` é o identificador do grupo.

`:idUsuario` é o identificador do usuário.

> **Nota:**
>
> Ao remover o último usuário de um grupo, o grupo será excluído.

Exemplo de resposta:
```
ok
```

### Listar grupos de um usuário

`GET /usuarios/:id/grupos`

`:id` é o identificador do grupo.

Exemplo de resposta:
```
[
    {
        "usuarios": [
            "5c4504013c52d1235c541d16",
            "5c45058c3c52d1235c541d1a",
            "5c45058f3c52d1235c541d1b",
            "5c4505a33c52d1235c541d1c"
        ],
        "_id": "5c4505e73c52d1235c541d1d",
        "nome": "Lannisters",
        "__v": 2
    },
    {
        "usuarios": [
            "5c4503983c52d1235c541d15",
            "5c4504e43c52d1235c541d18",
            "5c4504013c52d1235c541d16"
        ],
        "_id": "5c45051b3c52d1235c541d19",
        "nome": "Nightwatch",
        "__v": 1
    }
]
```

-------------

Melhorias futuras:
-------------

- Criar mais casos de teste (ex: tratamento de exceções, exercitar mais situações imprevistas, *edge cases*, etc.)
- Implementar lógica nos *models* (melhorar conversão para JSON, mover lógica de exclusão, inclusão em grupos, etc.)
- Implementar segurança (autenticação)
- Integrar com ferramenta de *Continous Integration*
