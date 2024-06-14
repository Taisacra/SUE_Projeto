const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

const UsuarioCoordenador = require("./UsuarioCoordenador");

class CursoCoordenador extends Model {}

CursoCoordenador.init(
    {
        id_curso_coordenador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model: "Curso",
                key: "id_curso",
            },
          },
          nome: {
            type: DataTypes.STRING(45),
            allowNull: false,
          },
          id_Coordenador: {
            type: DataTypes.INTEGER,
            allowNull: false,
            refereces: {
              model:"UsuarioCoordenador",
              key:"id_Coordenador",
            },
          },
            nome_usuario: {
            type: DataTypes.STRING(45),
            allowNull: false,
            refereces: {
                model:"UsuarioCoordenador",
                key:"id_Coordenador",
            },
            },
    },
      {
        sequelize,
        modelName: "CursoCoordenador",
        tableName: "cursoCoordenador",
        timestamps: false,
      }
    );
    
      async function sincronizarCursoCoordenador() {
        try {
          await CursoCoordenador.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      CursoCoordenador.sync({ force: false }).then(() => {});
      module.exports = CursoCoordenador;