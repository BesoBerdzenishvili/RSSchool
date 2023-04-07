export type FormData = {
  id: string;
  img: FileList | undefined;
  price: number;
  priceType: string;
  agreeTerms: boolean;
  description: string;
  date: string;
  recieveEmails: string;
};

export type CharacterCardData = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
