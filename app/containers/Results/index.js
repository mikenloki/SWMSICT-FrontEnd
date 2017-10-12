/*
 *
 * Results Page
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Navbar from 'components/Navbar';
import SignupBox from 'components/SignupBox';
import SignInBox from 'components/SignInBox';
import WouldYouLike from 'components/WouldYouLike';
import './style.css';
import './styleM.css';


export default class Results extends React.PureComponent {
  constructor(){
    super();
    this.state={
      products:[]
    }
  }

  getResults = () => {
    /* Not entirely sure that this is still needed.*/
  }/*End Function*/

  /*sortResultsByKey = (array, key) => {
    return array.sort(function(a, b){
      let x = a[key];
      let y = b[key];
      return((x < y) ? -1 : 0);
    })
  }*//*End Function*/


  render() {
    return (
      <div className="container resultsContainer">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <header>
          <Navbar/>
        </header>

        <main>

          <h1 className="openingHeader">Results Page</h1>

          <div className="mobileWrapper">
            <div className="choicesWrapper">
              <h2 className="choicesHeader1">Sort Data By:</h2>
              <h3 className="choicesHeader2"> Fees </h3>
              <h3 className="choicesHeader3"> Performance </h3>
              <div className="choicesWrapperSub1">
                <h3 className="choicesHeader4">Special Offers</h3>
                <h3 className="choicesHeader5">Physical Location</h3>
              </div>
            </div>{/*End className "choicesWrapper"*/}

            <div className="inputWrapper">

              <h3 className="inputHeader1"></h3>

              <h3 className="inputHeader2">
                <div className="content">
                  <input type="checkBox" onChange={this.handlePassword}/>High-Low
                  <input type="checkBox" onChange={this.handlePassword}/>Low-High
                </div>
              </h3>

              <h3 className="inputHeader3">
                <div className="content">
                  <input type="checkBox" onChange={this.handlePassword}/>High-Low
                  <input type="checkBox" onChange={this.handlePassword}/>Low-High
                </div>
              </h3>

              <div className="inputWrapperSub1">
                <h3 className="inputHeader4">
                  <div className="content">
                    <input type="checkBox" onChange={this.handlePassword}/>Yes
                  </div>
                </h3>

                <h3 className="inputHeader5">
                  <div className="content">
                    <input type="checkBox" onChange={this.handlePassword}/>Yes
                  </div>
                </h3>
              </div>{/*End className "inputWrapperSub1"*/}
            </div>{/*End className "inputWrapper"*/}
          </div> {/*End className "mobileWrapper"*/}

          <div className="resultsPage"><p>  Greetings! /* Currently a simple placeholder.*/</p>
            <div className="productSummary">
              This is where a Product Summary will be.
            </div>/*<div className="productSummary">
            {this.state.products.map((product, index) => (
              <div className="listItem" key={index} >{product.name} {product.content}{product.fundPerformance}
              </div>
            ))}

          </div>*/
          </div>{/*End className "resultsPage"*/}





        </main>


      </div>
    );
  }
}

Results.contextTypes = {
  router: React.PropTypes.object
};
