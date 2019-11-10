import React from 'react';
import { Segment } from 'semantic-ui-react';

const SidebarSection = ({ name, routeCoords, distance, gradient, reloadOldRoute }) => {
    return <Segment content={name}
        id="sidebarSegment"
        textAlign={"center"}
        onClick={() =>
            reloadOldRoute(routeCoords, name, distance, gradient)} />
};
export default SidebarSection;