import React from 'react';
import { FormDataContext } from '../../contexts/formDataContext';
import { Card } from '../Card/Card';
import './Cards.css';

export class Cards extends React.Component {
  static contextType = FormDataContext;
  declare context: React.ContextType<typeof FormDataContext>;
  render() {
    const { formData } = this.context;

    return (
      <div className="cards">
        {formData.length > 0 ? (
          formData.map((i) => <Card key={i.id} data={i} />)
        ) : (
          <p className="add-message">
            Please add data <a href="/add">here</a>
          </p>
        )}
      </div>
    );
  }
}
