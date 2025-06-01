import React from "react";

const DialogWrapper = ({ children, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg p-6"
        style={{
          width: "fit-content",
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default DialogWrapper;
