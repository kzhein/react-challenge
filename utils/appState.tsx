import axios from 'axios';
import { createContext, useState } from 'react';
import { Card } from '../types';

export const AppStateContext = createContext<{
  cards: Card[];
  metaData: any;
  loadMoreCards: any;
  filters: any;
  changeFilter: any;
  searchCards: any;
}>({
  cards: [],
  metaData: null,
  loadMoreCards: null,
  filters: null,
  changeFilter: null,
  searchCards: null,
});

export function AppStateProvider({
  children,
  initialData,
}: {
  children: any;
  initialData: any;
}) {
  const {
    cardsData: { data, count, page, totalCount },
  } = initialData || { cardsData: {} };

  const [cards, setCards] = useState<Card[]>(data);
  const [metaData, setMetaData] = useState({
    count,
    page,
    totalCount,
  });
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    set: '',
    rarity: '',
  });

  // search for cards with the currently applied filters
  const searchCards = async () => {
    const url = `https://api.pokemontcg.io/v2/cards?pageSize=12&page=1&q=${
      filters.name ? `name:"${filters.name}" ` : ''
    }${filters.set ? `set.name:"${filters.set}" ` : ''}${
      filters.rarity ? `rarity:"${filters.rarity}" ` : ''
    }${filters.type ? `types:"${filters.type}"` : ''}`;

    const { data } = await axios.get(url);
    setCards(data.data);
    setMetaData({
      count: data.count,
      page: 1,
      totalCount: data.totalCount,
    });
  };

  // load 12 more cards that match the currently applied filters (name, type, rarity, set)
  const loadMoreCards = async () => {
    const url = `https://api.pokemontcg.io/v2/cards?pageSize=12&page=${
      metaData.page + 1
    }&q=${filters.name ? `name:"${filters.name}" ` : ''}${
      filters.set ? `set.name:"${filters.set}" ` : ''
    }${filters.rarity ? `rarity:"${filters.rarity}" ` : ''}${
      filters.type ? `types:"${filters.type}"` : ''
    }`;

    const { data } = await axios.get(url);

    setCards(prevCards => [...prevCards, ...data.data]);
    setMetaData(prevMeta => ({
      ...prevMeta,
      count: prevMeta.count + 12,
      page: prevMeta.page + 1,
      totalCount: data.totalCount,
    }));
  };

  const changeFilter = (filter: string, value: string) => {
    setFilters({ ...filters, [filter]: value });
  };

  return (
    <AppStateContext.Provider
      value={{
        cards,
        metaData,
        loadMoreCards,
        filters,
        changeFilter,
        searchCards,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
