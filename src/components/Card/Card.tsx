import React from 'react';
import { FormData } from '../../types/FormData';
import './Card.css';

interface CardProps {
  data: FormData;
}

export class Card extends React.Component<CardProps> {
  render() {
    const { data } = this.props;
    const { img, price, showPrice, priceType, description, date } = data;

    return (
      <div className="card">
        <img src={img && URL.createObjectURL(img)} alt="card image" width={300} />
        {showPrice ? <div className="price">${price}</div> : <h4>POA</h4>}
        {<div className="guide-price">{priceType}</div>}
        <div className="description">{description && description}</div>
        {date && <div className="date">Added on: {date}</div>}
      </div>
    );
  }
}
