import React from 'react';
import { Segment } from 'semantic-ui-react';

const SidebarSection = (props) => {
    return <Segment content={props.name}
    id="sidebarSegment"
    textAlign={ "center" }
    onClick={ () => 
        props.reloadOldRoute(props.routeCoords, props.name, props.distance, props.gradient) }/>
};
export default SidebarSection;