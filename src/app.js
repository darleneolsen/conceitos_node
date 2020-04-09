const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  
  const {title, url, techs } = request.body;
  //monta as variaveis  
  const repository ={
     id: uuid(), 
      title, 
      url, 
      techs, 
      likes: 0
     
  };
  
  //atribui ao array
  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs, likes} = request.body;
 
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if(repositoryIndex < 0){
    response.status(400).json({error: "Repository not found"});
  }
 

  const repositorylike = repositories.find(repository => repository.id === id);

  const repository = {
    id,
    title,
    url,    
    techs,
    likes :  repositorylike.likes

  };
  repositories[repositoryIndex] = repository;
 
  return response.json(repository);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if(repositoryIndex < 0){
    res.status(400).send();
  }

  repositories.splice(repositoryIndex,1);
  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id === id);
  if(!repository){
    response.status(400).json({error: "Repository not found"});
  }
  repository.likes++; 
  return response.json(repository);
});

module.exports = app;
