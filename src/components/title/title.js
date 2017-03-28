import React from 'react';

export default class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || 'title',
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    render() {
        return (
            <div onClick={ this.handleClick } className="title">{ this.state.title }</div>
        );
    }
}
