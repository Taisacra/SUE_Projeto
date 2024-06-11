const express = require('express');
const app = express();
const port = 3001;
const connection = require("./database/Database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const Usuario = require("./database/Usuario");
const Aluno = require("./database/Aluno");
const professor = require("./database/Professor");
const Professor = require('./database/Professor');
const Responsavel_financeiro = require("./database/Responsavel_financeiro");
const Coordenador = require("./database/Coordenador");
const Curso = require("./database/Curso");
const Disciplina = require("./database/Disciplina");
const DisciplinaCurso = require("./database/DisciplinaCurso");
const Turma = require("./database/Turma");
const TurmaAluno = require("./database/TurmaAluno");
const TurmaDisciplina = require("./database/TurmaDisciplina");
const UsuarioCoordenador = require("./database/UsuarioCoordenador");




/* const ProfessorDisciplina = require("./database/ProfessorDisciplina");

ProfessorDisciplina.sincronizarProfessorDisciplina; */








/* Aluno.sincronizarAluno;
Usuario.sincronizarUsuario; 
Professor.sincronizarProfessor;
Responsavel_financeiro.sincronizarResponsavel_financeiro;
Coordenador.sincronizarCoordenador;
Curso.sincronizarCurso;
Disciplina.sincronizarDisciplina;
DisciplinaCurso.sincronizarDisciplinaCurso;
Turma.sincronizarTurma;
TurmaAluno.sincronizarTurmaAluno;
TurmaDisciplina.sincronizarTurmaDisciplina;
UsuarioCoordenador.sincronizarUsuarioCoordenador;

*/




// ROTA PARA CRUD DE USUÁRIO
app.get("/usuario", (req, res) => {
    Usuario. findAll({
      raw: true,
      order: [
        ["idUsuario", "DESC"], // ASC = Crescente || DESC = Decrescente
      ],
    }).then((usuarios) => {
      res.render("cad_usuario", {
        usuarios: usuarios,
      });
    });
  });

  // Rota para inserir dados na tabela
  app.post("/editar_usuario", async (req, res) => {
    const { nome_usuario, cpf, telefone,data_nascimento, cep, rua, numero_casa, bairro, cidade, estado, complemento, action } =
      req.body;
    const id = req.params.id;
    console.log(
      "****Dados usuario: => ESTOU EM /editar_usuario",
      nome_usuario,
      cpf,
      telefone,
      data_nascimento,
      cep,
      rua,
      numero_casa,
      bairro,
      cidade,
      estado,
      complemento,
      action,
      id
    );
    // ESTA INCLUSÃO ESTÁ FUNCIONANDO
    if (action === "incluir") {
      try {
        //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
        const id = req.params.id;
        await Usuario.create({
          nome_usuario,
          cpf,
          telefone,
          data_nascimento,
          cep,
          rua,
          numero_casa,
          bairro,
          cidade,
          estado,
          complemento,
        });
        //res.status(201).json(usuario);
        res.status(201).redirect("/usuario");
      } catch (error) {
        console.error(
          "Erro ao inserir dados PARA A usuario: /editarusuario",
          error
        );
        res.status(500).json({
          error: "Erro ao inserir dados PARA A usuario: /editarusuario",
        });
      }
    }
    // A ALTERAÇÃO ESTÁ FUNCINANDO
    if (action === "alterar") {
      try {
        const {
          nome_usuario,
          cpf,
          telefone,
          data_nascimento,
          cep,
          rua,
          numero_casa,
          bairro,
          cidade,
          estado,
          complemento,
        } = req.body;
        const id =idUsuario;
        //const id = req.params.id;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
          return res.status(404).json({
            error: `Usuario NÃO FOI encontrada - NA TABELA DE Usuario - ID: ${id}.`,
          });
        }
        usuario. nome_usuario = nome_usuario;
        usuario.cpf = cpf;
        usuario.telefone = telefone;
        usuario.data_nascimento = data_nascimento;
        usuario.cep = cep;
        usuario.rua = rua;
        usuario.numero_casa = numero_casa;
        usuario.bairro = bairro;
        usuario.cidade = cidade;
        usuario.estado = estado;
        usuario.complemento = complemento;

        await usuario.save();
        res.status(201).redirect("/usuario");
      } catch (error) {
        console.error(
          `Erro ao ALTERAR dados PARA A usuario: /editarusuario ${nome_usuario}`,
          error
        );
        res.status(500).json({
          error: `Erro ao ALTERAR dados PARA A usuario. /editarusuario ${nome_usuario}`,
        });
      }
    }
  });

  app.post("/excluir_usuario/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario não encontrada." });
      }
      // PARA EXCLUIR A DISCIPLINA COM A CHAVE INFORMADA
      await Usuario.destroy({
        where: {
          idUsuario: id,
        },
      });
      res.redirect("/usuario");
      //res.json({ message: "Disciplina excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir dados:", error);
      res
        .status(500)
        .json({ error: "Erro ao excluir dados da tabela de usuario." });
    }
  }); 



  // ROTA PARA CRUD DE COORDENADOR
