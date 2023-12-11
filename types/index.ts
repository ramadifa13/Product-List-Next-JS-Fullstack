import { ReactNode } from "react";

export interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
  foto: string;
  suplier_id: number;
  Supplier: Supplier;
}

export interface Supplier {
  id_suplier: number;
  nama_suplier: string;
  alamat: string;
  email: string;
}

export interface FormProductPageProps {
  isOpen: boolean;
  isClose: () => void;
  data: Product;
  btnRef: React.RefObject<HTMLButtonElement>;
}

export interface DetailProductProps {
  isModal: boolean;
  onClose: () => void;
  data: Product;
}

export interface Pagination {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface CardComponentProps {
  products: Product[];
  onSearch: (searchTerm: string) => void;
  onAddProduct: () => void;
  onUpdate: (data: Product) => void;
  onDelete: (data: Product) => void;
  onDetail: (data: Product) => void;
  onPageChange: (page: number | "prev" | "next") => void;
  pagination: Pagination;
  btnRef: React.RefObject<HTMLButtonElement>;
  loading: boolean;
}
export interface CustomAlertDialogProps {
  isOpen: boolean;
  leastDestructiveRef: React.RefObject<any>;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export interface DrawerComponentProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<any>;
  headerLabel: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}
export interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  modalHeader: string;
  children: React.ReactNode;
  modalFooter: React.ReactNode;
}

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  modalTitle: any;
  modalFooter: any;
  children: any;
}

export interface HomeWrapperProps {
  headerLabel: string;
  children: ReactNode;
}
