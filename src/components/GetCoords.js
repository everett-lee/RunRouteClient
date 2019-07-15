import React from 'react';
// class App extends React.Component {   
//     constructor(props) {
//         super(props);
        
//         this.state = { lat: null, lon: null, errorMsg: "" };
//     }

//     componentDidMount() {
//         window.navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 this.setState({ lat: position.coords.latitude, 
//                                 lon: position.coords.longitude})
//             },
//             (error) => this.setState({errorMsg: error.message}) 
//         );
//     }
 
//     // component did update => send API request to generate graph

//     render() { 
//         if (this.state.errorMsg === "") {
//         return <div> Latitude {this.state.lat} Longitude {this.state.lon} </div>;
//         } else {
//             return <div>{this.state.errorMsg    }</div> 
//         }
//     }
// }