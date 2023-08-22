import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineGraph = () => {
  // Define the type of data to be fetched
  type Cases = {
    cases: number;
    deaths: number;
    recovered: number;
  };
  // Fetch data from the API
  const { isLoading, error, data } = useQuery<Cases, Error>({
    queryKey: ["covidCases"],
    queryFn: async () => {
      let { data } = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      return data;
    },
  });

  // Manipulating data for the chart
  const [chartData, setChartData] = useState<any>([]);
  // Reduce data to make it more readable and faster
  const [reduceData, setReduceData] = useState<any>(true);
  useEffect(() => {
    if (!data) return;
    let cases: any = data.cases;
    let i = 0;
    let output = [];
    while (i < Object.keys(cases).length) {
      output.push({
        name: Object.keys(cases)[i],
        cases: Object.values(cases)[i],
        deaths: Object.values(data.deaths)[i],
        recovered: Object.values(data.recovered)[i],
      });
      if (reduceData) i += 10;
      else i++;
    }
    setChartData(output);
  }, [reduceData, data]);

  // Set the aspect ratio of the chart (for imporving default responsiveness of recharts)
  const [aspect, setAspect] = useState(3);
  const setDimension = () => {
    if (window.innerWidth < 400) setAspect(1);
    else if (window.innerWidth < 600) setAspect(1.5);
    else if (window.innerWidth < 768) setAspect(2);
    else if (window.innerWidth < 1024) setAspect(3);
    else setAspect(4);
  };
  useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [aspect]);

  // Handle loading and error states
  if (isLoading) return <div>Loading data</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  // Render the chart
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="header-3">Covid-19 cases over time</h3>
        <button
          className="btn btn-primary"
          onClick={() => setReduceData(!reduceData)}
        >
          {reduceData ? "Show all data (slower)" : "Show reduced data (faster)"}
        </button>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="#8884d8" />
          <Line type="monotone" dataKey="deaths" stroke="red" />
          <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
