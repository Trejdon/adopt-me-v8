import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
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
