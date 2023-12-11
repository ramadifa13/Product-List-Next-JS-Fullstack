export const ERROR_INTERNAL = "Internal Server Error";
export const ERROR_FILE_SIZE = "File size exceeds the limit";
export const ERROR_FILE_EXSTENSION = "Invalid file extension";
export const ERROR_PRODUK_NOT_FOUND = "Product Not Found";
export const ERROR_METHOD_NOT_FOUND = "Method Not Found";

export const URL_UPLOAD_PRODUCT = "public/uploads/products";

export const ALLOWED_EXTENSION = [".png", ".jpg", ".jpeg"];
export const MAX_SIZE_FILE = 2 * 1024 * 1024;

export const GET = "GET";
export const POST = "POST";
export const DELETE = "DELETE";
export const PUT = "PUT";

export const defaultListObject = {
  id: 0,
  nama: "",
  deskripsi: "",
  harga: 0,
  stok: 0,
  foto: "",
  suplier_id: 0,
  Supplier: {
    id_suplier: 0,
    nama_suplier: "",
    alamat: "",
    email: "",
  },
};
export const defaultData = {
  productName: "",
  description: "",
  price: 0,
  stock: 0,
  file: null as File | null,
  selectedSupplier: null as number | null,
  showFileInput: false,
};
