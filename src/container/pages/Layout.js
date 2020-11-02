import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default class Layout extends Component {
  render() {

    return (
      <div>
        <Navbar/>

        {this.props.children}
        
        <Footer/>
      </div>
    )
  }
}
