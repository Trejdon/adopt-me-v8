import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
