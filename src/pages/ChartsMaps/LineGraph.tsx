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
  type Cases = {
    cases: number;
    deaths: number;
    recovered: number;
  };
  const { isLoading, error, data, isFetching } = useQuery<Cases, Error>({
    queryKey: ["covidCases"],
    queryFn: async () => {
      let { data } = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      return data;
    },
  });
  const [chartData, setChartData] = useState<any>([]);
  const [reduceData, setReduceData] = useState<any>(true);
  useEffect(() => {
    console.log(data);
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

  if (isLoading) return <div>Loading data</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;
  //   if (isFetching) return <div>Background updating...</div>;

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
