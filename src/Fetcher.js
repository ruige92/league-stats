export const fetchMatchDetails=(url, region, query, apiKey)=> {
  const endpoint="https://"+region+".api.riotgames.com/lol/match/v4/matches/"+query+"?api_key="+apiKey;
  if (url) {
    return fetch(endpoint)
      .then(response=> {
        if(response.status === 200 && response.ok){
          return response.json();
        }else{
          throw new Error('fetchMatchDetails failed');
        }
      }).then(result=> {
          return result;
      }).catch(error => {
          console.log(error)
      });
  }
}

export const fetchSummoner=(url, region, query, apiKey)=> {
  const endpoint="https://"+region+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+query+"?api_key="+apiKey;
  if (url) {
    return fetch(endpoint)
      .then(response=> {
        if(response.status === 200 && response.ok){
          return response.json();
        }else{
          throw new Error('fetchSummoner failed');
        }
      }).then(result=> {
          return result;
      }).catch(error => {
          console.log(error)
      });
  }
}

export const fetchMatch=(url, region, accountId, apiKey)=>{
  const endpoint="https://"+region+".api.riotgames.com/lol/match/v4/matchlists/by-account/"+accountId+"?api_key="+apiKey;
  if (url) {
    return fetch(endpoint)
      .then(response=> {
        if(response.status === 200 && response.ok){
          return response.json();
        }else{
          throw new Error('fetchMatch failed');
        }
      }).then(result=> {
          return result;
      }).catch(error => {
          console.log(error)
      });
  }
}
export const fetchRankDetail=(url, region, sumId, apiKey)=>{
  const endpoint="https://"+region+".api.riotgames.com/lol/league/v4/positions/by-summoner/"+sumId+"?api_key="+apiKey;
  if (url) {
    return fetch(endpoint)
      .then(response=> {
        if(response.status === 200 && response.ok){
          return response.json();
        }else{
          throw new Error('fetchRankDetail failed');
        }
      }).then(result=> {
          return result;
      }).catch(error => {
          console.log(error)
      });
  }
}

//Capture returned result from JSON RiotAPI
