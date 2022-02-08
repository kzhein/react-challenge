import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Set } from '../types';
import { AppStateContext } from '../utils/appState';

const Filters = () => {
  const [types, setTypes] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [sets, setSets] = useState<Set[]>([]);

  const { filters, changeFilter } = useContext(AppStateContext);

  const handleFilterChange = (e: any) => {
    changeFilter(e.target.name, e.target.value);
  };

  useEffect(() => {
    // Fetch available filter types
    (async () => {
      const typesPromise = axios.get('https://api.pokemontcg.io/v2/types');
      const raritiesPromise = axios.get(
        'https://api.pokemontcg.io/v2/rarities'
      );
      const setsPromise = axios.get('https://api.pokemontcg.io/v2/sets');
      const [typesResponse, raritiesResponse, setsResponse] = await Promise.all(
        [typesPromise, raritiesPromise, setsPromise]
      );
      setTypes(typesResponse.data.data);
      setRarities(raritiesResponse.data.data);
      setSets(setsResponse.data.data);
    })();
  }, []);

  return (
    <div className='flex justify-center items-center py-4 px-2 flex-col md:flex-row'>
      <input
        type='text'
        name='name'
        placeholder='Name...'
        value={filters.name}
        onChange={handleFilterChange}
        className='bg-white w-44 h-9 py-1 px-4 mb-6 md:mb-0 border border-slate-300 rounded-xl md:rounded-r-none placeholder:text-slate-400'
      />
      <div className='flex justify-around w-full md:w-auto'>
        <select
          name='type'
          className='bg-white w-28 h-9 py-1 px-4 md:w-44 rounded-xl md:rounded-none border md:border-l-0 border-slate-300 text-slate-400'
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value=''>Type</option>
          {types.map(type => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          name='rarity'
          className='bg-white w-28 h-9 py-1 px-4 md:w-44 rounded-xl md:rounded-none border md:border-x-0 border-slate-300 text-slate-400'
          value={filters.rarity}
          onChange={handleFilterChange}
        >
          <option value=''>Rarity</option>
          {rarities.map(rarity => (
            <option value={rarity} key={rarity}>
              {rarity}
            </option>
          ))}
        </select>
        <select
          name='set'
          className='bg-white w-28 h-9 py-1 px-4 md:w-44 border border-slate-300 rounded-xl md:rounded-l-none text-slate-400'
          value={filters.set}
          onChange={handleFilterChange}
        >
          <option value=''>Set</option>
          {sets.map(set => (
            <option value={set.name} key={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
