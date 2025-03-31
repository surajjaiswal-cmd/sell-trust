"use client";
import * as Toast from "@radix-ui/react-toast";
import { createContext, useContext, useState } from "react";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="bg-[#4f4d4d] text-gray shadow-lg p-3 rounded-md fixed bottom-5 right-5 z-100"
          open={open}
          onOpenChange={setOpen}>
          <Toast.Title>{message}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-5 right-5 w-auto max-w-sm z-100" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
