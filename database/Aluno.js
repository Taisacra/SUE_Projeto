const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Aluno extends Model {}

Aluno.init(
    {
        id_aluno: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        Alunocol: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
        Usuario_idUsuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references:{
            model: "Usuario",
            key: "idUsuario",
          },
        },
    },
      {
        sequelize,
        modelName: "Aluno",
        tableName: "aluno",
        timestamps: true,
      }
    );
    
      async function sincronizarAluno() {
        try {
          await Aluno.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Aluno.sync({ force: false }).then(() => {});
      module.exports = Aluno;