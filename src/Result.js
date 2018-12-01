import React from 'react';
import './Result.css';
import $ from 'jquery';

//Grabbing Champion JSON from riot ddragon
let allChamps = '';
let individual = '';
function getChampJSON(res){
  $.ajax({
    url: 'https://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/champion.json'
  }).done(function(res){
    allChamps = res;
    individual = Object.entries(allChamps.data)
  })
}

//Grabbing Summoner Spells JSON from riot ddragon
let allSums = '';
let individualSpell = '';
function getSpellJSON(res){
  $.ajax({
    url: 'https://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/summoner.json'
  }).done(function(res){
    allSums = res;
    individualSpell = Object.entries(allSums.data)
  })
}

//Grabbing Items JSON from riot ddragon
let allItems = '';
let individualItem = '';
function getItemJSON(res){
  $.ajax({
    url: 'https://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/item.json'
  }).done(function(res){
    allItems = res;
    individualItem = Object.entries(allItems.data)
    // console.log(allItems)
    // console.log(individualItem[0])
  })
}

//Call the above method as soon as possible.
$(function(){
  getChampJSON();
  getSpellJSON();
  getItemJSON();
})
// const xhReq = new XMLHttpRequest();
// xhReq.open("GET",'http://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/champion.json',false);
// xhReq.send(null)
// const allChamps = JSON.parse(xhReq.responseText);
// const individual = Object.entries(allChamps.data);

class Result extends React.Component{
  constructor(props){
    super(props)
    this.state=({
      loading:true
    })
  }

  componentDidMount(){
    //Give some time to render, so if its loading then not going to show the result page
    setTimeout(() => this.setState({ loading: false }), 500);
    // this.setState({
    //   loading:false
    // })
  }

  componentDidUpdate(){
    //after rendered, use filter to remove empty slot items
    // this.filterEmptyItemIcon2();
    this.resetNameFields();
    this.highlightCurrentPlayerName();
  }

  // grab champion icon data from ddragon when giving it an id
  champIcon=(id)=>{
    let champName = [];
    let champImgName =[];
    const champIcon = "https://ddragon.leagueoflegends.com/cdn/8.23.1/img/champion/";
    for (let i = 0; i<individual.length;i++){
      if (id === undefined){
        continue;
      }
      if (individual[i][1].key === id.toString()){
        champName.push(individual[i][1].name);
        champImgName.push(champIcon+individual[i][1].image.full);
      }
    }
    return champImgName = champImgName.join("");
  }
  // grab champion name when giving it an id
  champName=(name)=>{
    let champName = [];
    for (let i = 0; i<individual.length;i++){
      if (name === undefined){
        continue;
      }
      if (individual[i][1].key === name.toString()){
        champName.push(individual[i][1].name);
      }
    }
    return champName = champName.join("");
  }
  // grab summoner spell icon
  spellIcon=(id)=>{
    let spellName = [];
    let spellImgName =[];
    const spellIcon = "https://ddragon.leagueoflegends.com/cdn/8.23.1/img/spell/";
    for (let i = 0; i<individualSpell.length;i++){
      if (id === undefined){
        continue;
      }
      if (individualSpell[i][1].key === id.toString()){
        spellName.push(individualSpell[i][1].id);
        spellImgName.push(spellIcon+individualSpell[i][1].image.full);
      }
    }
    return spellImgName = spellImgName.join("");
  }
  // grab item icons
  itemIcon=(id)=>{
    let itemName = [];
    let itemImgName =[];
    const itemIcon = "https://ddragon.leagueoflegends.com/cdn/8.23.1/img/item/";
    for (let i = 0; i<individualItem.length;i++){
      if (id === undefined){
        continue;
      }
      if (individualItem[i][0] === id.toString()){
        itemName.push(individualItem[i][1].name);
        itemImgName.push(itemIcon+individualItem[i][1].image.full);
      }

    }
    // if(!this.state.loading){
    //   this.filterEmptyItemIcon2();
    //
    // }
    return itemImgName = itemImgName.join("");
  }
  //
  // filterEmptyItemIcon2=()=>{
  //   const imgs = $('.history-right img')
  //   // console.log(imgs);
  //   for (let i=0;i<imgs.length;i++){
  //     if((imgs[i].getAttribute('alt')==="0")||(imgs[i].getAttribute('alt')==="1018")||(imgs[i].getAttribute('alt')==="2301")){
  //       imgs[i].remove();
  //     }
  //   }
  // }

