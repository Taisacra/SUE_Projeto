const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Disciplina extends Model {}

Disciplina.init(
    {
        id_disciplina: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          nome_disciplina: {
            type: DataTypes.STRING(50),
            allowNull: false,
          },
          carga_horaria: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          descricao_disciplina: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
    },
      {
        sequelize,
        modelName: "Disciplina",
        tableName: "disciplina",
        timestamps: true,
      }
    );
    
      async function sincronizarDisciplina() {
        try {
          await Disciplina.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Disciplina.sync({ force: false }).then(() => {});
      module.exports = Disciplina;