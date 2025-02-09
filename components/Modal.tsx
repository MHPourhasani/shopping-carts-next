"use client";
import CloseIcon from "@/assets/icons/components/Close";
import { cn } from "@/shared/helper";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    status: boolean;
    title: string;
    titleClassName?: string;
    children: React.ReactNode;
    onClose?: () => void;
    isCloseIcon?: () => boolean;
    className?: string;
}

const Modal = (props: ModalProps) => {
    const { status, title, titleClassName, onClose, children, isCloseIcon = true, className } = props;

    useEffect(() => {
        if (status) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [status]);

    return status
        ? createPortal(
              <section className="fixed inset-0 z-[1000] flex h-screen w-screen items-center justify-center">
                  <div
                      onClick={() => {
                          if (onClose) onClose();
                      }}
                      className="h-full w-full bg-black opacity-70 dark:opacity-80"
                  />

                  <div
                      className={cn(
                          `hover-transition absolute bottom-0 flex w-full flex-col gap-8 rounded-t-3xl bg-white p-4 dark:bg-secondary-700 lg:bottom-auto lg:max-w-[1000px] lg:rounded-3xl`,
                          className,
                      )}
                  >
                      <span className="flex w-full items-center justify-between gap-4">
                          <h3 className={cn(`truncate text-lg font-bold lg:text-xl`, titleClassName)}>{title}</h3>
                          {isCloseIcon && (
                              <CloseIcon
                                  onClick={() => {
                                      if (onClose) onClose();
                                  }}
                                  className="cursor-pointer fill-secondary-700 dark:fill-secondary-100"
                              />
                          )}
                      </span>

                      <div className="no-scrollbar h-auto max-h-[500px] w-full flex-1 items-center justify-center overflow-y-scroll lg:max-h-[80vh]">
                          {children}
                      </div>
                  </div>
              </section>,
              document.getElementById("shop-modal")!,
          )
        : null;
};

export default Modal;
