import { useState } from 'react';
import {Button} from 'react-bootstrap';
import './Panel.css'
function PanelTab(props){
  const {name, callback} = props; 

  return <Button className="panelTab" onClick={callback}>
      {name}
    </Button>
}
function PanelItemWrapper(props){
  const {name, Child} = props; 
  const [isOpen, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!isOpen);
  }
  console.log(isOpen);

  return <div className="panelItemWrapper">
    <div style={{display: isOpen ? 'block' : 'none' }}>
      <Child />
    </div>
    <PanelTab name={name} callback={onClick}/>
  </div>
  
}

export {PanelItemWrapper};