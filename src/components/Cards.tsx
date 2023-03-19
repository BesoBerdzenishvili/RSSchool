import React from 'react';
import { Card } from './Card';
import './Cards.css';

export class Cards extends React.Component {
  render() {
    return (
      <div className="cards">
        <Card
          imgUrl="https://c1.wallpaperflare.com/preview/259/612/50/small-wooden-house-tiny-house-architecture.jpg"
          price={44444}
          description="Wilton Mews, Belgravia, London, Sw1X"
          date="10/10/2023"
        />
        <Card
          imgUrl="https://c1.wallpaperflare.com/preview/259/612/50/small-wooden-house-tiny-house-architecture.jpg"
          price={44444}
          description="Wilton Mews, Belgravia, London, Sw1X"
          date="10/10/2023"
        />
        <Card
          imgUrl="https://c1.wallpaperflare.com/preview/259/612/50/small-wooden-house-tiny-house-architecture.jpg"
          price={44444}
          description="Wilton Mews, Belgravia, London, Sw1X"
          date="10/10/2023"
        />
        <Card
          imgUrl="https://c1.wallpaperflare.com/preview/259/612/50/small-wooden-house-tiny-house-architecture.jpg"
          price={44444}
          description="Wilton Mews, Belgravia, London, Sw1X"
          date="10/10/2023"
        />
      </div>
    );
  }
}
