import { useContext } from "react";
import styles from "./horseDetailCard.module.css";
import HorsesContext from "../../context/HorsesContext";
import DetailItem from "./DetailItem";

function HorseDetailCard() {
  const horsesContext = useContext(HorsesContext);

  if (!horsesContext) {
    throw new Error("handle error");
  }

  const { selectedHorse } = horsesContext;

  const renderEmptyCard = () => (
    <div className={styles.container}>
      <p>Select a horse from the list.</p>
    </div>
  );

  const renderDetailCard = () => (
    <div className={styles.container}>
      <h3 className={styles.name}>{selectedHorse?.name}</h3>
      <div className={styles.content}>
        <DetailItem
          label="Favourite Food"
          value={selectedHorse?.profile?.favouriteFood}
        />
        <DetailItem
          label="Height"
          value={
            selectedHorse?.profile?.physical?.height
              ? `${selectedHorse.profile.physical.height} cm`
              : undefined
          }
        />
        <DetailItem
          label="Weight"
          value={
            selectedHorse?.profile?.physical?.weight
              ? `${selectedHorse.profile.physical.weight} kg`
              : undefined
          }
        />
      </div>
    </div>
  );

  return selectedHorse ? renderDetailCard() : renderEmptyCard();
}

export default HorseDetailCard;
