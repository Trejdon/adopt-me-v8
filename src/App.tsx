import { lazy, Suspense } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";

// Removing for redux usage
// import AdoptedPetContext from "./AdoptedPetContext";

import { Pet } from "./APIResponsesTypes";
// Removing these from being normally imported in order to code split them for performance
// import Details from "./Details";
// import SearchParams from "./SearchParams";

// These are not loaded on the initial page load, but only as required by the app
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  // const adoptedPet = useState(null as Pet | null);  */ NO LONGER NEEDED WITH REDUX /*
  return (
    <div
      className="m-0 p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperB.jpg",
      }}
    >
      {/* <AdoptedPetContext.Provider value={adoptedPet}> */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🍥</h2>
              </div>
            }
          >
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                <h1>Adopt Me!</h1>
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </Provider>
      {/* </AdoptedPetContext.Provider> */}
    </div>
  );
};

export default App;
