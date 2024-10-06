import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Horse } from "../clients/horsesClient";

interface HorsesContextType {
  dataArray: Horse[];
  setDataArray: Dispatch<SetStateAction<Horse[]>>;
}

const HorsesContext = createContext<HorsesContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const HorsesProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [dataArray, setDataArray] = useState<Horse[]>([]);

  return (
    <HorsesContext.Provider value={{ dataArray, setDataArray }}>
      {children}
    </HorsesContext.Provider>
  );
};

export default HorsesContext;
