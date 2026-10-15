import { createContext, useContext } from "react";

export const Contexto = createContext();

export const useApp = () => useContext(Contexto);
