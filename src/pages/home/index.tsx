import { useEffect, useState } from "react";
import HorseDetailCard from "../../components/HorseDetailCard";
import styles from "./home.module.css";
import List from "./HorseList";
import { Horse, getHorses } from "../../clients/horsesClient";

function Home() {
  const [loading, setLoading] = useState(true);
  const [horses, setHorses] = useState<Horse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHorses();
        setHorses(data);
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Horses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.content}>
          <List horses={horses} />
          <HorseDetailCard horses={horses} setHorses={setHorses} />
        </div>
      )}
    </div>
  );
}

export default Home;
