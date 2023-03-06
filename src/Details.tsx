import { useState, useContext, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
// import Modal from "./Modal";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Required Id parameter missing ");
  }

  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐈</h2>
      </div>
    );
  }
  const pet = results?.data?.pets[0];

  if (!pet) {
    throw new Error("no pet found");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} – {pet.breed} – {pet.city}, {pet.state}
        </h2>
        <button
          className="color rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you lke to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  className="color rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
                  onClick={() => {
                    setAdoptedPet(pet), navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  className="color rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
