import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';

const RouteDetailsSegment = (props) => {
    return (
        <Segment >
        <Grid columns={2} textAlign={"center"}>
            <Grid.Column>
                { `Route start: ${props.routeName? 
                    props.routeName: ''}` }
            </Grid.Column>
            <Grid.Column>
                { `Distance: ${props.routeDistance? 
                    (props.routeDistance/1000).toFixed(1)
                    +'KM': ''}` }
            </Grid.Column>
        </Grid>
        </Segment>
    );
}


export default RouteDetailsSegment;