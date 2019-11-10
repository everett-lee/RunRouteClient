import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';

// displays details of a generated route 
const RouteDetailsSegment = ({ coords, routeName, routeDistance, routeGradient }) => {
    const lat = coords.lat.toFixed(2);
    const lon = coords.lon.toFixed(2);

    const distance = routeDistance ? (routeDistance / 1000).toFixed(1) + 'KM' : ''
    const gradient = routeGradient ? (routeGradient * 100).toFixed(1) + '%' : '';

    return (
        <Segment >
            <Grid columns={3} textAlign={"center"}>
                <Grid.Column>
                    {`Route start: ${routeName ?
                        routeName : ' '}`} ({lat}, {lon})
            </Grid.Column>
                <Grid.Column>
                    {`Distance: ${distance}`}
                </Grid.Column>
                <Grid.Column>
                    {`Average gradient: ${gradient}`}
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default RouteDetailsSegment;