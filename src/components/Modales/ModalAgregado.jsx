
import { useApp } from "../../context/Contexto";



export const ModalAgregado = () => {
  const { ModalAgregadoInfo, setModalAgregado, setisCarroOpen } = useApp();

  if (!ModalAgregadoInfo.isOpen) return null;

  const handleClose = () => {
    setModalAgregado({ isOpen: false, productoNombre: "" });
  };

  const handleVerCarrito = () => {
    handleClose();
    setisCarroOpen(true);
  };

    return (
        <>
        
        
        </>
    )
    
}