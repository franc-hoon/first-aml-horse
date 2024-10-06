export type Horse = {
  id: string;
  name: string;
  profile: {
    favouriteFood: string;
    physical: {
      height: number;
      weight: number;
    };
  };
};
