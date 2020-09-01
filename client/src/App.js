import React, {useState} from 'react';
import TweetsView from './TweetsView';
import twitter_bird from './images/twitter.png';
import './App.css';

// TODO
// 1. add search bar in TweetsView
// 2. Add top nav bar and search bar in App.js
// 3. Add hardcoded left bar in App.js
// 4. Hook up tweet search with backend
// 5. Hook up user search with backend

function App() {
  const [apiResponse, setApiResponse] = useState("");
  
  function callAPI() {
    fetch("http://localhost:3001/tweets")
        .then(res => res.text())
        .then(res => setApiResponse(res));
  }
  
  return (
    <view style={{flex: 1}}>
      <div class="header_full">
        <div class="header_container">
          <div class= "header_left">
            <ul class="navigation_left">
              <li><i class="fa fa-home"></i>  Home</li>
            </ul>
          </div>  

          <img src={twitter_bird} class="twitter_logo"/>

          <div class= "header_right">
            <form class="header_search" action="/search">
              <input class="search_input" type="text" placeholder="Search for users"/>
              <button type="submit" id="Submit"> <i class="fa fa-search"></i> </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="App">
        <header className="App-header">
          <TweetsView></TweetsView>
        </header>
      </div>
    </view>
  );
}

export default App;
