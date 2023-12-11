import {
  ERROR_INTERNAL,
  ERROR_METHOD_NOT_FOUND,
  ERROR_PRODUK_NOT_FOUND,
  DELETE,
  GET,
  PUT,
} from "@/constants";
import Product from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === GET) {
    try {
      if (id === undefined || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid id parameter" });
      }
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: ERROR_PRODUK_NOT_FOUND });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: ERROR_INTERNAL });
    }
  } else if (req.method === PUT) {
    try {
      const { nama, deskripsi, harga, stok, suplier_id } = req.body;
      const updatedProduct = await Product.update(
        { nama, deskripsi, harga, stok, suplier_id },
        { where: { id } },
      );

      if (updatedProduct[0] === 0) {
        return res.status(404).json({ error: ERROR_PRODUK_NOT_FOUND });
      }

      res.status(200).json(updatedProduct[0]);
    } catch (error) {
      res.status(500).json({ error: ERROR_INTERNAL });
    }
  } else if (req.method === DELETE) {
    try {
      const deletedProduct = await Product.destroy({
        where: { id },
      });

      if (deletedProduct === 0) {
        return res.status(404).json({ error: ERROR_PRODUK_NOT_FOUND });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: ERROR_INTERNAL });
    }
  } else {
    res.status(404).send(ERROR_METHOD_NOT_FOUND);
  }
}
