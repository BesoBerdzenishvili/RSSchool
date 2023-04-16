import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Card from '../Card/Card';
import './Cards.css';

export const Cards = () => {
  const cards = useSelector((state: RootState) => state.form);

  return (
    <div className="cards" data-testid="cards">
      {cards.length > 0 && cards.map((card) => <Card key={card.id} data={card} />)}
    </div>
  );
};