  resetNameFields=()=>{
    $('.t1-names').css({'font-weight':'400'});
    $('.t2-names').css({'font-weight':'400'});
  }
  highlightCurrentPlayerName=()=>{
    const name=$('#summonerInfo #name').text();
    $('.t1-names:contains('+name+')').css({'font-weight':'500'});
    $('.t2-names:contains('+name+')').css({'font-weight':'500'});
  }
  // Convert final match result into game term Victory or Defeat
  finalResult=(res)=>{
    if (res === "Win"){
      return "Victory";
    }else if(res === "Fail"){
      return "Defeat";
    }
  }

  tierBadge=(string)=>{
    if(string==="DIAMOND"){
      return './img/base-icons/diamond.png'
    }else if(string==="PLATINUM"){
      return './img/base-icons/platinum.png'
    }else if(string==="GOLD"){
      return './img/base-icons/gold.png'
    }else if(string==="SILVER"){
      return './img/base-icons/silver.png'
    }else if(string==="UNRANKED"){
      return './img/base-icons/provisional.png'
    }else if(string==="MASTER"){
      return './img/base-icons/master.png'
    }else if(string==="CHALLENGER"){
      return './img/base-icons/challenger.png'
    }else if(string==="BRONZE"){
      return './img/base-icons/bronze.png'
    }
  }

  rankType=(name)=>{
    if(name==="RANKED_SOLO_5x5"){
      return "Ranked Solo"
    }else if(name==="RANKED_FLEX_SR"){
      return "Flex 5:5 Rank"
    }else if(name==="RANKED_FLEX_TT"){
      return "Flex 3:3 Rank"
    }
  }

  queueType=(id)=>{
    if(id===450){
      return "ARAM"
    }else if(id===325){
      return "All Random"
    }else if(id===0){
      return "Custom Game"
    }else if(id===75){
      return "6:6 Hexakill"
    }else if(id===76){
      return "URF"
    }else if(id===420){
      return "Ranked Solo"
    }else if(id===430){
      return "Normal"
    }else if(id===440){
      return "Flex 5:5"
    }else if(id===460){
      return "Twisted Treeline"
    }else if(id===470){
      return "Flex 3:3"
    }else if(id===920){
      return "King Poro"
    }else if(id===400){
      return "Normal"
    }else if(id===850){
      return "Bot"
    }else if(id===700){
      return "Clash"
    }
  }

  // getMatchDetails=()=>{
  //   return this.props.matchDetails.map((i,key)=><p key={key}>{i.gameMode}</p>);
  // }
  sendSearchName=(name)=>{
    this.props.getSearchName(name);
  }

  gameTime=(time)=> {
    let minutes = Math.floor(time/60);
    let seconds = time-minutes*60;

    return minutes+"m "+seconds+"s";
  }

  calculateCs=(timeStamp, minions, jungle)=>{
    let totalCs = minions + jungle;
    let minutes = Math.floor(timeStamp/60000);
    let csPercent = totalCs/minutes;
    let roundedPercent = Math.round(csPercent*10)/10;
    return roundedPercent;
  }

  totalCs=(minion, jungle)=>{
    return minion+jungle;
  }

  timeDifference=(previous)=> {
    let current= new Date();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    let elapsed = current - previous;

   if (elapsed < msPerMinute) {
      let res = Math.round(elapsed/1000);
      if(res === 1){
        return Math.round(elapsed/1000) + ' second ago';
      }else{
        return Math.round(elapsed/1000) + ' seconds ago';
      }
    }

    else if (elapsed < msPerHour) {
      let res = Math.round(elapsed/msPerMinute);
      if(res === 1){
        return Math.round(elapsed/msPerMinute) + ' minute ago';
      }else{
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
      }
    }

    else if (elapsed < msPerDay ) {
      let res = Math.round(elapsed/msPerHour)
      if(res === 1){
        return Math.round(elapsed/msPerHour ) + ' hour ago';
      }else{
        return Math.round(elapsed/msPerHour ) + ' hours ago';
      }

    }

    else if (elapsed < msPerMonth) {
      let res = Math.round(elapsed/msPerDay)
      if (res === 1){
        return Math.round(elapsed/msPerDay) + ' day ago';
      }else{
        return Math.round(elapsed/msPerDay) + ' days ago';
      }

    }

    else if (elapsed < msPerYear) {
      let res = Math.round(elapsed/msPerMonth);
      if(res === 1){
        return Math.round(elapsed/msPerMonth) + ' month ago';
      }else{
        return Math.round(elapsed/msPerMonth) + ' months ago';
      }

    }

    else {
      let res = Math.round(elapsed/msPerYear );
      if(res === 1){
        return Math.round(elapsed/msPerYear ) + ' year ago';
      }else{
        return Math.round(elapsed/msPerYear ) + ' years ago';
      }

    }
  }

  calculateKDA=(kill, death, assist)=>{
    let kda = (kill+assist)/death;
    return Math.round(kda*10)/10;
  }

