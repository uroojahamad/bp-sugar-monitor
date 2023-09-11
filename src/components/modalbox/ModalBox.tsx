import { useEffect } from "react";

type ModalBoxProps = {
  children: any;
  onClose: () => void;
};

const ModalBox = ({ children, onClose }: ModalBoxProps) => {
  const onBackdropClose = (e: any) => {
    if (e.target.closest("#innerbox")) {
      return;
    }
    onClose();
  };

  const handleKeyEvent = (e: any) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyEvent);

    return () => {
      document.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center w-full h-full absolute top-0 bg-gray-900 bg-opacity-75"
      onClick={onBackdropClose}
    >
      {children}
    </div>
  );
};

export default ModalBox;
