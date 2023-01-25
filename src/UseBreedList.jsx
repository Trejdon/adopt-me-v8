import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded"); // loaded, loading, etc.

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal]);

  const requestBreedList = async () => {
    setBreedList([]);
    setStatus("Loading");

    const res = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const json = await res.json();

    localCache[animal] = json.breeds || [];
    setBreedList(localCache[animal]);
    setStatus("loaded");
  };

  return [breedList, status];
}
