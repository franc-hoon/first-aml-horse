import styles from "./horseDetailCard.module.css";

interface Props {
  label: string;
  value: string | undefined | null;
  isEditMode: boolean;
  ariaLabel: string;
  updateHorseDetail: (val: string) => void;
}

function DetailItem({
  label,
  value,
  isEditMode,
  ariaLabel,
  updateHorseDetail,
}: Props) {
  if (value === undefined) return null;

  const getValueString = () => {
    if (value == null) {
      return "N/A";
    }
    if (label === "Height") {
      return `${value} cm`;
    }
    if (label === "Weight") {
      return `${value} kg`;
    }
    return value;
  };

  return (
    <div className={styles.detailItem}>
      <label className={styles.label}>{label}</label>
      {isEditMode ? (
        <input
          className={styles.info}
          value={value || ""}
          onChange={(event) => updateHorseDetail(event.target.value)}
          aria-label={ariaLabel}
        />
      ) : (
        <p className={styles.info}>{getValueString()}</p>
      )}
    </div>
  );
}

export default DetailItem;
