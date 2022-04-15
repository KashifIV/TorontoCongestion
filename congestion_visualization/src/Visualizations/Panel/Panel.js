
import { PanelItemWrapper } from "./PanelItemWrapper";
import { LocationZonePanel } from "../LocationZones/LocationZones";
import './Panel.css';
import { TransitRoutesPanel } from "../TransitRoutes/TransitRoutes";
import { AnnualRevenuePanel } from "../AnnualRevenue/AnnualRevenue";
function Panel() {
  const panels = {
    traffic: LocationZonePanel,
    transit: TransitRoutesPanel, 
    revenue: AnnualRevenuePanel
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
