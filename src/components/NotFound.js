import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div className="general-bg" style={{minHeight: "100%", color: "#393b44", paddingTop: "90px"}}>
                <h3 className="text-center pt-3 pb-5">This page does not exist</h3>
                <div className="pt-5 pl-5">
                    <img style={{width: '90%'}} src='https://media.giphy.com/media/l0HlOBZcl7sbV6LnO/source.gif' alt='Not found'/>
                </div>
            </div>
        )
    }
}
