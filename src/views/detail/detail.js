import React from 'react';
import Title from 'components/title/title';
import { renderRoutes } from 'react-router-config';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    render() {
        return (
            <div onClick={ this.handleClick } className="title">
                <Title title="detail" />
                <div className="content">this is detail</div>
                <div className="children">{renderRoutes(this.props.route.routes)}</div>
            </div>
        );
    }
}
