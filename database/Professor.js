const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Professor extends Model {}

Professor.init(
    {
        id_professor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        idUsuario: {
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
        modelName: "Professor",
        tableName: "professor",
        timestamps: true,
      }
    );
    
      async function sincronizarProfessor() {
        try {
          await Professor.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Professor.sync({ force: false }).then(() => {});
      module.exports = Professor;