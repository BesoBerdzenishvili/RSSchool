import React from 'react';
import { FormData } from '../../types/FormData';
import './Card.css';

interface CardProps {
  data: FormData;
}

export class Card extends React.Component<CardProps> {
  render() {
    const { data } = this.props;
    const { img, price, priceType, description, date } = data;

    return (
      <div className="card">
        {img && typeof URL !== 'undefined' && URL.createObjectURL && (
          <img src={URL.createObjectURL(img)} alt="card image" width={300} />
        )}
        <div className="price">${price}</div> : <h4>POA</h4>
        {<div className="guide-price">{priceType}</div>}
        <div className="description">{description && description}</div>
        {date && <div className="date">Added on: {date}</div>}
      </div>
    );
  }
}
