import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class SingleButton extends Component {
    render() {
        const isCurrentPath = this.props.location.pathname === this.props.path
        const background = isCurrentPath ? 'info' : 'secondary'

        return (
            <Button variant={background}>
                <Link style={{ color: "white" }} to={this.props.path}>{this.props.name}</Link>
            </Button>
        )
    }
}

export default withRouter(SingleButton)
