export type Horse = {
  id: string;
  name: string;
  profile: {
    favouriteFood?: string;
    physical?: {
      height?: number;
      weight?: number;
    };
  };
};

const getHorses = async () => {
  const response = await fetch("http://localhost:3016/horse");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result;
};

const getHorse = async (id: string) => {
  const response = await fetch(`http://localhost:3016/horse/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result;
};

export { getHorses, getHorse };
