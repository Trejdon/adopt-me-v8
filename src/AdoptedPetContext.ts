import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
  {
    id: 1336,
    name: "Fido",
    animal: "dog",
    description: "lorem ipsum",
    breed: "spaniel",
    images: [],
    city: "San Antonio",
    state: "Texas",
  },
  () => {},
]);

export default AdoptedPetContext;
