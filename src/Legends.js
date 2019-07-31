import React, { Component } from 'react';
import './App.css';



class Legends extends Component {
  
  render() {
    const spanText = this.props.orderedBy === "1M" ? "Links / month" : "Links / 2 weeks" 
    const styles = {
      oneThree: {
        backgroundColor: "#FF8612",
        borderColor: "#E56C00"
      },
      fourTen: {
        backgroundColor: "#FFBC80",
        borderColor: "#FF9333"
      },
      tenHundred: {
        backgroundColor: "#FFE5CD",
        borderColor: "#FFBB7F"
      },
      lbPeriod: {
        backgroundColor: "rgba(66, 133, 244, 0.15)",
        borderColor: "#4285F4"
      },
      lbActive: {
        backgroundColor: "rgba(66, 133, 244, 0.4)",
        borderColor: "#4285F4"
      },
      linksLine: {
        width: "4px",
        height: "100%",
        backgroundColor: "#67608F",
        margin: "0 auto",
        borderRadius: "20px"
      },
      lineContainer: {
        border: "none",
      }
    }
    
    return (
      <div className="row justify-content-center l-row">
        <div className="col-lg-auto legends-kw legends">
          <div className="flex-holder">
          {this.props.oneThree  && <div className="l-line">
            <div className="l-rectangle" style={styles.oneThree}></div>
            <span className="l-span">1-3</span>
          </div> }
          {this.props.fourTen  && <div className="l-line">
            <div className="l-rectangle" style={styles.fourTen}></div>
            <span className="l-span">4-10</span>
          </div>}
          {this.props.tenHundred && <div className="l-line">
            <div className="l-rectangle" style={styles.tenHundred}></div>
            <span className="l-span">11-100</span>
          </div>}</div>
        </div>
        
        <div className="col-lg-auto legends-period legends">
          <div className="flex-holder">
          <div className="l-line">
            <div className="l-rectangle" style={styles.lbPeriod}></div>
            <span className="l-span">Linkbuilding Period</span>
          </div>
          <div className="l-line">
            <div className="l-rectangle" style={styles.lbActive}></div>
            <span className="l-span">Impact Period</span>
          </div>
          <div className="l-line">
            <div className="l-rectangle" style={styles.lineContainer}>
              <div style={styles.linksLine}></div>
            </div>
            <span className="l-span">{spanText}</span>
          </div></div>
        </div>
      </div>
    );
  }
}

export default Legends
