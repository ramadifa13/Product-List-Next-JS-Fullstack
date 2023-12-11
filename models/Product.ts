import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import Supplier from "./Supplier";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    suplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supplier,
        key: "id_suplier",
      },
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "produk",
  },
);

Product.belongsTo(Supplier, { foreignKey: "suplier_id" });
Supplier.hasMany(Product, { foreignKey: "suplier_id" });

export default Product;
