import { useState } from 'react';
import {Button} from 'react-bootstrap';
import './Panel.css'
function PanelTab(props){
  const {name, callback} = props; 

  return <Button variant="light" className="panelTab" onClick={callback}>
      {name}
    </Button>
}
function PanelItemWrapper(props){
  const {name, Child} = props; 
  const [isOpen, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!isOpen);
  }

  return <div className="panelItemWrapper">
    <PanelTab name={name} callback={onClick}/>
    <div style={{display: isOpen ? 'block' : 'none' }}>
      <Child />
    </div>
  </div>
  
}

export {PanelItemWrapper};