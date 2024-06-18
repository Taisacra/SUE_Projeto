const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

//const Usuario =require("./Usuario");

class Responsavel_financeiro extends Model {}

Responsavel_financeiro.init(
    {
        id_responsavel_financeiro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: "Responsavel_financeiro",
        tableName: "responsavel_financeiro",
        timestamps: true,
      }
    );
    
      async function sincronizarResponsavel_financeiro() {
        try {
          await Responsavel_financeiro.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Responsavel_financeiro.sync({ force: false }).then(() => {});
      module.exports = Responsavel_financeiro;