import { ERROR_INTERNAL, ERROR_METHOD_NOT_FOUND, GET, POST } from "@/constants";
import Product from "@/models/Product";
import Supplier from "@/models/Supplier";
import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

const PAGE_SIZE = 8;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === GET) {
    try {
      const { page = 1, limit = PAGE_SIZE, filterName } = req.query;
      const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

      const whereClause = filterName
        ? {
            nama: { [Op.like]: `%${filterName}%` },
          }
        : {};

      const products = await Product.findAll({
        limit: parseInt(limit as string),
        offset,
        where: whereClause,
        include: [Supplier],
      });

      const totalProducts = filterName
        ? await Product.count({ where: whereClause })
        : await Product.count();

      const totalPages = Math.ceil(totalProducts / parseInt(limit as string));

      res.status(200).json({
        data: products,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: parseInt(page as string),
          pageSize: parseInt(limit as string),
        },
      });
    } catch (error) {
      res.status(500).json({ error: ERROR_INTERNAL });
    }
  } else if (req.method === POST) {
    try {
      const { nama, deskripsi, harga, stok, suplier_id } = req.body;
      const product = await Product.create({
        nama,
        deskripsi,
        harga,
        stok,
        foto: "",
        suplier_id,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: ERROR_INTERNAL });
    }
  } else {
    res.status(404).send(ERROR_METHOD_NOT_FOUND);
  }
}
