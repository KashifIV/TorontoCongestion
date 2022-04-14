
import { PanelItemWrapper } from "./PanelItemWrapper";
import { LocationZonePanel } from "../LocationZones/LocationZones";
import './Panel.css';
import { TransitRoutesPanel } from "../TransitRoutes/TransitRoutes";
function Panel() {
  const panels = {
    hotspots: LocationZonePanel,
    transit: TransitRoutesPanel
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
