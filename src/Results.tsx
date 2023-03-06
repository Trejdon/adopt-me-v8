import Pet from "./Pet";
import { Pet as PetType } from "./APIResponsesTypes";

const Results = ({ pets }: { pets: PetType[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!pets.length ? (
        <h1>No Pets found</h1>
      ) : (
        pets.map((pet) => {
          const { name, animal, breed, id, images, city, state } = pet;
          return (
            <Pet
              name={name}
              animal={animal}
              breed={breed}
              key={id}
              images={images}
              location={`${city}, ${state}`}
              id={id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
