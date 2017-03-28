import React from 'react';
import Title from 'components/title/title';

export default class Home extends React.Component {
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
                <Title title="home" />
                <div className="content">this is home</div>
            </div>
        );
    }
}
