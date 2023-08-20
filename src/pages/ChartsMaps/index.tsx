import LeafletMap from "./LeafletMap";
import LineGraph from "./LineGraph";
import OverallNumbers from "./OverallNumbers";
import "./styles.css";

const ChartsMaps = () => {
  return (
    <div className="min-h-screen p-8 bg-[#f4f4f4]">
      <div className="mb-4 bg-white rounded-lg p-4 border">
        <h3 className="header-3">Current stats on covid-19</h3>
        <OverallNumbers />
      </div>
      <div className="bg-white rounded-lg p-4 border my-4">
        <LineGraph />
      </div>
      <div className="bg-white rounded-lg p-4 border my-4">
        <h3 className="header-3">Covid-19 cases by country</h3>
        <LeafletMap />
      </div>
    </div>
  );
};

export default ChartsMaps;
