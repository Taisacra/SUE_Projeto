const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

/* const Disciplina = require("./Disciplina");
const Curso = require("./Curso"); */

class DisciplinaCurso extends Model {}

DisciplinaCurso.init(
  {
    id_disciplina_curso:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Disciplina",
        key: "id_disciplina",
      },
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Curso",
        key: "id_curso",
      },
    },
  },
  {
    sequelize,
    modelName: "DisciplinaCurso",
    tableName: "disciplinaCurso",
    timestamps: true,
  }
);

async function sincronizarDisciplinaCurso() {
  try {
    await DisciplinaCurso.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

DisciplinaCurso.sync({ force: false }).then(() => {});
module.exports = DisciplinaCurso;
