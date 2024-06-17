const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class TurmaDisciplina extends Model {}

TurmaDisciplina.init(
    {
        id_TurmaDisciplina: {
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
          id_disciplina: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refereces: {
              model:"Disciplina",
              key:"id_disciplina",
            },
          },
    },
      {
        sequelize,
        modelName: "TurmaDisciplina",
        tableName: "turmaDisciplina",
        timestamps: true,
      }
    );
    
      async function sincronizarTurmaDisciplina() {
        try {
          await TurmaDisciplina.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      TurmaDisciplina.sync({ force: false }).then(() => {});
      module.exports = TurmaDisciplina;