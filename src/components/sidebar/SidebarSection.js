import React from 'react';
import { Segment } from 'semantic-ui-react'


const SidebarSection = (props) => {
    return <Segment content={props.routeID}
    id="sidebarSegment"
    textAlign={ "center" }
    onClick={ (e) => console.log(props.routeID) }/>
}
export default SidebarSection;