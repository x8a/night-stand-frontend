import React, { Component } from 'react'
import { ButtonGroup } from 'react-bootstrap';
import SingleButton from "./SingleButton";

export default class SegmentedControl extends Component {
    render() {
        return (
        <ButtonGroup style={{marginLeft: "45px"}}>
            <SingleButton name="All" path='/profile'></SingleButton>
            <SingleButton name="Reading" path='/reading'></SingleButton>
            <SingleButton name="Pending" path='/pending'></SingleButton>
            <SingleButton name="Finished" path='/read'></SingleButton>
        </ButtonGroup>
        )
    }
}
