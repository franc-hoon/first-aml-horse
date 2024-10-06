import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Horse } from "../clients/horsesClient";

interface HorsesContextType {
  selectedHorse: Horse | undefined;
  setSelectedHorse: Dispatch<SetStateAction<Horse | undefined>>;
}

const HorsesContext = createContext<HorsesContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const HorsesProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [selectedHorse, setSelectedHorse] = useState<Horse | undefined>(
    undefined
  );

  return (
    <HorsesContext.Provider value={{ selectedHorse, setSelectedHorse }}>
      {children}
    </HorsesContext.Provider>
  );
};

export default HorsesContext;
