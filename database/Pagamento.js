const { DataTypes, Model } = require("Sequelize");
const sequelize = require("./Database"); // Arquivo de configuração da conexão com o banco de dados

class Pagamento extends Model {}

Pagamento.init(
    {
        id_pagamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          id_responsavel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Responsavel_financeiro",
                key: "id_responsavel_financeiro",
            }
          },
          data_Vencimento: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          valor_Previsto: {
            type: DataTypes.DOUBLE,
            allowNull: false,
          },
          id_Curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Curso",
                key: "id_curso",
            }
        },
    },
      {
        sequelize,
        modelName: "Pagamento",
        tableName: "pagamento",
        timestamps: true,
      }
    );
    
      async function sincronizarPagamento() {
        try {
          await Pagamento.sync({ force: false });
        } catch (error) {
          console.error("Erro ao sincronizar a tabela: ", error);
        } finally {
          await connection.close();
          console.log("Conexão fechada.");
        }
      }
      
      Pagamento.sync({ force: false }).then(() => {});
      module.exports = Pagamento;