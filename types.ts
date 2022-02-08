export interface Set {
  id: string;
  name: string;
  total: number;
}

export interface Card {
  id: string;
  name: string;
  rarity: string;
  cardmarket: {
    prices: {
      averageSellPrice: number;
    };
  };
  set: Set;
  images: {
    small: string;
  };
}

export interface CartItem {
  card: Card;
  quantity: number;
}
