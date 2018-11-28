export const fetchMatchDetails=(url, region, query, apiKey)=> {
  const endpoint="https://"+region+".api.riotgames.com/lol/match/v3/matches/"+query+"?api_key="+apiKey;
  if (url) {
    return fetch(endpoint)
      .then(response=> {
        if((response.status === 400) || (response.status === 404)){
          throw new Error('Error');
        }
        return response.json()
      }).then(result=> {
          return result;
      });
  }
}

export const fetchSummoner=(url, region, query, apiKey)=> {
  const endpoint="https://"+region+".api.riotgames.com/lol/summoner/v3/summoners/by-name/"+query+"?api_key="+apiKey;
  if (url) {
    return fetch(endpoint)
      .then(response=> {
        if((response.status === 400) || (response.status === 404)){
          throw new Error('Error');
        }
        return response.json()
      }).then(result=> {
          return result;
      });
  }
}

export const fetchMatch=(url, region, accountId, apiKey)=>{
  const endpoint="https://"+region+".api.riotgames.com/lol/match/v3/matchlists/by-account/"+accountId+"?api_key="+apiKey;
  if (url) {
    return fetch(endpoint)
      .then(response=> {
        if((response.status === 400) || (response.status === 404)){
          throw new Error('Error');
        }
        return response.json()
      }).then(result=> {
          return result;
      });
  }
}

//Capture returned result from JSON RiotAPI
