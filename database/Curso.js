const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Curso extends Model {}

Curso.init(
    {
      id_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        ype: DataTypes.STRING(45),
        allowNull: false,
      },
      id_Coordenador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refereces: {
          model:"Coordenador",
          key:"id_Coordenador",
        },
      },
    },
      {
        sequelize,
        modelName: "Curso",
        tableName: "curso",
        timestamps: true,
      }
    );
    
      async function sincronizarCurso() {
        try {
          await Curso.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Curso.sync({ force: false }).then(() => {});
      module.exports = Curso;