import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "test.db",
  define: {
    timestamps: false,
  },
});

export default sequelize;
