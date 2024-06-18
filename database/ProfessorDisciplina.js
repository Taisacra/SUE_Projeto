const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

/* const Disciplina = require("./Disciplina");
const Professor = require("./Professor"); */

class ProfessorDisciplina extends Model {}

ProfessorDisciplina.init(
    {
        
        id_professorDisciplina: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        id_professor: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: false,
          references:{
            model: "Professor",
            key: "idProfessor",
          },
        },
        id_disciplina: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: false,
          references:{
            model: "Disciplina",
            key: "id_disciplina",
          },
        },
    },
      {
        sequelize,
        modelName: "ProfessorDisciplina",
        tableName: "professordisciplina",
        timestamps: true,
      }
    );
    
      async function sincronizarProfessorDisciplina() {
        try {
          await ProfessorDisciplina.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      ProfessorDisciplina.sync({ force: false }).then(() => {});
      module.exports = ProfessorDisciplina;