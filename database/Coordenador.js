const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Coordenador extends Model {}

Coordenador.init(
    {
        idCoordenador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: "Coordenador",
        tableName: "coordenador",
        timestamps: true,
      }
    );
    
      async function sincronizarCoordenador() {
        try {
          await Coordenador.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Coordenador.sync({ force: false }).then(() => {});
      module.exports = Coordenador;