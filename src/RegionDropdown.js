import React from 'react';

export const RegionDropdown=(props)=>(
  <select id="sumRegion" name={props.name} value={props.value} onChange={props.setRegion}>
    <option value="euw1">EU West</option>
    <option value="eun1">EU Nordic & East</option>
    <option value="na1">North America</option>
  </select>
)
