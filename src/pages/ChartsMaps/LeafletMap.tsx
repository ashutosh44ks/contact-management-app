import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const LeafletMap = () => {
  // Define the type of data to be fetched
  type Country = [];

  // Fetch data from the API
  const { isLoading, error, data } = useQuery<Country, Error>({
    queryKey: ["countries"],
    queryFn: async () => {
      let { data } = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      return data;
    },
  });

  // Handle loading and error states
  if (isLoading) return <div>Loading leaflet data</div>;
  if (error)
    return (
      <div>An error has occurred loading leaflet data: {error.message}</div>
    );

  // Render the map
  return (
    <div>
      <MapContainer
        center={[20, 77]}
        zoom={3}
        scrollWheelZoom={false}
        style={{ height: "75vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((country: any) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>{country.country}</div>
              <div>Actice cases : {country.active}</div>
              <div>Recovered cases : {country.recovered}</div>
              <div>Deaths : {country.deaths}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
