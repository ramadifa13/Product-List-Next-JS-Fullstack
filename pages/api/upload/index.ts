import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import fs from "fs/promises";
import path from "path";
import Product from "@/models/Product";
import {
  ALLOWED_EXTENSION,
  ERROR_FILE_EXSTENSION,
  ERROR_FILE_SIZE,
  ERROR_INTERNAL,
  MAX_SIZE_FILE,
  URL_UPLOAD_PRODUCT,
} from "@/constants";

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new multiparty.Form();

  try {
    const data = await new Promise((resolve, reject) => {
      form.parse(req, async function (err: any, fields: any, files: any) {
        const IdProduct = fields.idProduct[0];
        const File = files.file[0];
        if (err) {
          reject({ err });
        }

        const { originalFilename, path: tempPath } = File;
        const fileExtension = path.extname(originalFilename);

        if (!ALLOWED_EXTENSION.includes(fileExtension)) {
          reject({ error: ERROR_FILE_EXSTENSION });
          await Product.destroy({ where: { id: IdProduct } });
          throw new Error(ERROR_FILE_EXSTENSION);
        }

        if (File.size > MAX_SIZE_FILE) {
          reject({ error: ERROR_FILE_SIZE });
          await Product.destroy({ where: { id: IdProduct } });
          throw new Error(ERROR_FILE_SIZE);
        }

        const targetFolder = path.join(process.cwd(), URL_UPLOAD_PRODUCT);
        const targetPath = path.join(
          targetFolder,
          `${IdProduct}${fileExtension}`,
        );

        const fileExists = await fs
          .access(targetPath)
          .then(() => true)
          .catch(() => false);
        if (fileExists) {
          await fs.unlink(targetPath);
        }
        await fs.copyFile(tempPath, targetPath);
        await fs.unlink(tempPath);

        const updatedProduct = await Product.update(
          { foto: `/uploads/products/${IdProduct}${fileExtension}` },
          { where: { id: IdProduct } },
        );

        resolve({ success: true, targetPath, updatedProduct });
      });
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error || { error: ERROR_INTERNAL });
  }
};

export default uploadImage;
export const config = {
  api: {
    bodyParser: false,
  },
};
