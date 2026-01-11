import { ModalOverlay, Modal as ReactAriaModal } from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";
import Button from "@/components/Button";
import Image from "@/components/Image";

import { IModalProps } from "./Modal.types";
import styles from "./Modal.module.css";

function Modal({ className, isOpen, onOpenChange, children }: IModalProps) {
  return (
    <ModalOverlay
      isDismissable
      isKeyboardDismissDisabled
      shouldCloseOnInteractOutside={() => true}
      className={styles.ModalOverlay}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
    >
      <ReactAriaModal
        isDismissable
        isKeyboardDismissDisabled
        shouldCloseOnInteractOutside={() => true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={joinClassNames(styles.Modal, className)}
      >
        <Button
          variant="secondary"
          color="gray"
          size="sm"
          className={styles.CloseButton}
          onClick={() => onOpenChange(false)}
        >
          <Image
            src="/assets/images/icons/cross.svg"
            alt="Info"
            height={16}
            width={16}
          />
        </Button>
        {children}
      </ReactAriaModal>
    </ModalOverlay>
  );
}

export default Modal;
