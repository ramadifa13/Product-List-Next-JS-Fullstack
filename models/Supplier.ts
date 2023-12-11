import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class Supplier extends Model {}

Supplier.init(
  {
    id_suplier: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_suplier: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Supplier",
    tableName: "suplier",
  },
);

export default Supplier;
