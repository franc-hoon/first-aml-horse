import { Horse } from "../../clients/horsesClient";
import styles from "./horseListCard.module.css";

interface Props {
  horseDetails: Horse;
  setSelectedHorse: (id: string) => void;
}

function HorseCard({ horseDetails, setSelectedHorse }: Props) {
  const { id, name } = horseDetails;

  return (
    <div className={styles.container} onClick={() => setSelectedHorse(id)}>
      {name}
    </div>
  );
}

export default HorseCard;
