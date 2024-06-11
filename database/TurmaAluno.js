const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class TurmaAluno extends Model {}

TurmaAluno.init(
    {
        id_TurmaAluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          id_Turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refereces: {
              model:"Turma",
              key:"id_Turma",
            },
          },
          id_Aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refereces: {
              model:"Aluno",
              key:"id_aluno",
            },
          },
    },
      {
        sequelize,
        modelName: "TurmaAluno",
        tableName: "turmaAluno",
        timestamps: true,
      }
    );
    
      async function sincronizarTurmaAluno() {
        try {
          await TurmaAluno.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      TurmaAluno.sync({ force: false }).then(() => {});
      module.exports = TurmaAluno;