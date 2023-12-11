import { ModalComponentProps } from "@/types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

function ModalComponent({
  isOpen,
  onClose,
  modalHeader,
  children,
  modalFooter,
}: ModalComponentProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>{modalFooter}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default ModalComponent;
