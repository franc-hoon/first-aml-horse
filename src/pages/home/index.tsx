import { useState } from "react";
import HorseDetailCard from "../../components/HorseDetailCard";
import styles from "./home.module.css";
import List from "./horseList";

function Home() {
  const [selectedHorse, setSelectedHorse] = useState<string | undefined>(
    undefined
  );

  return (
    <div className={styles.page}>
      <h1>Horses</h1>
      <div className={styles.content}>
        <List setSelectedHorse={setSelectedHorse} />
        <HorseDetailCard selectedHorse={selectedHorse} />
      </div>
    </div>
  );
}

export default Home;
