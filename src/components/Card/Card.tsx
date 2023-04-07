import { FormData } from '../../types/DataTypes';
import './Card.css';

interface CardProps {
  data: FormData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { img, price, priceType, description, date } = data;

  return (
    <div className="card">
      {img && typeof URL !== 'undefined' && URL.createObjectURL && (
        <img src={URL.createObjectURL(img[0])} alt="card image" width={300} />
      )}
      <div className="price">${price}</div>
      {<div className="guide-price">{priceType}</div>}
      <div className="description">{description && description}</div>
      {date && <div className="date">Added on: {date}</div>}
    </div>
  );
};
export default Card;
