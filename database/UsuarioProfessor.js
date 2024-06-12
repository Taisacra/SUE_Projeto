const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class UsuarioProfessor extends Model {}

UsuarioProfessor.init(
    {
        id_Professor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model: "Professor",
                key: "idProfessor",
              },
          },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          references:{
            model: "Usuario",
            key: "idUsuario",
          },
        },
        nome_usuario: {
            type: DataTypes.STRING(45),
             allowNull: false,

        },
    },
      {
        sequelize,
        modelName: "UsuarioProfessor",
        tableName: "usuarioprofessor",
        timestamps: false,
      }
    );
    
      async function sincronizarUsuarioProfessor() {
        try {
          await UsuarioProfessor.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      UsuarioProfessor.sync({ force: false }).then(() => {});
      module.exports = UsuarioProfessor;