const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Turma extends Model {}

Turma.init(
    {
        id_Turma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          turno: {
              type: DataTypes.STRING(45),
              allowNull: false,
          },
          id_Curso: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references:{
                model: "Curso",
                key: "id_curso",
              },
          },
    },
      {
        sequelize,
        modelName: "Turma",
        tableName: "turma",
        timestamps: true,
      }
    );
    
      async function sincronizarTurma() {
        try {
          await Turma.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Turma.sync({ force: false }).then(() => {});
      module.exports = Turma;