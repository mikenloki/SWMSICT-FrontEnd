/*
 *
 * Results
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


   componentWillMount() {
     this.getSearchData();
   }

   getSearchData = () => {
     let data = new FormData();
     let _this = this;
     data.append('userID', 1);

     fetch ('http://localhost:8000/api/collectSearchData',{
       method: 'POST',
       body: data
     })
     .then(function(response){
       return response.json();
     })
     .then(function(json){
       console.log(json.searchData);
       _this.setState ({
         searchData:json.searchData
       }, function() {
         _this.getProducts(json.searchData);
       })
     }.bind(this))
   }


   getProducts = (searchData, type = 'name', order = 'desc') => {
     let data = new FormData();
     searchData = searchData[0];

      data.append('userID', searchData.userID);
      data.append('minInvestment', searchData.minInvestment);
      data.append('riskLevel', searchData.riskLevel);
      data.append('isStock', searchData.isStock);
      data.append('isBond', searchData.isBond);
      data.append('isMutualFund', searchData.isMutualFund);
      data.append('isETF', searchData.isETF);
      data.append('isIndexFund', searchData.isIndexFund);
      data.append('isRetirement', searchData.isRetirement);

      console.log(searchData);


     this.setState({
       displayOptions: []
     });

     fetch ('http://localhost:8000/api/getProducts?type='+type+'&order='+order,{
       method: 'POST',
       body: data
     })
     .then(function(response){
       return response.json();
     })
     .then(function(json){
       console.log(json.resultProducts);
       console.log(json.searchCriteria);
       this.parseResults(json.searchCriteria);
       this.setState({
         getProducts:json.resultProducts,
         message:json.message,
         messageNum:json.messageNum
       })
     }.bind(this))
   }

   parseResults = (data) => {

     let displayOptions = this.state.displayOptions;
     let minInvestment = '$' + data[1];
     let riskLevel = 'Aggressive';

     if (data.length > 0) {
       if (data[0] == 1) {
         riskLevel = 'Aggressive';
       }
       else if (data[0] == 2) {
         riskLevel = 'Moderate';
       }
       else if (data[0] == 3) {
         riskLevel:'Conservative';
       }
     }
     let temp = '';
     for (let x = 2; x < data.length; x++) {

         if (x < data.length - 1) {
             temp = data[x] + ', ';
         }
         else {
           temp = data[x];
         }

         displayOptions.push(temp);

         this.setState({
           displayRiskLevel:riskLevel,
           displayOptions:displayOptions,
           displayMinInvestment:minInvestment
         })
     }
   }


   sortResultsByKey = (array, key) => {
     return array.sort(function(a, b){
       let x = a[key];
       let y = b[key];
       return((x < y) ? -1 : 0);
     })
   }/*End Function*/

   renderResults = () => {
     if(this.state.messageNum !== ''){

       if(this.state.messageNum == 1){
         let options = <span>{this.state.displayOptions}</span>;
         return (
           <div>
             <div>
             Results: {this.state.getProducts.length}<br/><br/>
               You searched on: Risk level ({this.state.displayRiskLevel}), Minimum investment ({this.state.displayMinInvestment})
             </div>
             <div>
               Products: {options}<br/><br/>
             </div>
               {this.state.message}<br/><br/>
               {this.state.getProducts.map((product,index)=>(
                   <div>
                   <div><h3>{product.name}</h3></div>
                   <div><h4>{product.summary}</h4></div>
                   <span>Risk level: {product.riskLevel} </span><span>Minimum investment: ${product.minInvestment} </span><span>Type of investment: {product.isStock}</span>
                   <div><br/><br/></div>
                   </div>

               ))}
           </div>
         )
       }
       else if (this.state.messageNum == 0) {
         console.log(this.state.messageNum + 'hiya');
         return (
           <div>
           <div>
             You searched on: Risk level ({this.state.displayRiskLevel}), Minimum investment (${this.state.searchCriteria[1]})
           </div>
           <div>
             Products: {this.state.displayOptions}<br/><br/>
           </div>
             {this.state.message}
           </div>
         )
       }
       else {
         return "";
       }
     }
   }



  render() {
    return (
      <div className="container resultsContainer">
        <Helmet title="Home" meta={[ { name: 'description', content: 'Description of Home' }]}/>

        <header>
          <Navbar/>
        </header>

        <main>

          <h1 className="openingHeader">Results Page</h1>

          <div className="selectWrapper">
            <select Classname="select">
              <optgroup label="Sort by: Fees">
                <option value="value1" onClick={() => this.getProducts(this.state.searchData, 'fees', 'asc')}>Low to High</option>
                <option value="value2" onClick={() => this.getProducts(this.state.searchData, 'fees', 'desc')}>High to Low</option>
              </optgroup>

              <optgroup label="Sort by: Performance">
                <option value="value3" onClick={() => this.getProducts(this.state.searchData, 'performance', 'asc')}>Low to High</option>
                <option value="value4" onClick={() => this.getProducts(this.state.searchData, 'performance', 'desc')}>High to Low</option>
              </optgroup>
            </select>
          </div>

          {/*}<div className="mobileWrapper">
            <div className="choicesWrapper">
              <h2 className="choicesHeader1">Sort Data By:</h2>
              <h3 className="choicesHeader2"> Fees </h3>
              <h3 className="choicesHeader3"> Performance </h3>
              <div className="choicesWrapperSub1">
                <h3 className="choicesHeader4">Special Offers</h3>
                <h3 className="choicesHeader5">Physical Location</h3>
              </div>
            </div>{/*End className "choicesWrapper"*/}

            {/*}<div className="inputWrapper">

              <h3 className="inputHeader1"></h3>

              <h3 className="inputHeader2">
                <div className="content">
                  <input type="button" onClick={() => this.getProducts(this.state.searchData, 'name', 'desc')} />
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
            {/*}</div>{/*End className "inputWrapper"*/}
          {/*}</div> {/*End className "mobileWrapper"*/}

          <div className="resultsPage"><p>  Greetings! /* Currently a simple placeholder.*/</p>
            <div className="productSummary">
              This is where a Product Summary will be.
            </div>

            <div className="productSummary">
              This is where another Product Summary will be.
            </div>

            <div className="productSummary">
              This is where another Product Summary will be.



            {this.renderResults()}










            </div>

          </div>{/*End className "resultsPage"*/}

        </main>

      </div>
     );
   }
 }

 Results.contextTypes = {
   router: React.PropTypes.object
 };
