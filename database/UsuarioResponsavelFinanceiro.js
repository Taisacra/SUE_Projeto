const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class UsuarioResponsavelFinanceiro extends Model {}

UsuarioResponsavelFinanceiro.init(
    {
        id_responsavel_financeiro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model: "Responsavel_financeiro",
                key: "id_responsavel_financeiro",
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
        modelName: "UsuarioResponsavelFinanceiro",
        tableName: "usuarioresponsavelfinanceiro",
        timestamps: false,
      }
    );
    
      async function sincronizarUsuarioResponsavelFinanceiro() {
        try {
          await UsuarioResponsavelFinanceiro.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      UsuarioResponsavelFinanceiro.sync({ force: false }).then(() => {});
      module.exports = UsuarioResponsavelFinanceiro;