import { ERROR_INTERNAL, ERROR_METHOD_NOT_FOUND, GET, POST } from "@/constants";
import Supplier from "@/models/Supplier";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === POST) {
    try {
      const { nama_suplier, alamat, email } = req.body;
      const supplier = await Supplier.create({
        nama_suplier,
        alamat,
        email,
      });
      res.status(201).json(supplier);
    } catch (error) {
      res.status(500).json({ success: false, error: ERROR_INTERNAL });
    }
  } else if (req.method === GET) {
    try {
      const suppliers = await Supplier.findAll();
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ error: ERROR_INTERNAL });
    }
  } else {
    res.status(404).send(ERROR_METHOD_NOT_FOUND);
  }
}
