import React from 'react';
import { renderRoutes } from 'react-router-config'

class App extends React.Component {
    constructor(props) {
        console.warn(props);
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="app">{renderRoutes(this.props.route.routes)}</div>
        );
    }
}

export default App;
