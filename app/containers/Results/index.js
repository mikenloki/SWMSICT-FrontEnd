/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Navbar from 'components/Navbar';
import './style.css';
import './styleM.css';

export default class Results extends React.PureComponent {
  constructor(){
    super();
    this.state={
      products:[]

    }
  }


  componentWillMount() {
  //  this.getNewsletters();
  }

  /*getNewsletters = () => {
    fetch('http://localhost:8000/api/getNewsletters', {
      method:'get'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      this.setState({
        newsletters:json.newsletters
      })
    }.bind(this))
  };*/

  getResults = () => {

  }/*End Function*/

  render() {
    return (
      <div className="container">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <header>
          <Navbar/>
        </header>

        <main>
          <h1 className="openingHeader">Results Page</h1>

        <div className="choicesWrapper">
          <h2 className="choicesHeader1">Sort Data By:</h2>
          <h2 className="choicesHeader2"> Fees </h2>
          <h2 className="choicesHeader3"> Performance </h2>
          <h2 className="choicesHeader4"> Hi-Lo  or  Lo-Hi </h2>
        </div>{/*End className "choicesWrapper"*/}

        <div className="inputWrapper">
          <h3 className="inputHeader1"></h3>
          <h3 className="inputHeader2"><div className="content">
                  <input type="checkBox" onChange={this.handlePassword}/>High-Low<p className="subScript">(Default: Low-High)</p>
                </div></h3>
          <h3 className="inputHeader3"><div className="content">
                  <input type="checkBox" onChange={this.handlePassword}/>High-Low<p className="subScript">(Default: Low-High)</p>
                </div></h3>
          <h3 className="inputHeader4"> Hi-Lo  or  Lo-Hi </h3>
        </div>{/*End className "choicesWrapper"*/}

          <div className="resultsPage">/* Currently a simple placeholder.*/
            <p>Greetings!</p>
            <div className="productSummary">
              This is where a Product Summary will be.
            </div>
            /*<div className="todoList">
            {this.state.products.map((product, index) => (
              <div className="listItem" key={index} >{product.name} {product.content}{product.fundPerformance}
              </div>
            ))}

          </div>*/
          </div>{/*End className "resultsPage"*/}



        </main>

        <footer></footer>
      </div>
    );
  }
}

Results.contextTypes = {
  router: React.PropTypes.object
};
