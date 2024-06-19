require("dotenv").config({ path: "./.env" }); //instalr o dotenv: npm install dotenv --save 

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("PORT:", process.env.PORT);


const express = require('express');
const app = express();
//const port = 3002;
const connection = require("./database/Database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
const port = process.env.PORT || 3003;

const Usuario = require("./database/Usuario");
const Aluno = require("./database/Aluno");
const professor = require("./database/Professor");
const Professor = require('./database/Professor');
const Responsavel_financeiro = require("./database/Responsavel_financeiro");
const Coordenador = require("./database/Coordenador");
const Curso = require("./database/Curso");
const Disciplina = require("./database/Disciplina");
//const DisciplinaCurso = require("./database/DisciplinaCurso");
const Turma = require("./database/Turma");
const UsuarioCoordenador = require("./database/UsuarioCoordenador");
//const UsuarioResponsavelFinanceiro = require("./database/UsuarioResponsavelFinanceiro");
//const UsuarioAluno = require("./database/UsuarioAluno");
//const UsuarioProfessor = require("./database/UsuarioProfessor");
const CoordenadorCurso = require("./database/CoordenadorCurso");
const TurmaCurso = require("./database/TurmaCurso");
//const TurmaDisciplina = require("./database/TurmaDisciplina");
const TurmaAluno = require("./database/TurmaAluno");



/* const ProfessorDisciplina = require("./database/ProfessorDisciplina");
 /* const ProfessorDisciplina = require("./database/ProfessorDisciplina");

ProfessorDisciplina.sincronizarProfessorDisciplina; 
 */

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
UsuarioResponsavelFinanceiro.sincronizarUsuarioResponsavelFinanceiro;
UsuarioAluno.sincronizarUsuarioAluno;
UsuarioProfessor.sincronizarUsuarioProfessor;
TurmaCurso.sincronizarTurmaCurso;
CoordenadorCurso.sincronizarCoordenadorCurso;
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
    const usuarios = await Usuario.findAll();
    const coordenadores = await Coordenador.findAll();
    const usuariocoordenadores = await UsuarioCoordenador.findAll();
    res.render("cad_coordenador", {
      coordenadores,
      usuariocoordenadores : usuariocoordenadores,
      usuarios,
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
        idUsuario: usuario,
      });
      res.redirect("/coordenador");

    } else if (action === "alterar") {
      const id_Coordenador = req.body.id_Coordenador;
      await Coordenador.update(
        { idUsuario: usuario },
        { where: { id_Coordenador }}
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
      await Coordenador.destroy({ where: { id_Coordenador: id } });
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
      const usuarios = await Usuario.findAll();
      const responsavel_financeiros = await Responsavel_financeiro.findAll();
      const usuarioresponsavelfinanceiros = await UsuarioResponsavelFinanceiro.findAll();
      res.render("cad_responsavel_finenceiro", {
        responsavel_financeiros,
        usuarioresponsavelfinanceiros : usuarioresponsavelfinanceiros,
        usuarios,
      });
    } catch (error) {
      console.error("Erro ao buscar associações de usuario a tabela de cordenador:", error);
      res.status(500).send("Erro ao buscar associações de usuario a tabela de cordenador");
    }
  });

  app.post("/editar_ResponsavelFinanceiro", async (req, res) => {
    try {
      const { usuario, action } = req.body;
  
      if (action === "incluir") {
        await Responsavel_financeiro.create({
          idUsuario: usuario,
        });
        res.redirect("/responsavel_financeiro");
  
      } else if (action === "alterar") {
        const id_responsavel_financeiro = req.body.id_responsavel_financeiro;
        await Responsavel_financeiro.update(
          { idUsuario: usuario },
          { where: { id_responsavel_financeiro }}
        );
        res.redirect("/responsavel_financeiro");
      } else {
        res.status(400).send("Ação inválida.");
      }
    } catch (error) {
      console.error(
        "Erro ao inserir ou editar associação entre usuario e Responsavel financeiro:",
        error
      );
      res
        .status(500)
        .send("Erro ao inserir ou editar associação entre usuario e Responsavel financeiro.");
    }
  });
    
    app.post("/excluir_responsavelFinanceiro/:id", async (req, res) => {
      try {
        const id = req.params.id;
        await Responsavel_financeiro.destroy({ where: { id_responsavel_financeiro: id } });
        res.redirect("/responsavel_financeiro");
      } catch (error) {
        console.error(
          "Erro ao excluir associação entre usuario e Responsavel financeiro:",
          error
        );
        res
          .status(500)
          .send("Erro ao excluir associação entre usuario e Responsavel financeiro.");
      }
    });
  

 // ROTA PARA CRUD DE ALUNO
 app.get("/aluno", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    const usuarioalunos = await UsuarioAluno.findAll();
    const alunos = await Aluno.findAll();
    res.render("cad_aluno", {
      alunos,
      usuarioalunos : usuarioalunos,
      usuarios,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de usuario a tabela de aluno:", error);
    res.status(500).send("Erro ao buscar associações de usuario a tabela de aluno");
  }
});