app.get("/coordenador", async (req, res) => {
    try {
      const usuarios = await UsuarioCoordenador.findAll();
      res.render("cad_coordenador", {
        usuarioCoordenador,
      });
    } catch (error) {
      console.error("Erro ao buscar associações de usuario a tabela de cordenador:", error);
      res.status(500).send("Erro ao buscar associações de usuario a tabela de cordenador");
    }
  });

  app.post("/editar_Coordenador", async (req, res) => {
    try {
      const { usuario, action } = req.body;
  
      if (action === "incluir") {
        await Coordenador.create({
          Usuario_idUsuario: usuario,
        });
        res.redirect("/coordenador");
      } else if (action === "alterar") {
        const id_Coordenador = req.body.idCoordenador;
        await Coordenador.update(
          { Usuario_idUsuario: usuario },
          { where: { idCoordenador: id_Coordenador } }
        );
        res.redirect("/coordenador");
      } else {
        res.status(400).send("Ação inválida.");
      }
    } catch (error) {
      console.error(
        "Erro ao inserir ou editar associação entre usuario e coordenador:",
        error
      );
      res
        .status(500)
        .send("Erro ao inserir ou editar associação entre usuario e coordenador.");
    }
  });
  
  app.post("/excluir_coordenador/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await Coordenador.destroy({ where: { idCoordenador: id } });
      res.redirect("/coordenador");
    } catch (error) {
      console.error(
        "Erro ao excluir associação entre usuario e coordenador:",
        error
      );
      res
        .status(500)
        .send("Erro ao excluir associação entre usuario e coordenador.");
    }
  });


  // ROTA PARA CRUD DE Responsavel Financeiro
