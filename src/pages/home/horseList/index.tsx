import { useContext, useEffect } from "react";
import HorseCard from "../../../components/HorseListCard";
import styles from "./horseList.module.css";
import data from "./data.json";
import HorsesContext from "../../../context/HorsesContext";

interface Props {
  setSelectedHorse: (id: string) => void;
}

function List({ setSelectedHorse }: Props) {
  const horsesContext = useContext(HorsesContext);

  if (!horsesContext) {
    throw new Error("handle error");
  }

  const { setDataArray } = horsesContext;

  useEffect(() => {
    setDataArray([data]);
  }, []);

  return (
    <div className={styles.container}>
      <HorseCard horseDetails={data} setSelectedHorse={setSelectedHorse} />
    </div>
  );
}

export default List;