app.post("/editar_Aluno", async (req, res) => {
  try {
    const { usuario, email, action, id_aluno } = req.body;

    console.log("Request body:", req.body); // Log para verificar os dados recebidos

    if (action === "incluir") {
      await Aluno.create({
        idUsuario: usuario,
        email: email,
      });
      console.log("Inclusão realizada com sucesso."); // Log de sucesso
      res.redirect("/aluno");
    } else if (action === "alterar") {
      await Aluno.update(
        { idUsuario: usuario, email: email },
        { where: { id_aluno } }
      );
      console.log("Alteração realizada com sucesso."); // Log de sucesso
      res.redirect("/aluno");
    } else {
      console.error("Ação inválida."); // Log de erro
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error("Erro ao inserir ou editar associação entre usuario e aluno:", error); // Log de erro detalhado
    res.status(500).send("Erro ao inserir ou editar associação entre usuario e aluno.");
  }
});

app.post("/excluir_aluno/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Aluno.destroy({ where: { id_aluno: id } });
    res.redirect("/aluno");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre usuario e aluno:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre usuario e aluno.");
  }
});

// ROTA PARA CRUD DE PROFESSOR
app.get("/professor", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    const usuarioprofessores = await UsuarioProfessor.findAll();
    const professores = await Professor.findAll();
    res.render("cad_professor", {
      professores,
      usuarioprofessores : usuarioprofessores,
      usuarios,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de usuario a tabela de aluno:", error);
    res.status(500).send("Erro ao buscar associações de usuario a tabela de aluno");
  }
});

