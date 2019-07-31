import React, { Component } from 'react';
import './App.css';
import Link from './Link';
import Legends from './Legends'
import orderByTwoWeeks from './orderByTwoWeeks';
import orderByMonth from './orderByMonth';
import getLinksStyling from './getLinksStyling';
import html2canvas from 'html2canvas';
import moment from 'moment';


class App extends Component {
  constructor() {
    super()
    this.state = {
      firstLinkDate: "",
      graphBegin: "",
      textArea: "",
      orderedBy: "",
      linksDates: [],
      oneThree: true,
      fourTen: true,
      tenHundred: false
    }
    this.handleImageInputChange = this.handleImageInputChange.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.convertToSvg = this.convertToSvg.bind(this)
    this.convertToPng = this.convertToPng.bind(this)
    this.clearImageZone= this.clearImageZone.bind(this)
  }
  
  handleImageInputChange() {
    const preview = document.querySelector(".graph")
    const file = document.querySelector('input[type=file]').files[0]
    const reader = new FileReader()
  
    reader.addEventListener("load", () => {
      preview.src = reader.result
    }, false)
  
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  
  handleInput(e) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    
    if (name === "textArea") {
      const linksDates = []
      let linkDate = ""
      for (let character of value) {
        if (character === "\n") {
          linksDates.push(linkDate)
          linkDate = ""
        }
        else {
          linkDate += character
        }
      }
      const firstLinkDate = linksDates.length > 0 ? linksDates[linksDates.length -1] : ""
      this.setState({[name]: value, linksDates: linksDates, firstLinkDate: firstLinkDate})
    }
    else {
      this.setState({[name]: value})
    }
  }
  
  convertToSvg() {
    html2canvas(document.querySelector(".to-print")).then(canvas => {
      canvas.id = "test"
      document.body.appendChild(canvas)
    })
  }
  
  convertToPng() {
    const input = document.getElementById('test')
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const fakePath = document.querySelector(".rawGraphInput").value
        const title = "LB_period_" + fakePath.split("\\").pop() 
        const link = document.createElement("a")
        link.download = title
        link.href = imgData
        link.click()
      })
  }
  
  clearImageZone() {
    document.getElementById("test").remove()
  }
  
  render() {
    const firstLinkDate = this.state.firstLinkDate.length > 0 ?
          moment(this.state.firstLinkDate, 'DDMMYYYY') : ""
    const graphBeginDate = this.state.graphBegin.length > 0 ?
          moment(this.state.graphBegin, 'DDMMYYYY') : ""
    const today = moment()
    const daysSinceGraph = this.state.graphBegin.length > 0 ?
          today.diff(graphBeginDate, 'days') : ""
    const daysSinceFirstLink = this.state.firstLinkDate.length > 0 ?
          today.diff(firstLinkDate, 'days') : ""
    
    const percentage = ((daysSinceFirstLink/daysSinceGraph)*90)
    const impactTime = 42
    const lbActivePercentage = (((daysSinceFirstLink - impactTime)/daysSinceGraph)*90)
    const lbActiveWidth = lbActivePercentage + "%"
    const lbActiveLeft = (90 - lbActivePercentage + 2.5) +  "%"
    const left = 90 - percentage + 2.5// 2.5% on the left, 7.5% on the right
    
    const percentageS = percentage + "%"
    const leftS = left + "%"
    const orderedBy = daysSinceGraph > 400 ? "1M" : "2W"
    let styles = {}
    let links = ""
    
    if (this.state.linksDates.length > 0) {
      const linksOrdered = daysSinceGraph > 400 ? orderByMonth(this.state) : orderByTwoWeeks(this.state)
      links = getLinksStyling(linksOrdered, percentage)
        .filter(link => link.value > 0)
        .map(link => <Link props={link} key={link.key} className="link"/>)
    }
    if (document.querySelector('.graph')) {
        styles.lbPeriod = {
          height: "89.34%",
          left: leftS,
          top: "0px",
          width: percentageS
        }
        styles.lbActive = {
          height: "89.34%",
          left: lbActiveLeft,
          top: "0px",
          width: lbActiveWidth,
        }
    }

    return (
      <div className="App container-fluid">
        <div className="input-group row">
          <div className="col">
            <input
              type="file"
              name="rawGraphInput"
              className="rawGraphInput"
              accept="image/png, image/jpeg"
              onChange={this.handleImageInputChange}/>
            <input
              type="text"
              name="graphBegin"
              placeholder="Graph Begin Date"
              onChange={this.handleInput}/>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <textarea
              value={this.state.textArea}
              name="textArea"
              onChange={this.handleInput}/>
            <div><label>
              1-3:
              <input
                name="oneThree"
                type="checkbox"
                checked={this.state.oneThree}
                onChange={this.handleInput} />
            </label>
            <label>
              4-10:
              <input
                name="fourTen"
                type="checkbox"
                checked={this.state.fourTen}
                onChange={this.handleInput} />
            </label>
            <label>
              11-100:
              <input
                name="tenHundred"
                type="checkbox"
                checked={this.state.tenHundred}
                onChange={this.handleInput}/>
            </label></div>
          </div>
          
          <div className="col-10">
            <div className="to-print">
              <div className="image-div">
                <img 
                src=""
                className="graph img-fluid"/>
                {links}
                <div className="lb-period" style={styles.lbPeriod}></div>
                <div className="lb-active" style={styles.lbActive}></div>
              </div>
              <Legends
                oneThree={this.state.oneThree}
                fourTen={this.state.fourTen}
                tenHundred={this.state.tenHundred}
                orderedBy={orderedBy}/>
            </div>
          </div>
        </div>
        <button onClick={this.convertToSvg}>1. Convert the page to svg and append it</button>
        <button onClick={this.convertToPng}>2. Download the image to png</button>
        <button onClick={this.clearImageZone}>3. Clear the image</button>
      </div>
    );
  }
}

export default App;
