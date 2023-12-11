import { DrawerComponentProps } from "@/types";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import React from "react";

function DrawerComponent({
  isOpen,
  onClose,
  btnRef,
  headerLabel,
  children,
  footer,
}: DrawerComponentProps) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerLabel}</DrawerHeader>

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerComponent;
