import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OverallNumbers = () => {
  // Define the type of data to be fetched
  type CovidData = {
    updated: number;
    cases: number;
    deaths: number;
    recovered: number;
    active: number;
  };
  // Fetch data from the API
  const { isLoading, error, data } = useQuery<CovidData, Error>({
    queryKey: ["covidData"],
    queryFn: async () => {
      let { data } = await axios.get("https://disease.sh/v3/covid-19/all");
      return data;
    },
  });
  // Display the data
  return (
    <div>
      {isLoading ? (
        <div>Loading covid data</div>
      ) : error ? (
        <div>An error has occurred loading covid data: {error.message}</div>
      ) : (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div>Total cases : {data?.cases}</div>
          <div>Active cases : {data?.active}</div>
          <div>Recovered cases : {data?.recovered}</div>
          <div>Deaths : {data?.deaths}</div>
        </div>
      )}
    </div>
  );
};

export default OverallNumbers;
