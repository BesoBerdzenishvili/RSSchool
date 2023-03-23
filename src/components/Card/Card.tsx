import React from 'react';
import './Card.css';

interface CardProps {
  imgUrl: string;
  price?: number;
  description: string;
  date: string;
}

export class Card extends React.Component<CardProps> {
  render() {
    const { imgUrl, price, description, date } = this.props;

    return (
      <div className="card">
        <img src={imgUrl} alt="card image" width={300} />
        {price ? <div className="price">${price}</div> : <h3>POA</h3>}
        {price && <div className="guide-price">Guide Price</div>}
        <div className="description">{description}</div>
        <div className="date">Added on: {date}</div>
      </div>
    );
  }
}
