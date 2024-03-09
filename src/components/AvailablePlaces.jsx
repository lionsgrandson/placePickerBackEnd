import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    async function fetchPlces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          //failed
          throw new Error("Failed to fetch places");
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setisLoading(false);
    }
    fetchPlces();
  }, []);
  if (error) {
    return <Error></Error>;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      isLoading={isLoading}
      loadingText="Fetching Place data..."
      onSelectPlace={onSelectPlace}
    />
  );
}
// TODO search async and await
