import React from "react";
import styles from "./horseDetailCard.module.css";

interface Props {
  label: string;
  value: string | undefined;
}

function DetailItem({ label, value }: Props) {
  if (!value) return null;

  return (
    <div>
      <label className={styles.label}>{label}</label>
      <p className={styles.info}>{value}</p>
    </div>
  );
}

export default DetailItem;