app.get("/responsavel_financeiro", async (req, res) => {
  try {
    const responsavel_financeiros = await Responsavel_financeiro.findAll();
    const usuarios = await Usuario.findAll();
    res.render("cad_responsavel_finenceiro", {
      responsavel_financeiros,
      usuarios,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de usuario a tabela de responsavel_financeiro:", error);
    res.status(500).send("Erro ao buscar associações de usuario a tabela de responsavel_financeiro");
  }
});

app.post("/editar_ResponsavelFinanceiro", async (req, res) => {
  try {
    const { usuario, action } = req.body;

    if (action === "incluir") {
      await Responsavel_financeiro.create({
        Usuario_idUsuario: usuario,
      });
      res.redirect("/responsavel_financeiro");
    } else if (action === "alterar") {
      const id_Resp_financeiro = req.body.id_responsavel_financeiro;
      await Responsavel_financeiro.update(
        { idUsuario: usuario },
        { where: { id_responsavel_financeiro } }
      );
      res.redirect("/responsavel_financeiro");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre usuario e Responsavel Financeiro:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre usuario e Responsavel Financeiro.");
  }
});

app.post("/excluir_responsavel_financeiro/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Responsavel_financeiro.destroy({ where: { id_responsavel_financeiro: id } });
    res.redirect("/responsavel_financeiro");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre usuario e responsavel_financeiro:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre usuario e responsavel_financeiro.");
  }
});



// ROTA PARA CRUD DISCIPLINA
app.get("/disciplinas", (req, res) => {
  Disciplina.findAll({
    raw: true,
    order: [
      ["id_disciplina", "DESC"], // ASC = Crescente || DESC = Decrescente
    ],
  }).then((disciplinas) => {
    res.render("cad_disciplinas", {
      disciplinas: disciplinas,
    });
  });
});

// Rota para inserir dados na tabela
app.post("/editar_disciplina", async (req, res) => {
  const { nome_disciplina, carga_horaria, descricao_disciplina, action } =
    req.body;
  const id = req.params.id;
  console.log(
    "****Dados disciplina: => ESTOU EM /editar_disciplina",
    nome_disciplina,
    carga_horaria,
    descricao_disciplina,
    action,
    id
  );
  // ESTA INCLUSÃO ESTÁ FUNCIONANDO
  if (action === "incluir") {
    try {
      //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
      const id = req.params.id;
      await Disciplina.create({
        nome_disciplina,
        carga_horaria,
        descricao_disciplina,
      });
      //res.status(201).json(disciplina);
      res.status(201).redirect("/disciplinas");
    } catch (error) {
      console.error(
        "Erro ao inserir dados PARA A DISCIPLINA: /editardisciplina",
        error
      );
      res.status(500).json({
        error: "Erro ao inserir dados PARA A DISCIPLINA. /editardisciplina",
      });
    }
  }
  // A ALTERAÇÃO ESTÁ FUNCINANDO
  if (action === "alterar") {
    try {
      const {
        nome_disciplina,
        carga_horaria,
        descricao_disciplina,
        id_disciplina,
      } = req.body;
      const id = id_disciplina;
      //const id = req.params.id;
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({
          error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
        });
      }
      disciplina.nome_disciplina = nome_disciplina;
      disciplina.carga_horaria = carga_horaria;
      disciplina.descricao_disciplina = descricao_disciplina;
      await disciplina.save();
      res.status(201).redirect("/disciplinas");
    } catch (error) {
      console.error(
        `Erro ao ALTERAR dados PARA A DISCIPLINA: /editardisciplina ${nome_disciplina}`,
        error
      );
      res.status(500).json({
        error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editardisciplina ${nome_disciplina}`,
      });
    }
  }
});


// Rota para excluir dados da tabela
// ESTA FUNCIONA. iNCLUIR Mensagem de operação BEM SUCEDIDA.
app.post("/excluir_disciplina/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const disciplina = await Disciplina.findByPk(id);
    if (!disciplina) {
      return res.status(404).json({ error: "Disciplina não encontrada." });
    }
    // PARA EXCLUIR A DISCIPLINA COM A CHAVE INFORMADA
    await Disciplina.destroy({
      where: {
        id_disciplina: id,
      },
    });
    res.redirect("/disciplinas");
    //res.json({ message: "Disciplina excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir dados:", error);
    res
      .status(500)
      .json({ error: "Erro ao excluir dados da tabela de disciplina." });
  }
}); 


//ROTA PARA CRUD DE CURSO
app.get("/curso", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const coordenadores = await Coordenador.findAll();
    res.render("cad_curso", {
      cursos,
      coordenadores,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de coordenador a tabela de curso:", error);
    res.status(500).send("Erro ao buscar associações de coordenador a tabela de curso");
  }
});


// Rota para inserir ou editar um curso
app.post("/editar_curso", async (req, res) => {
  try {
    const {coordenador, action } = req.body;

    if (action === "incluir") {
      await Curso.create({ nome, coordenador });
    } else if (action === "alterar") {
      const id_curso = req.body.id_curso;
      await Curso.update({ nome, coordenador }, { where: { id_curso } });
    } else {
      res.status(400).send("Ação inválida.");
    }
    res.redirect("/curso");
  } catch (error) {
    console.error("Erro ao inserir ou editar curso:", error);
    res.status(500).send("Erro ao inserir ou editar curso.");
  }
});

// Rota para excluir um curso
app.post("/excluir_curso/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Curso.destroy({ where: { id_curso: id } });
    res.redirect("/curso");
  } catch (error) {
    console.error("Erro ao excluir curso:", error);
    res.status(500).send("Erro ao excluir curso.");
  }
});





//TESTANDO A CONEXÃO 
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) =>{
        console.log(msgErro);
    });

app.listen(port, ()=>{
    console.log(`A aplicação está rodando ${port}`);
})