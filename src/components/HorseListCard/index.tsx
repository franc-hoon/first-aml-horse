import { useContext } from "react";
import { Horse } from "../../clients/horsesClient";
import styles from "./horseListCard.module.css";
import HorsesContext from "../../context/HorsesContext";

interface Props {
  horseDetails: Horse;
}

function HorseCard({ horseDetails }: Props) {
  const horsesContext = useContext(HorsesContext);

  if (!horsesContext) {
    throw new Error("handle error");
  }

  const { setSelectedHorse } = horsesContext;

  return (
    <div
      className={styles.container}
      onClick={() => setSelectedHorse(horseDetails)}
    >
      {horseDetails.name}
    </div>
  );
}

export default HorseCard;