app.post("/editar_Professor", async (req, res) => {
  try {
    const { usuario, titulo, action, id_professor } = req.body;

    console.log("Request body:", req.body); // Log para verificar os dados recebidos

    if (action === "incluir") {
      await Professor.create({
        idUsuario: usuario,
        titulo: titulo,
      });
      console.log("Inclusão realizada com sucesso."); // Log de sucesso
      res.redirect("/professor");
    } else if (action === "alterar") {
      await Professor.update(
        { idUsuario: usuario, titulo: titulo },
        { where: { id_professor } }
      );
      console.log("Alteração realizada com sucesso."); // Log de sucesso
      res.redirect("/professor");
    } else {
      console.error("Ação inválida."); // Log de erro
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error("Erro ao inserir ou editar associação entre usuario e professor:", error); // Log de erro detalhado
    res.status(500).send("Erro ao inserir ou editar associação entre usuario e professor.");
  }
});

app.post("/excluir_professor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Professor.destroy({ where: { id_professor: id } });
    res.redirect("/professor");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre usuario e professor:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre usuario e professor.");
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
    const usuariocoordenadores = await UsuarioCoordenador.findAll();
    const coordenadorcursos = await CoordenadorCurso.findAll();
    res.render("cad_curso", {
      cursos,
      usuariocoordenadores: usuariocoordenadores,
      coordenadorcursos: coordenadorcursos,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de coordenador a tabela de curso:", error);
    res.status(500).send("Erro ao buscar associações de coordenador a tabela de curso");
  }
});

// Rota para inserir ou editar um curso
app.post("/editar_curso", async (req, res) => {
  try {
    const { coordenador, nome, action, id_curso } = req.body;

    if (action === "incluir") {
      await Curso.create({
        id_Coordenador: coordenador,
        nome: nome,
      });
    } else if (action === "alterar") {
      await Curso.update(
        { id_Coordenador: coordenador, nome: nome },
        { where: { id_curso: id_curso } }
      );
    } else {
      return res.status(400).send("Ação inválida.");
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



/* // ROTA PARA CRUD DISCIPLINA_CURSO
// Rota para inserir ou editar uma associação entre disciplina e curso
app.get("/disciplina_curso", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();

    const disciplina_cursos = await DisciplinaCurso.findAll();
    res.render("cad_disciplina_curso", {
      disciplina_cursos,
      cursos,
      disciplinas,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de disciplinas e cursos:", error);
    res.status(500).send("Erro ao buscar associações de disciplinas e cursos.");
  }
});

app.post("/editar_disciplinaCurso", async (req, res) => {
  try {
    const { curso, disciplina, action } = req.body;

    if (action === "incluir") {
      await DisciplinaCurso.create({
        id_curso: curso,
        id_disciplina: disciplina,
      });
      res.redirect("/disciplina_curso");
    } else if (action === "alterar") {
      const id_disciplina_curso = req.body.id_disciplina_curso;
      await DisciplinaCurso.update(
        { id_curso: curso, id_disciplina: disciplina },
        { where: { id_disciplina_curso } }
      );
      res.redirect("/disciplina_curso");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre disciplina e curso.");
  }
});

// Rota para excluir uma associação entre disciplina e curso
app.post("/excluir_disciplina_curso/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await DisciplinaCurso.destroy({ where: { id_disciplina_curso: id } });
    res.redirect("/disciplina_curso");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre disciplina e curso.");
  }
}); */

//ROTA PARA CRUD DE TURMA
app.get("/turma", async (req, res) => {
  try {
    const turmacursos = await TurmaCurso.findAll();
    const cursos = await Curso.findAll();
    res.render("cad_turma", {
      turmacursos: turmacursos,
      cursos: cursos,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de Turma e curso:", error);
    res.status(500).send("Erro ao buscar associações de Turma e curso");
  }
});

app.post("/editar_turma", async (req, res) => {
  try {
    const { curso, turno, action, id_Turma } = req.body;

    if (action === "incluir") {
      await Turma.create({
        id_Curso: curso,
        turno: turno,
      });
    } else if (action === "alterar") {
      await Curso.update(
        { id_Curso: curso, turno: turno },
        { where: { id_Turma: id_Turma } }
      );
    } else {
      return res.status(400).send("Ação inválida.");
    }

    res.redirect("/turma");
  } catch (error) {
    console.error("Erro ao inserir ou editar turma:", error);
    res.status(500).send("Erro ao inserir ou editar turma.");
  }
});

// Rota para excluir um turma
app.post("/excluir_turma/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Turma .destroy({ where: { id_turma: id } });
    res.redirect("/turma");
  } catch (error) {
    console.error("Erro ao excluir turma:", error);
    res.status(500).send("Erro ao excluir turma.");
  }
});

// ROTA PARA CRUD TURMA_DISCIPLINA
/* app.get("/turma_disciplina", async (req, res) => {
  try {
    const turmas = await Turma.findAll();
    const disciplinas = await Disciplina.findAll();
    const turma_disciplinas = await TurmaDisciplina.findAll();
    res.render("cad_turma_disciplina", {
      turma_disciplinas,
      turmas,
      disciplinas,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de turmas e disciplinas :", error);
    res.status(500).send("Erro ao buscar associações de turmas e disciplinas.");
  }
});

app.post("/editar_turma_disciplina", async (req, res) => {
  try {
    const { turma,disciplina, nome_disciplina, action } = req.body;

    if (action === "incluir") {
      await TurmaDisciplina.create({
        id_Turma: turma,
        id_disciplina: disciplina,
        nome_disciplina: nome_disciplina,
      });
      res.redirect("/turma_disciplina");
    } else if (action === "alterar") {
      const id_TurmaDisciplina = req.body.id_TurmaDisciplina;
      await TurmaDisciplina.update(
        { id_Turma: turma, id_disciplina: disciplina, nome_disciplina: nome_disciplina },
        { where: { id_TurmaDisciplina } }
      );
      res.redirect("/disciplina_curso");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre turma e disciplina:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre turma e disciplina.");
  }
});

// Rota para excluir uma associação entre disciplina e curso
app.post("/excluir_turma_disciplina/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await TurmaDisciplina.destroy({ where: { id_TurmaDisciplina: id } });
    res.redirect("/turma_disciplina");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre turma e disciplina:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre turma e disciplina.");
  }
});
 */



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
