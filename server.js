const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');

const PORT = process.env.PORT || 3003;

const ToDoSchema = require('./schemas/ToDoSchema');

/*
// Retornar atributo de um objeto a partir de uma desestruturação
const pessoa = {
    nome: 'Vinicius',
    idade: 29
}
// Desestruturação - ao invés de pessoa.nome
const { nome } = pessoa;
*/

const server = express();

server.use(cors());

// Definição para conseguir receber dados json
server.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.3q9kv.mongodb.net/taskList?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Retorno de dados
// Página inicial
server.get('/', (req, res) => {
    return res.json({message: 'Seja bem vindo à API do TODO_LIST'});
});

// Retorno de dados
// esse '/' é a continuação do domínio, a 'rota'
server.get('/todo', async (req, res)=>{

    const todos = await ToDoSchema.find();

    return res.json(todos);
});

// Retorno de dados específicos
// esse '/' é a continuação do domínio, a 'rota'
server.get('/todo/:id', async (req, res)=>{

    const {id} = req.params;

    const todo = await ToDoSchema.findById(id);

    return res.json(todo);
});

// Atualização de dados
server.put('/todo/:id', async (req, res)=>{

    const {id} = req.params;

    console.log(id);

    const todo = await ToDoSchema.findOneAndUpdate({'_id': id}, req.body);

    return res.status(200).json(todo);
});

// Criação dos dados de uma tarefa no banco de dados de forma assíncrona
server.post('/todo', async (req, res)=>{
    const {title, date} = req.body;
    if (!title || !date) {
        return res.status(400).json({message: 'Validations Fails!'});
    };
    const todo = await ToDoSchema.create(req.body);
    return res.json(todo);
})


// Deleta dados
server.delete('/todo/:id', async (req, res)=>{
    const {id} = req.params;

    const todo = await ToDoSchema.deleteOne({'_id':id});

    res.status(200).json({message: 'Successfully deleted'});
})

// Inicia o servidor
server.listen(backend_nodejs_unidade4_deploy, ()=>console.log('Servidor iniciado na porta http://localhost:' + PORT));
// CTRL+C para parar a execução do servidor



