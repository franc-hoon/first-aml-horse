import HorseCard from "../../../components/HorseListCard";
import styles from "./horseList.module.css";
import { Horse } from "../../../clients/horsesClient";

interface Props {
  horses: Horse[];
}

function List({ horses }: Props) {
  const renderHorseList = () =>
    horses.map((horse) => <HorseCard key={horse.id} horseDetails={horse} />);

  return <div className={styles.container}>{renderHorseList()}</div>;
}

export default List;
