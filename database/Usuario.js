const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Usuario extends Model {}

Usuario.init(
  {
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_usuario: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    cpf: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.INTEGER(13),
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cep: {
        type: DataTypes.INTEGER(8),
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    numero_casa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuario",
    timestamps: true,
  }
);

  async function sincronizarUsuario() {
    try {
      await Usuario.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }
  
  Usuario.sync({ force: false }).then(() => {});
  module.exports = Usuario;