import { useContext, useEffect, useState } from "react";
import styles from "./horseDetailCard.module.css";
import HorsesContext from "../../context/HorsesContext";
import DetailItem from "./DetailItem";
import { Horse, updateHorse } from "../../clients/horsesClient";

interface Props {
  horses: Horse[];
  setHorses: (horses: Horse[]) => void;
}

function HorseDetailCard({ horses, setHorses }: Props) {
  const [horseDetails, setHorseDetails] = useState<Horse | undefined>(
    undefined
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const horsesContext = useContext(HorsesContext);
  if (!horsesContext) {
    throw new Error("handle error");
  }
  const { selectedHorse } = horsesContext;

  useEffect(() => {
    setHorseDetails(selectedHorse);
  }, [selectedHorse]);

  const renderEmptyCard = () => (
    <div className={styles.container}>
      <p>Select a horse from the list.</p>
    </div>
  );

  const onSave = async () => {
    if (!horseDetails) {
      return;
    }

    try {
      const updatedHorse = await updateHorse(horseDetails.id, horseDetails);
      setHorses(
        horses.map((horse) =>
          horse.id === updatedHorse.id ? updatedHorse : horse
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditMode(false);
    }
  };

  const renderDetailCard = (_horseDetails: Horse) => (
    <div className={styles.container}>
      {isEditMode ? (
        <input
          className={styles.nameInput}
          value={_horseDetails.name}
          onChange={(event) =>
            setHorseDetails({ ..._horseDetails, name: event.target.value })
          }
        />
      ) : (
        <h3 className={styles.name}>{_horseDetails.name}</h3>
      )}
      <div className={styles.content}>
        <DetailItem
          label="Favourite Food"
          value={_horseDetails.profile?.favouriteFood}
          updateHorseDetail={(val: string) =>
            setHorseDetails({
              ..._horseDetails,
              profile: {
                ..._horseDetails.profile,
                favouriteFood: val,
              },
            })
          }
          isEditMode={isEditMode}
          ariaLabel="food-input"
        />
        <DetailItem
          label="Height"
          value={
            _horseDetails.profile?.physical?.height
              ? `${_horseDetails.profile.physical.height}`
              : null
          }
          updateHorseDetail={(val: string) =>
            setHorseDetails({
              ..._horseDetails,
              profile: {
                ..._horseDetails.profile,
                physical: {
                  ..._horseDetails.profile.physical,
                  height: parseInt(val, 10),
                },
              },
            })
          }
          isEditMode={isEditMode}
          ariaLabel="height-input"
        />
        <DetailItem
          label="Weight"
          value={
            _horseDetails.profile?.physical?.weight
              ? `${_horseDetails.profile.physical.weight}`
              : null
          }
          updateHorseDetail={(val: string) =>
            setHorseDetails({
              ..._horseDetails,
              profile: {
                ..._horseDetails.profile,
                physical: {
                  ..._horseDetails.profile.physical,
                  weight: parseInt(val, 10),
                },
              },
            })
          }
          isEditMode={isEditMode}
          ariaLabel="weight-input"
        />
      </div>
      <div className={styles.buttonContainer}>
        {isEditMode ? (
          <button
            className={styles.button}
            onClick={onSave}
            disabled={!!!horseDetails?.name}
          >
            Save
          </button>
        ) : (
          <button className={styles.button} onClick={() => setIsEditMode(true)}>
            Edit
          </button>
        )}
        {/* <button className={styles.button}>Compare</button> */}
      </div>
    </div>
  );

  return horseDetails ? renderDetailCard(horseDetails) : renderEmptyCard();
}

export default HorseDetailCard;
