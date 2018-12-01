import React from 'react';
import './SearchBar.css';
import $ from 'jquery';
import Result from './Result';
import { fetchMatchDetails, fetchSummoner, fetchMatch , fetchRankDetail , fetchTimeLine } from './Fetcher.js';
import { animateScroll as scroll } from 'react-scroll';
import posed from 'react-pose';

const Appear = posed.div({
  hidden: {opacity:0},
  visible:{opacity: 1,
    translateY:'-105px',
    transition: {
      opacity: { ease: 'easeOut', duration: 300, delay:500 },
      default: { ease: 'linear', duration: 500 }
    }}
})

class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.state=({
      loaded:false,
      numOfSearch:3,
      originalNumOfSearch:3,
      firstSearch:true,
      apiKey:'RGAPI-1512919a-a67c-471f-af30-c8eb26922e4b',
      region:'',
      currentAccount:{
        sumId:'',
        id:'',
        name:'',
        level:'',
        icon:''
      },
      error:'',
      match:false,
      matches:[],
      gameType:[],
      soloRank:'',
      soloTier:'',
      soloLeagueName:'',
      soloLeaguePoints:'',
      soloWins:'',
      soloLosses:'',
      soloRankType:'',
      flex5Rank:'',
      flex5Tier:'',
      flex5LeagueName:'',
      flex5LeaguePoints:'',
      flex5Wins:'',
      flex5Losses:'',
      flex5RankType:'',
      flex3Rank:'',
      flex3Tier:'',
      flex3LeagueName:'',
      flex3LeaguePoints:'',
      flex3Wins:'',
      flex3Losses:'',
      flex3RankType:'',
      moreGames:false,
      searchIndex:0
    })
  }

  componentDidMount(){

  }

  componentWillUnmount() {

  }

  //Capture returned result from JSON RiotAPI
  // renderRawResponse=(res)=>{
  //   //
  //   if (res.hasOwnProperty('status')){
  //     this.setState({
  //       error:'Summoner Not Found, please try another name!',
  //       region:'',
  //       currentAccount:{
  //         id:'',
  //         name:'',
  //         level:'',
  //         icon:'',
  //       },
  //       match:false
  //     })
  //     return;
  //   }else{
  //     this.setState({
  //       error:'',
  //       currentAccount:{
  //         id:res['accountId'],
  //         name:res['name'],
  //         level:res['summonerLevel'],
  //         icon:"http://ddragon.leagueoflegends.com/cdn/8.23.1/img/profileicon/"+res['profileIconId']+".png"
  //       },
  //       match:true
  //     })
  //   }
  // }

  // renderMatch=(res)=>{
  //   let arr = [];
  //   for(let i=0;i<10;i++){
  //     arr.push(res['matches'][i]);
  //   }
  //   this.setState({
  //     matches:arr
  //   })
  //   // console.log(this.state.matches[0]);
  // }
  //
  // renderMatchDetails=(res)=>{
  //
  // }

  //Method of sending request to Riot API for Basic summoner match details
  // getSummoner=async()=>{
  //   const query = document.querySelector('#sumName').value;
  //   const region = document.querySelector('#sumRegion');
  //   const sumRegion = region.options[region.selectedIndex].value;
  //   this.setState({
  //     region:sumRegion
  //   })
  //   const endpoint="https://"+sumRegion+".api.riotgames.com/lol/summoner/v3/summoners/by-name/"+query+"?api_key="+this.state.apiKey;
  //   try{
  //     const response = await fetch(endpoint);
  //     if (response.ok || response.status===400 || response.status===404){
  //       const jsonResponse = await response.json();
  //       this.renderRawResponse(jsonResponse);
  //     }
  //     //
  //     //
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  navSearchBar=()=>{
      $('#SearchBar').fadeIn(1000);
      // $('#result-content').fadeIn(2000);
      $('#SearchBar').addClass('navSearch');
      this.setState({
        firstSearch:false,
      })
      if(!this.state.firstSearch){
        $('#SearchBar').fadeIn(1000);
        $('#result-content').fadeIn(500);
      }
  }

  newSearch=()=>{
    // if((this.state.match)){
    //   $('#result-wrapper').fadeOut(50);
    // }else{
    //   $('#SearchBar').fadeOut(50);
    // }
    this.setState({
      numOfSearch:this.state.originalNumOfSearch,
      searchIndex:0,
      moreGames:false
    })
    if(this.state.firstSearch){
      $('#SearchBar').fadeOut(50);
    }else{
      $('#SearchBar').fadeOut(50);
      $('#result-content').fadeOut(50);
    }
    // $('#SearchBar').addClass('navSearch');
    this.getSummoner();
  }

  getSearchName=(name)=>{
    document.querySelector('#sumName').value = name;
    $('#result-content').fadeOut(100);
    this.setState({
      numOfSearch:this.state.originalNumOfSearch,
      searchIndex:0,
      moreGames:false
    })
    this.getSummoner();
    // console.log(this.state.moreGames);
  }

  getSummoner=()=>{
    let results='';
    const query = document.querySelector('#sumName').value;
    const region = document.querySelector('#sumRegion');
    const sumRegion = region.options[region.selectedIndex].value;
    this.setState({
      region:sumRegion
    })
    results = fetchSummoner("test", sumRegion, query, this.state.apiKey);
    results.then(res=>{
      // console.log(res)
      this.setState({
        error:'',
        currentAccount:{
          sumId:res['id'],
          id:res['accountId'],
          name:res['name'],
          level:res['summonerLevel'],
          icon:"https://ddragon.leagueoflegends.com/cdn/8.23.1/img/profileicon/"+res['profileIconId']+".png"
        },
        match:true
      })
      // console.log(this.state.currentAccount);
      //Have to call this method during this promise
      this.getMatch();
      this.getRankDetail();

    }).catch(err=>{
      this.setState({
        error:'Summoner Not Found, please try another name!',
        match:false
      })
      $('#SearchBar').removeClass('navSearch');
      $('#SearchBar').fadeIn(100);
      $('#result-content').fadeIn(100);
    });
  }

  getRankDetail=()=>{
    const results = fetchRankDetail("test", this.state.region, this.state.currentAccount['sumId'], this.state.apiKey);
    results.then(res=>{
      // console.log(res)
      //Reset rank stats before fetching new ones
      if(res.length === 0){
        this.setState({
          soloRank:'',
          soloTier:'UNRANKED',
          soloLeagueName:'',
          soloLeaguePoints:0,
          soloWins:0,
          soloLosses:0,
          soloRankType:'',
          flex5Rank:'',
          flex5Tier:'',
          flex5LeagueName:'',
          flex5LeaguePoints:'',
          flex5Wins:'',
          flex5Losses:'',
          flex5RankType:'',
          flex3Rank:'',
          flex3Tier:'',
          flex3LeagueName:'',
          flex3LeaguePoints:'',
          flex3Wins:'',
          flex3Losses:'',
          flex3RankType:'',
          soloRankFound:false,
          flex5RankFound:false,
          flex3RankFound:false
        })
      }else{
        this.setState({
          soloRankFound:false,
          flex5RankFound:false,
          flex3RankFound:false
        })
      }
      //if any rank type found, then set soloRankFound state to true, so Result page can display it.
      // for(let i=0;i<res.length;i++){
      //   if(res[i]['queueType'].includes('RANKED_SOLO_5x5')){
      //     this.setState({
      //       soloRankFound:true
      //     })
      //   }else if(res[i]['queueType'].includes('RANKED_FLEX_SR')){
      //     this.setState({
      //       flex5RankFound:true
      //     })
      //   }else if(res[i]['queueType'].includes('RANKED_FLEX_TT')){
      //     this.setState({
      //       flex3RankFound:true
      //     })
      //   }
      // }
      //fetch all
      for(let i=0;i<res.length;i++){
        if(res[i]['queueType']==="RANKED_SOLO_5x5"){
          this.setState({
            soloRank:res[i]['rank'],
            soloTier:res[i]['tier'],
            soloLeagueName:res[i]['leagueName'],
            soloLeaguePoints:res[i]['leaguePoints'],
            soloWins:res[i]['wins'],
            soloLosses:res[i]['losses'],
            soloRankType:res[i]['queueType'],
            soloRankFound:true
          })
        }else if(res[i]['queueType']==="RANKED_FLEX_SR"){
          this.setState({
            flex5Rank:res[i]['rank'],
            flex5Tier:res[i]['tier'],
            flex5LeagueName:res[i]['leagueName'],
            flex5LeaguePoints:res[i]['leaguePoints'],
            flex5Wins:res[i]['wins'],
            flex5Losses:res[i]['losses'],
            flex5RankType:res[i]['queueType'],
            flex5RankFound:true
          })
        }else if(res[i]['queueType']==="RANKED_FLEX_TT"){
          this.setState({
            flex3Rank:res[i]['rank'],
            flex3Tier:res[i]['tier'],
            flex3LeagueName:res[i]['leagueName'],
            flex3LeaguePoints:res[i]['leaguePoints'],
            flex3Wins:res[i]['wins'],
            flex3Losses:res[i]['losses'],
            flex3RankType:res[i]['queueType'],
            flex3RankFound:true
          })
        }
      }

      // console.log(this.state.currentAccount);
      //Have to call this method during this promise
    }).catch(err=>{
      // console.log(err)
      this.setState({
        soloRank:'',
        soloTier:'UNRANKED',
        soloLeagueName:'',
        soloLeaguePoints:0,
        soloWins:0,
        soloLosses:0,
        soloRankType:''
      })
      $('#SearchBar').removeClass('navSearch');
      $('#SearchBar').fadeIn(100);
      $('#result-content').fadeIn(100);
    });
  }

  getMatch=()=>{
    // console.log('get match triggered!')
    const results = fetchMatch("test", this.state.region, this.state.currentAccount['id'], this.state.apiKey);
    results.then(res=>{
      // console.log(res);
      // console.log('before search:')
      // console.log('index: ' +this.state.searchIndex);
      // console.log('searchUntil: '+this.state.numOfSearch);

      if(res['matches'].length < this.state.numOfSearch){
        this.setState({
          numOfSearch:res['matches'].length
        })
      }
      // else{
      //   this.setState({
      //     numOfSearch:this.state.originalNumOfSearch
      //   })
      // }
      // console.log(this.state.numOfSearch);
      let arr= [];
      if(this.state.moreGames){
        arr = [...this.state.matches];
      }else{
        arr=[];
      }

      // let index = this.state.searchIndex;
      // console.log('about to push some game ids!')
      // console.log(this.state.searchIndex)
      // console.log(this.state.numOfSearch)
      for(let i = this.state.searchIndex;i<this.state.numOfSearch;i++){

        arr.push(res['matches'][i]);
        // console.log(arr)
      }
      // console.log('finished pushing gameids')
      this.setState({
        matches:arr
      })
      // console.log(this.state.matches)
      //Have to call method here;
      this.getMatchDetails3();
      this.getTimeline();
    }).catch(err=>{
      console.log(err)
      this.setState({
        error:'No recent data for this summoner',
        match:false
      })
      $('#SearchBar').removeClass('navSearch');
      $('#SearchBar').fadeIn(100);
      $('#result-content').fadeIn(100);
    });
  }

  getMatchDetails3=()=>{
    let gameIds = [];
    for(let i=0;i<this.state.matches.length;i++){
      gameIds.push(this.state.matches[i]['gameId']);
    }
    // if(this.state.searchIndex > 0){
    //   gameIds.pop();
    // }
    // console.log(gameIds);
    let results=[];
    //copy state of matches
    let matches2 = [...this.state.matches];
    for(let i = this.state.searchIndex; i<this.state.numOfSearch;i++){
      results = fetchMatchDetails("test", this.state.region, gameIds[i], this.state.apiKey)
      results.then(res=>{
        // console.log(res)
        if((res['gameMode']==="TUTORIAL_MODULE_3") || (res['gameMode']==="TUTORIAL_MODULE_2") || (res['gameMode']==="TUTORIAL_MODULE_1")){
          this.setState({
            error:'No recent data for this summoner',
            match:false
          })
          $('#SearchBar').removeClass('navSearch');
          $('#SearchBar').fadeIn(100);
          $('#result-content').fadeIn(100);
          return;
        }
        //add each gameMode into the matches state
        matches2[i].gameMode=res['gameMode'];
        matches2[i].queueType=res['queueId'];
        matches2[i].timeStamp=res['gameCreation'];
        matches2[i].gameDuration=res['gameDuration'];
        // console.log('playerId: '+this.state.currentAccount['id']);
        const playerId = this.state.currentAccount['id'];
        // console.log("id: "+playerId)
        //Logic for grabbing currentplayer's participant number fisrt
        //Then moving on to get it's team id
        //Then grabbing it's match result, win or lose.
        let currentParticipantNum;
        let currentTeamId;
        let matchResult;
        let kills;
        let assists;
        let deaths;
        let champLevel;
        let t1=[];
        let t2=[];
        let t1names=[];
        let t2names=[];
        let spell1;
        let spell2;
        let item0;
        let item1;
        let item2;
        let item3;
        let item4;
        let item5;
        let item6;

        //Search and grab additional information for all players
        for(let i = 0 ; i<res['participants'].length; i++){
          // console.log(i+':'+res['participantIdentities'][i]['player'])
          if(playerId === res['participantIdentities'][i]['player']['currentAccountId']){
            currentParticipantNum = res['participantIdentities'][i]['participantId'];
            spell1=res['participants'][i]['spell1Id'];
            spell2=res['participants'][i]['spell2Id'];
            item0=res['participants'][i]['stats']['item0'];
            item1=res['participants'][i]['stats']['item1'];
            item2=res['participants'][i]['stats']['item2'];
            item3=res['participants'][i]['stats']['item3'];
            item4=res['participants'][i]['stats']['item4'];
            item5=res['participants'][i]['stats']['item5'];
            item6=res['participants'][i]['stats']['item6'];

            // console.log(currentParticipantNum);
            // console.log(res['participants'][i]['stats']['item0'])
            if (currentParticipantNum === res['participants'][i]['participantId']){
              currentTeamId = res['participants'][i]['teamId'];
              kills = res['participants'][i]['stats']['kills'];
              assists = res['participants'][i]['stats']['assists'];
              deaths = res['participants'][i]['stats']['deaths'];
              champLevel = res['participants'][i]['stats']['champLevel'];
              // console.log(currentTeamId);
              // console.log("K/D/A: "+kills+"/"+deaths+"/"+assists)
            }
          }
          //Grabbing all players chosen champions
          if (res['participants'][i]['teamId'] === 100){
            t1[i] = (res['participants'][i]['championId']).toString();
            t1names[i] = res['participantIdentities'][i]['player']['summonerName'];
          }else {
            t2[i] = (res['participants'][i]['championId']).toString();
            t2names[i] = res['participantIdentities'][i]['player']['summonerName'];
            // console.log(i+': '+t2names[i]);
          }

        }

        //Search if player won the game or not
        for (let i = 0 ; i<res['teams'].length;i++){
          if(currentTeamId === res['teams'][i]['teamId']){
            matchResult = res['teams'][i]['win'];
            // console.log(matchResult);
          }
        }
        matches2[i].currentParticipantNum=currentParticipantNum;
        //For Twisted Treeline ONLY, where there's only 6 participants
        //Values for 6 players champion ids
        matches2[i].tt2Champ0=t2[5];
        matches2[i].tt2Champ1=t2[4];
        matches2[i].tt2Champ2=t2[3];
        //Values for 6 players player names
        matches2[i].tt2Name0=t2names[5];
        matches2[i].tt2Name1=t2names[4];
        matches2[i].tt2Name2=t2names[3];

        //Values for getting match items
        matches2[i].item0=item0;
        matches2[i].item1=item1;
        matches2[i].item2=item2;
        matches2[i].item3=item3;
        matches2[i].item4=item4;
        matches2[i].item5=item5;
        matches2[i].item6=item6;
        //Values for Normal 10 players champion ids
        matches2[i].t1Champ0=t1[0];
        matches2[i].t1Champ1=t1[1];
        matches2[i].t1Champ2=t1[2];
        matches2[i].t1Champ3=t1[3];
        matches2[i].t1Champ4=t1[4];
        matches2[i].t2Champ0=t2[5];
        matches2[i].t2Champ1=t2[6];
        matches2[i].t2Champ2=t2[7];
        matches2[i].t2Champ3=t2[8];
        matches2[i].t2Champ4=t2[9];
        //Values for Normal 10 players names
        matches2[i].t1Name0=t1names[0];
        matches2[i].t1Name1=t1names[1];
        matches2[i].t1Name2=t1names[2];
        matches2[i].t1Name3=t1names[3];
        matches2[i].t1Name4=t1names[4];
        matches2[i].t2Name0=t2names[5];
        matches2[i].t2Name1=t2names[6];
        matches2[i].t2Name2=t2names[7];
        matches2[i].t2Name3=t2names[8];
        matches2[i].t2Name4=t2names[9];

        //Values for currentplayer information, such as kda stats
        matches2[i].spell1=spell1;
        matches2[i].spell2=spell2;
        matches2[i].kills=kills;
        matches2[i].deaths=deaths;
        matches2[i].assists=assists;
        matches2[i].champLevel=champLevel;
        matches2[i].finalResult=matchResult;

        this.setState({
          matches:matches2
        })
        // console.log(this.state.matches[0].playerChampions)
        // console.log(Array.isArray(this.state.matches[0].playerChampions))
        // console.log(this.state.matches)
        // console.log(this.state.matches);
        this.navSearchBar();
        // console.log(this.state.matches[0]['gameId'])
        // console.log(this.state.matches[1]['gameId'])
        // console.log(this.state.region)

      }).catch(err=>{
        console.log(err)
        this.setState({
          error:'No recent data for this summoner',
          match:false
        })
        $('#SearchBar').removeClass('navSearch');
        $('#SearchBar').fadeIn(100);
        $('#result-content').fadeIn(100);
      });
    }
  }

  getTimeline=()=>{
    let matches2 = [...this.state.matches];
    // console.log(matches2);
    let results=[];
    for(let i = this.state.searchIndex; i<this.state.numOfSearch;i++){
      results[i] = fetchTimeLine("test", this.state.region, this.state.matches[i]['gameId'], this.state.apiKey)
      results[i].then(res=>{
        // console.log(res);

        const index = (res['frames'].length)-1;

        // console.log(res['frames'][index]['timestamp']);
        // console.log('partNum: '+this.state.matches[i]['currentParticipantNum']);
        // console.log(res['frames'][index]);
        // console.log(res['frames'][index]['participantFrames'][this.state.matches[i]['currentParticipantNum']]);
        // console.log(res['frames'][index]['participantFrames'][this.state.matches[i]['currentParticipantNum']]['minionsKilled']);
        // console.log(res['frames'][index]['participantFrames'][this.state.matches[i]['currentParticipantNum']]['jungleMinionsKilled']);

        matches2[i].endGameTime=res['frames'][index]['timestamp'];
        matches2[i].endGameMinionKills=res['frames'][index]['participantFrames'][matches2[i]['currentParticipantNum']]['minionsKilled'];
        matches2[i].endGameJungleKills=res['frames'][index]['participantFrames'][matches2[i]['currentParticipantNum']]['jungleMinionsKilled'];
        matches2[i].endGameGold=res['frames'][index]['participantFrames'][matches2[i]['currentParticipantNum']]['totalGold'];
        matches2[i].endGameXp=res['frames'][index]['participantFrames'][matches2[i]['currentParticipantNum']]['xp'];
        this.setState({
          matches:matches2
        })

      }).catch(err=>{
        console.log(err)
        this.setState({
          error:'No recent data for this summoner',
          match:false
        })
        $('#SearchBar').removeClass('navSearch');
        $('#SearchBar').fadeIn(100);
        $('#result-content').fadeIn(100);
      });
    }
    // this.setState({
    //   searchIndex:this.state.numOfSearch,
    //   numOfSearch:this.state.numOfSearch+this.state.numOfSearch
    // })
    // console.log('after search:')
    // console.log('index: ' +this.state.searchIndex);
    // console.log('searchUntil: '+this.state.numOfSearch);
  }

  //Method of sending request to Riot API for Overall Matches
  // getMatch=async()=>{
  //   const region = this.state.region;
  //   const endpoint="https://"+region+".api.riotgames.com/lol/match/v3/matchlists/by-account/"+this.state.currentAccount['id']+"?api_key="+this.state.apiKey;
  //   try{
  //     const response = await fetch(endpoint);
  //     if (response.ok || response.status===400 || response.status===404){
  //       const jsonResponse = await response.json();
  //       this.renderMatch(jsonResponse);
  //       // console.log(jsonResponse)
  //       fetchMatchDetails("test", this.state.region, this.state.matches[0]['gameId'], this.state.apiKey);
  //       // this.getMatchDetail();
  //     }
  //     //
  //     //
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  // //Method of sending request to Riot API for Detailed Match details
  // getMatchDetails2=()=>{
  //   const region = this.state.region;
  //   const query = this.state.matches[0]['gameId'];
  //   const endpoint="https://"+region+".api.riotgames.com/lol/match/v3/matches/"+query+"?api_key="+this.state.apiKey;
  //   $.ajax({
  //     url:endpoint
  //   }).done({function(res){
  //     console.log(res);
  //   }})
  // }
  //Method of sending request to Riot API for Detailed Match details
  //
  // getMatchDetail=async()=>{
  //   //grab all game ids first
  //   let gameIds = [];
  //   for(let i=0;i<this.state.matches.length;i++){
  //     gameIds.push(this.state.matches[i]['gameId']);
  //   }
  //   console.log(gameIds);
  //   const region = this.state.region;
  //   // const endpoint = "https://"+region+".api.riotgames.com/lol/match/v3/matches/"+query+"?api_key="+this.state.apiKey;
  //   // for(let i=0;i<10;i++){
  //   //   query.push("https://"+region+".api.riotgames.com/lol/match/v3/matches/"+this.state.matches[i]['gameId']+"?api_key="+this.state.apiKey)
  //   // }
  //   // console.log(query);
  //   // const query = this.state.matches[0]['gameId'];
  //   // const endpoint="https://"+region+".api.riotgames.com/lol/match/v3/matches/"+query+"?api_key="+this.state.apiKey;
  //   let endpoint='';
  //   let arr = [];
  //   for(let i=0;i<this.state.matches.length;i++){
  //     endpoint = "https://"+region+".api.riotgames.com/lol/match/v3/matches/"+gameIds[i]+"?api_key="+this.state.apiKey;
  //     try{
  //       const response = await fetch(endpoint);
  //       if (response.ok || response.status===400 || response.status===404){
  //         const jsonResponse = await response.json();
  //         arr.push(jsonResponse)
  //
  //       }
  //       this.setState({
  //         matchDetails:arr
  //       })
  //     }catch(error){
  //       console.log(error);
  //     }
  //   }
  //   console.log(this.state.matchDetails[0]);
  // }
  fetchMoreGames=()=>{
    this.setState({
      moreGames:true,
      searchIndex:this.state.numOfSearch,
      numOfSearch:this.state.numOfSearch+this.state.originalNumOfSearch
    })
    // console.log('after search:')
    // console.log('index: ' +this.state.searchIndex);
    // console.log('searchUntil: '+this.state.numOfSearch);
    this.getSummoner();
    scroll.scrollToBottom({
  duration: 1500,
  delay: 700});
  }

  setRegion=(event)=>{
    this.setState({
      region:event.target.value
    }, () => {
      // console.log(this.state.region)
    })
  }

  render(){
    const searchBar = (
      <div id="result-content">
      <div id="SearchBar">
        <p id="error">{this.state.error}</p>
        <select id="sumRegion" onChange={this.setRegion}>
          <option value="euw1">EU West</option>
          <option value="eun1">EU Nordic & East</option>
          <option value="na1">North America</option>
          <option value="br1">Brazil</option>
          <option value="jp1">Japan</option>
          <option value="kr">Korea</option>
          <option value="la1">Latin America North</option>
          <option value="la2">Latin America South</option>
          <option value="tr1">Turkey</option>
          <option value="oc1">Oceania</option>
          <option value="ru">Russia</option>
        </select>
        <input id="sumName" type="text" placeholder="Summoner Name"/>
        <button id="submit" onClick={this.newSearch}>Search</button>
      </div>
      {this.state.match? <div id="SearchResult" pose={this.state.match ? 'visible' : 'hidden'}>
        <Result
        name={this.state.currentAccount['name']}
        level={this.state.currentAccount['level']}
        icon={this.state.currentAccount['icon']}
        matches={this.state.matches}
        gameType={this.state.gameType}
        queueType={this.state.queueType}
        soloRank={this.state.soloRank}
        soloTier={this.state.soloTier}
        soloLeagueName={this.state.soloLeagueName}
        soloLeaguePoints={this.state.soloLeaguePoints}
        soloWins={this.state.soloWins}
        soloLosses={this.state.soloLosses}
        soloRankType={this.state.soloRankType}
        flex5Rank={this.state.flex5Rank}
        flex5Tier={this.state.flex5Tier}
        flex5LeagueName={this.state.flex5LeagueName}
        flex5LeaguePoints={this.state.flex5LeaguePoints}
        flex5Wins={this.state.flex5Wins}
        flex5Losses={this.state.flex5Losses}
        flex5RankType={this.state.flex5RankType}
        flex3Rank={this.state.flex3Rank}
        flex3Tier={this.state.flex3Tier}
        flex3LeagueName={this.state.flex3LeagueName}
        flex3LeaguePoints={this.state.flex3LeaguePoints}
        flex3Wins={this.state.flex3Wins}
        flex3Losses={this.state.flex3Losses}
        flex3RankType={this.state.flex3RankType}
        getSearchName={this.getSearchName}
        soloRankFound={this.state.soloRankFound}
        flex5RankFound={this.state.flex5RankFound}
        flex3RankFound={this.state.flex3RankFound}

        moreGames={this.state.moreGames}
        />
        <Appear id="fetchMore" onClick={this.fetchMoreGames} pose={this.state.firstSearch? 'hidden' : 'visible'}> more games</Appear>
      </div> :null}
      <div id="bottom" name="scroll-to-element"></div>
      </div>
    )

    // const resultPage = (
    //   <div id="wrapper">
    //   <Result
    //   name={this.state.currentAccount['name']}
    //   level={this.state.currentAccount['level']}
    //   icon={this.state.currentAccount['icon']}
    //   matches={this.state.matches}
    //   gameType={this.state.gameType}
    //   rank={this.state.rank}
    //   tier={this.state.tier}
    //   leagueName={this.state.leagueName}
    //   leaguePoints={this.state.leaguePoints}
    //   wins={this.state.wins}
    //   losses={this.state.losses}
    //   rankType={this.state.rankType}
    //   getSearchName={this.getSearchName}
    //   />
    //   {this.navSearchBar()}
    //   </div>
    // )


    return(
      <div id="main-wrapper">
        {searchBar}
      </div>
    )

  }
}


export default SearchBar;
