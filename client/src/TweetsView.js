/* eslint-disable */
import React, {useState, useEffect, Fragment} from 'react';
import egg from './images/egg.png';
import './TweetsView.css';

function TweetsView() {
  const [apiResponse, setApiResponse] = useState("");
  const [allTweets, setAllTweets] = useState([]);
  const [filteredTweets, setFilteredTweets] = useState([]);
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
    );

  function getAllTweets() {
    fetch("http://localhost:3001/tweets/all")
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(res)
        setAllTweets(res.data)
    }); 
  }

  function searchTweets(input) {
      console.log(input)
    fetch(`http://localhost:3001/tweets/search?param=${input}`)
    .then(res => {
        console.log(res)
        return res.json();
    })
    .then(res => setAllTweets(res.data)); 
  }

  useEffect(() => {
      getAllTweets();
  }, [])

  function handleKeyDown(e, input) {
      console.log(e)
      console.log(input)
    if (e.key === 'Enter') {
        searchTweets(input);
    }
      
  }
  
  return (
    <div class= "tweet_newsfeed_container">
      <div class= "tweet_newsfeed_header">
        TweetPeeker
        <div class = "tweets_searchbar">
            <input class="search_input" onKeyDown={(e) => handleKeyDown(e, 'nasa')} type="text" placeholder="Search for tweets"/>
        </div>
     </div> 
    
      <div>
      {allTweets && allTweets.map(eachTweet => {
         
        return (
            <Fragment>
                <div class="icon" style={{marginLeft: 10 + 'px'}}>
                    <img src={eachTweet.user.profile_image_url} class="egg_img"/>
                </div>
                <div class="top_row" style={{marginTop: 10 + 'px'}}>
                    <h4>{eachTweet.user.name}</h4>
                    <h5 style={{marginTop: 2 + 'px'}}>@{eachTweet.user.screen_name} &nbsp; {eachTweet.created_at.slice(4,16)}</h5>
                </div>
                <div class="top_row" style={{marginLeft: 10 + 'px', marginTop: -5 + 'px'}}>{eachTweet.full_text}<hr/></div>
            </Fragment>
        )
        })}
        </div>
    </div>

  );
}

export default TweetsView;
