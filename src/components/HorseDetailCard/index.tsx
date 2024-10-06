import { useContext } from "react";
import styles from "./horseDetailCard.module.css";
import HorsesContext from "../../context/HorsesContext";

interface Props {
  selectedHorse: string | undefined;
}

function HorseDetailCard({ selectedHorse }: Props) {
  const horsesContext = useContext(HorsesContext);

  if (!horsesContext) {
    throw new Error("handle error");
  }

  const { dataArray } = horsesContext;

  const horseDetails = dataArray.find((horse) => horse.id === selectedHorse);

  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{horseDetails?.name}</h3>
      <div className={styles.content}>
        <div>
          <label className={styles.label}>Favourite Food</label>
          <p className={styles.info}>{horseDetails?.profile.favouriteFood}</p>
        </div>
        <div>
          <label className={styles.label}>Height</label>
          <p className={styles.info}>{horseDetails?.profile.physical.height}</p>
        </div>
        <div>
          <label className={styles.label}>Weight</label>
          <p className={styles.info}>{horseDetails?.profile.physical.weight}</p>
        </div>
      </div>
    </div>
  );
}

export default HorseDetailCard;
