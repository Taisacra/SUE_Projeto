const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class DisciplinaCursoVW extends Model {}

DisciplinaCursoVW.init(
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Disciplina",
        key: "id_disciplina",
      },
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Curso",
        key: "id_curso",
      },
    },
  },
  {
    sequelize,
    modelName: "DisciplinaCursoVW",
    tableName: "disciplina_curso",
    timestamps: true,
  }
);

async function sincronizarDisciplinaCursoVW() {
  try {
    await DisciplinaCursoVW.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

DisciplinaCursoVW.sync({ force: false }).then(() => {});
module.exports = DisciplinaCursoVW;
