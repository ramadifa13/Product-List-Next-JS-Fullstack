import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { CustomAlertDialogProps } from "@/types";

const DeleteAlert: React.FC<CustomAlertDialogProps> = ({
  isOpen,
  leastDestructiveRef,
  onClose,
  onDelete,
}) => {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await onDelete();
      toast({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You cant undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={leastDestructiveRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