  fetchMoreGames=()=>{
    this.props.moreGames = true;
  }

  render(){
    const flex5Rank=(
      <div className="rankSlot">
        <div className="rankImg">
          <img src={this.tierBadge(this.props.flex5Tier)} alt={this.props.flex5Tier} />
        </div>
        <div className="rank-info">
          <p>{this.rankType(this.props.flex5RankType)}</p>
          <p className="tier">{this.props.flex5Tier} {this.props.flex5Rank}</p>
          <p>{this.props.flex5LeaguePoints} LP / {this.props.flex5Wins}W {this.props.flex5Losses}L</p>
          <p>{this.props.flex5LeagueName}</p>
        </div>
      </div>
    )

    const flex3Rank=(
      <div className="rankSlot">
        <div className="rankImg">
          <img src={this.tierBadge(this.props.flex3Tier)} alt={this.props.flex3Tier} />
        </div>
        <div className="rank-info">
          <p>{this.rankType(this.props.flex3RankType)}</p>
          <p className="tier">{this.props.flex3Tier} {this.props.flex3Rank}</p>
          <p>{this.props.flex3LeaguePoints} LP / {this.props.flex3Wins}W {this.props.flex3Losses}L</p>
          <p>{this.props.flex3LeagueName}</p>
        </div>
      </div>
    )

    const soloRank=(
      <div className="rankSlot">
        <div className="rankImg">
          <img src={this.tierBadge(this.props.soloTier)} alt={this.props.soloTier} />
        </div>
        <div className="rank-info">
          <p>{this.rankType(this.props.soloRankType)}</p>
          <p className="tier">{this.props.soloTier} {this.props.soloRank}</p>
          <p>{this.props.soloLeaguePoints} LP / {this.props.soloWins}W {this.props.soloLosses}L</p>
          <p>{this.props.soloLeagueName}</p>
        </div>
      </div>
    )

    const noRank=(
      <div className="rankSlot">
        <div className="noRankImg">
          <img src={this.tierBadge("UNRANKED")} alt="UNRANKED" />
        </div>
        <div className="rank-info">
          <p>Ranked Solo</p>
          <p className="tier">UNRANKED</p>
          <p>0 LP / 0W 0L</p>
        </div>
      </div>
    )

    const resultContent=(
      <div id="match-wrapper">
        {this.props.matches.map((i,key)=>(
          <div className={i.gameDuration<240 ? `badmatchHistory matchHistory ${i.finalResult}` : `matchHistory ${i.finalResult}`} id={'match_'+i} key={key}>
            <div className="history-header">
              <div className="history-header-left">
                <p className="result" id="queueType">{this.queueType(i.queueType)}</p>
                <div className="divideLine"></div>
                <p className="result" >{this.timeDifference(i.timeStamp)}</p>
                <div className="divideLine"></div>
                <p className="result" id="gameTime">{this.gameTime(i.gameDuration)}</p>
              </div>
              <div className="history-header-right">
                {i.gameDuration<240 ? <p className="result"> Remake </p> : <p className={`result ${ this.finalResult(i.finalResult) }`}> {this.finalResult(i.finalResult)} </p>}
              </div>
            </div>
            <div className="history-body">
            <div className="history-left">
              <div className="sumChamp">
                <img src={this.champIcon(i.champion)} alt={i.champion}/>
              </div>
              <div className="sumSpells">
                <div className="spellWrapper">
                <img src={this.spellIcon(i.spell1)} alt={i.spell1}/>
                </div>
                <div className="spellWrapper">
                <img src={this.spellIcon(i.spell2)} alt={i.spell2}/>
                </div>
              </div>

            </div>
            <div className="history-mid">
              <p className="champName">{this.champName(i.champion)}</p>
              <p className="kda">{i.kills}/<span className="red">{i.deaths}</span>/{i.assists}</p>
              <p className="csStat csNum">{this.calculateKDA(i.kills,i.deaths,i.assists)} KDA</p>
            </div>
            <div className="history-mid2">
              <p className="csStat">LV {i.champLevel}</p>
              <p className="csStat">{this.totalCs(i.endGameMinionKills,i.endGameJungleKills)} CS</p>
              <p className="csStat csNum"> {this.calculateCs(i.endGameTime, i.endGameMinionKills, i.endGameJungleKills)} CS/Minute </p>
            </div>
            <div className="history-right">
              {i.item0===0? null:<div className="itemWrapper"><img src={this.itemIcon(i.item0)} alt={i.item0} /></div>}

              {i.item1===0? null:<div className="itemWrapper"><img src={this.itemIcon(i.item1)} alt={i.item1} /></div>}

              {i.item2===0? null:<div className="itemWrapper"><img src={this.itemIcon(i.item2)} alt={i.item2} /></div>}

              {i.item3===0? null:<div className="itemWrapper"><img src={this.itemIcon(i.item3)} alt={i.item3} /></div>}

              {i.item4===0? null:<div className="itemWrapper"><img src={this.itemIcon(i.item4)} alt={i.item4} /></div>}

              {i.item5===0? null:<div className="itemWrapper"><img src={this.itemIcon(i.item5)} alt={i.item5} /></div>}

            </div>
            <div className="history-allPlayers">
              <div className="history">
                <img src={this.champIcon(i.t1Champ0)} alt={i.t1Champ0} />
                <img src={this.champIcon(i.t1Champ1)} alt={i.t1Champ1} />
                <img src={this.champIcon(i.t1Champ2)} alt={i.t1Champ2} />
                {i.t1Champ3===undefined? null:<img src={this.champIcon(i.t1Champ3)} alt={i.t1Champ3} /> }
                {i.t1Champ4===undefined? null:<img src={this.champIcon(i.t1Champ4)} alt={i.t1Champ4} /> }
              </div>
              <div className="history">
                <p className="t1-names" onClick={() => this.sendSearchName(i.t1Name0)}>{i.t1Name0}</p>
                <p className="t1-names" onClick={() => this.sendSearchName(i.t1Name1)}>{i.t1Name1}</p>
                <p className="t1-names" onClick={() => this.sendSearchName(i.t1Name2)}>{i.t1Name2}</p>
                {i.t1Name3===undefined? null:<p className="t1-names" onClick={() => this.sendSearchName(i.t1Name3)}>{i.t1Name3}</p>}
                {i.t1Name4===undefined? null:<p className="t1-names" onClick={() => this.sendSearchName(i.t1Name4)}>{i.t1Name4}</p>}
              </div>
              <div className="history">
                <img src={i.t2Champ0===undefined ? this.champIcon(i.tt2Champ0):this.champIcon(i.t2Champ0)} alt={i.t2Champ0===undefined ? i.tt2Champ0:i.t2Champ0} />
                <img src={i.t2Champ1===undefined ? this.champIcon(i.tt2Champ1):this.champIcon(i.t2Champ1)} alt={i.t2Champ1===undefined ? i.tt2Champ1:i.t2Champ1} />
                <img src={i.t2Champ2===undefined ? this.champIcon(i.tt2Champ2):this.champIcon(i.t2Champ2)} alt={i.t2Champ2===undefined ? i.tt2Champ2:i.t2Champ2} />
                {i.t2Champ3===undefined? null:<img src={this.champIcon(i.t2Champ3)} alt={i.t2Champ3} /> }
                {i.t2Champ4===undefined? null:<img src={this.champIcon(i.t2Champ4)} alt={i.t2Champ4} /> }
              </div>
              <div className="history">
                <p className="t2-names" onClick={() => i.t2Name0===undefined? this.sendSearchName(i.tt2Name0):this.sendSearchName(i.t2Name0)}>{i.t2Name0===undefined? i.tt2Name0:i.t2Name0}</p>
                <p className="t2-names" onClick={() => i.t2Name1===undefined? this.sendSearchName(i.tt2Name1):this.sendSearchName(i.t2Name1)}>{i.t2Name1===undefined? i.tt2Name1:i.t2Name1}</p>
                <p className="t2-names" onClick={() => i.t2Name2===undefined? this.sendSearchName(i.tt2Name2):this.sendSearchName(i.t2Name2)}>{i.t2Name2===undefined? i.tt2Name2:i.t2Name2}</p>
                {i.t2Name3===undefined? null:<p className="t2-names" onClick={() => this.sendSearchName(i.t2Name3)}>{i.t2Name3}</p>}
                {i.t2Name4===undefined? null:<p className="t2-names" onClick={() => this.sendSearchName(i.t2Name4)}>{i.t2Name4}</p>}
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    )

    // const loadMore=(
    //   <div className="moreData">
    //     <button onClick={this.fetchMoreGames()}>Load More</button>
    //   </div>
    // )

    if(this.state.loading){
      return null;
    }else{
    return(
      <div id="result-wrapper">
        <div id="result-header">
          <ul id="summonerInfo">
            <li id="name">{this.props.name}</li>
            <li id="icon"><img src={this.props.icon} alt={this.props.name}/></li>
            <li id="level">{this.props.level}</li>
          </ul>
            {this.props.soloRankFound? soloRank:noRank}
            {this.props.flex5RankFound? flex5Rank:null}
            {this.props.flex3RankFound? flex3Rank:null}
        </div>
        {this.props.moreGames ? null:resultContent}
        {this.props.moreGames ? resultContent:null}
      </div>
    )
    }
  }
}
export default Result;
