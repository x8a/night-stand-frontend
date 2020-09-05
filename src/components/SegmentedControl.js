import React, { Component } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class SegmentedControl extends Component {
    render() {
        return (
        <ButtonGroup style={{marginLeft: "45px"}}>
            <Button variant="secondary"><Link style={{ color: "white" }} to={'/profile'}>All</Link></Button>
            <Button variant="secondary"><Link style={{ color: "white" }} to={'/reading'}>Reading</Link></Button>
            <Button variant="secondary"><Link style={{ color: "white" }} to={'/pending'}>Pending</Link></Button>
            <Button variant="secondary"><Link style={{ color: "white" }} to={'/read'}>Finished</Link></Button>
        </ButtonGroup>
        )
    }
}
