import { LocationZonePanel } from "../LocationZones";
import { PanelItemWrapper } from "./PanelItemWrapper";
import './Panel.css';

function Panel() {
  const panels = {
    hotspots: LocationZonePanel,
  };
  return (
    <div className="panel">
      {Object.entries(panels).map(([key, value]) => (
        <PanelItemWrapper key={key} name={key} Child={value} />
      ))}
    </div>
  );
}

export default Panel;
