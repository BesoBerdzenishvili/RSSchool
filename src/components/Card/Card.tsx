import React from 'react';
import { FormData } from '../../types/FormData';
import './Card.css';

export class Card extends React.Component<FormData> {
  render() {
    const { img, price, showPrice, priceType, description, date } = this.props;

    return (
      <div className="card">
        <img src={img && URL.createObjectURL(img)} alt="card image" width={300} />
        {showPrice ? <div className="price">${price}</div> : <h3>POA</h3>}
        {<div className="guide-price">{priceType}</div>}
        <div className="description">{description && description}</div>
        {date && <div className="date">Added on: {date}</div>}
      </div>
    );
  }
}
