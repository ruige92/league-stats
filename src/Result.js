import React from 'react';
import './Result.css';
import $ from 'jquery';

//Grabbing Champion JSON from riot ddragon
let allChamps = '';
let individual = '';
function getChampJSON(res){
  $.ajax({
    url: 'http://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/champion.json'
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
    url: 'http://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/summoner.json'
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
    url: 'http://ddragon.leagueoflegends.com/cdn/8.23.1/data/en_US/item.json'
  }).done(function(res){
    allItems = res;
    individualItem = Object.entries(allItems.data)
    console.log(allItems)
    console.log(individualItem[0])
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
    setTimeout(() => this.setState({ loading: false }), 1500);
    // this.setState({
    //   loading:false
    // })

  }

  componentDidUpdate(){
    //after rendered, use filter to remove empty slot items
    this.filterEmptyItemIcon2();
  }

  // grab champion icon data from ddragon when giving it an id
  champIcon=(id)=>{
    let champName = [];
    let champImgName =[];
    const champIcon = "http://ddragon.leagueoflegends.com/cdn/8.23.1/img/champion/";
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
    const spellIcon = "http://ddragon.leagueoflegends.com/cdn/8.23.1/img/spell/";
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
    const itemIcon = "http://ddragon.leagueoflegends.com/cdn/8.23.1/img/item/";
    for (let i = 0; i<individualItem.length;i++){
      if (id === undefined){
        continue;
      }
      if (individualItem[i][0] === id.toString()){
        itemName.push(individualItem[i][1].name);
        itemImgName.push(itemIcon+individualItem[i][1].image.full);
      }

    }
    if(!this.state.loading){this.filterEmptyItemIcon2()}
    return itemImgName = itemImgName.join("");
  }
  //
  filterEmptyItemIcon2=()=>{
    const imgs = $('.history-right img')
    // console.log(imgs);
    for (let i=0;i<imgs.length;i++){
      if(imgs[i].getAttribute('alt')==="0"){
        imgs[i].remove();
      }
      // $(".history-right > img:not(:contains(http))").remove();
      // $(".history-right img:not([src~='http://'])").remove();
    }
  }
  // Convert final match result into game term Victory or Defeat
  finalResult=(res)=>{
    if (res === "Win"){
      return "Victory";
    }else if(res === "Fail"){
      return "Defeat";
    }
  }

  // getMatchDetails=()=>{
  //   return this.props.matchDetails.map((i,key)=><p key={key}>{i.gameMode}</p>);
  // }

  render(){
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
        </div>
        <div id="match-wrapper">
          {this.props.matches.map((i,key)=>(
            <div className={`matchHistory ${i.finalResult}`} id={'match_'+i} key={key}>
              <div className="history-header">
                <p className="result">Season {i.season}</p>
                <p className="result">{i.lane}</p>
                <p className="result">{i.gameMode}</p>
                <p className="result"> {this.finalResult(i.finalResult)} </p>
              </div>
              <div className="history-left">
                <img src={this.champIcon(i.champion)} alt={i.champion}/>
                <div className="sumSpells">
                  <img src={this.spellIcon(i.spell1)} alt={i.spell1}/>
                  <img src={this.spellIcon(i.spell2)} alt={i.spell2}/>
                </div>
                <p className="champName">{this.champName(i.champion)}</p>
              </div>
              <div className="history-mid">
                <p className="kda">{i.kills}/<span className="red">{i.deaths}</span>/{i.assists}</p>
                <p>Level {i.champLevel}</p>
              </div>
              <div className="history-right">
                <img src={this.itemIcon(i.item0)} alt={i.item0} />
                <img src={this.itemIcon(i.item1)} alt={i.item1} />
                <img src={this.itemIcon(i.item2)} alt={i.item2} />
                <img src={this.itemIcon(i.item3)} alt={i.item3} />
                <img src={this.itemIcon(i.item4)} alt={i.item4} />
                <img src={this.itemIcon(i.item5)} alt={i.item5} />
                <img src={this.itemIcon(i.item6)} alt={i.item6} />
              </div>
              <div className="history-allPlayers">
                <div className="history-t1">
                  <img src={this.champIcon(i.t1Champ0)} alt={i.t1Champ0} />
                  <img src={this.champIcon(i.t1Champ1)} alt={i.t1Champ1} />
                  <img src={this.champIcon(i.t1Champ2)} alt={i.t1Champ2} />
                  <img src={this.champIcon(i.t1Champ3)} alt={i.t1Champ3} />
                  <img src={this.champIcon(i.t1Champ4)} alt={i.t1Champ4} />
                </div>
                <div>
                  <p className="t1-names">{i.t1Name0}</p>
                  <p className="t1-names">{i.t1Name1}</p>
                  <p className="t1-names">{i.t1Name2}</p>
                  <p className="t1-names">{i.t1Name3}</p>
                  <p className="t1-names">{i.t1Name4}</p>
                </div>
                <div className="history-t2">
                  <img src={this.champIcon(i.t2Champ0)} alt={i.t2Champ0} />
                  <img src={this.champIcon(i.t2Champ1)} alt={i.t2Champ1} />
                  <img src={this.champIcon(i.t2Champ2)} alt={i.t2Champ2} />
                  <img src={this.champIcon(i.t2Champ3)} alt={i.t2Champ3} />
                  <img src={this.champIcon(i.t2Champ4)} alt={i.t2Champ4} />
                </div>
                <div>
                  <p className="t2-names">{i.t2Name0}</p>
                  <p className="t2-names">{i.t2Name1}</p>
                  <p className="t2-names">{i.t2Name2}</p>
                  <p className="t2-names">{i.t2Name3}</p>
                  <p className="t2-names">{i.t2Name4}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
    }
  }
}
export default Result;
