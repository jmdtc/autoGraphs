import React, { Component } from 'react';
import './App.css';



class Link extends Component {
  render() {
    const style = {
      height: this.props.props.height,
      left: this.props.props.left,
      bottom: this.props.props.bottom,
      width: this.props.props.width,
      color: this.props.props.color,
    }
    const spanStyle = this.props.props.value.toString().length === 1 ? {
      display: "block",
      position: "relative",
      left: "-50%",
      top: "-25px",
      fontWeight: "700",
    } :
    {
      display: "block",
      position: "relative",
      left: "-150%",
      top: "-25px",
      fontWeight: "700",
    }
    
    return (
      <div className="link" style={style}>
        <span style={spanStyle}>{this.props.props.value}</span>
      </div>
    );
  }
}

export default Link;
