import React from "react";
import { Button } from "@heroui/react";

const NotificationModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // No renderiza si no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <p className="mb-4 whitespace-pre-line">{message}</p>
          <Button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default NotificationModal;


