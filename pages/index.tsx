import axios from 'axios';
import type { NextPage } from 'next';
import { useContext, useEffect, useRef } from 'react';
import Card from '../components/Card';
import Cart from '../components/Cart';
import Filters from '../components/Filters';
import Header from '../components/Header';
import { AppStateContext } from '../utils/appState';

const Home: NextPage = () => {
  const { cards, metaData, loadMoreCards, searchCards, filters } =
    useContext(AppStateContext);
  const { count, totalCount } = metaData;
  const firstUpdate = useRef(true);

  // search for cards if there is any change in filters (name, type, rarity, set)
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      timeout = setTimeout(searchCards, 500);
    }

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div>
      <Header />
      <div className='bg-slate-100 py-8'>
        <Filters />
        <div className='max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-24'>
          {cards.map(card => (
            <Card key={card.id} cardData={card} />
          ))}
        </div>
        {/* Show load more button if there is any left */}
        {count < totalCount && (
          <button
            type='button'
            className='mx-auto my-10 block text-slate-700'
            onClick={loadMoreCards}
          >
            <i className='fas fa-search mr-2'></i>Show More
          </button>
        )}
        <Cart />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  // render the first 12 cards on server side and pass it as props
  const { data } = await axios.get(
    'https://api.pokemontcg.io/v2/cards?pageSize=12&page=1'
  );

  return {
    props: {
      initialData: {
        cardsData: data,
      },
    },
  };
}

export default Home;
