const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class ProfessorDisciplinaVW extends Model {}

ProfessorDisciplinaVW.init(
    {
        id_professor: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references:{
            model: "Professor",
            key: "idProfessor",
          },
        },
        id_disciplina: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references:{
            model: "Disciplina",
            key: "id_disciplina",
          },
        },
    },
      {
        sequelize,
        modelName: "ProfessorDisciplinaVW",
        tableName: "professordisciplinaVW",
        timestamps: true,
      }
    );
    
      async function sincronizarProfessorDisciplinaVW() {
        try {
          await ProfessorDisciplinaVW.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      ProfessorDisciplinaVW.sync({ force: false }).then(() => {});
      module.exports = ProfessorDisciplinaVW;