import { LocationZonePanel } from "../LocationZones";
import { PanelItemWrapper } from "./PanelItemWrapper";
import './Panel.css';
import { useState, useCallback, useMemo } from "react";
function Panel() {
  const panels = ['hotspots'];
  return (
    <div className="panel">
      {panels.map((key) => (
        <PanelItemWrapper key={key} name={key} Child={LocationZonePanel} />
      ))}
    </div>
  );
}

export default Panel;
