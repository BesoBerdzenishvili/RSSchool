import { useContext } from 'react';
import { FormDataContext } from '../../contexts/formDataContext';
import Card from '../Card/Card';
import './Cards.css';

export const Cards = () => {
  const { formData } = useContext(FormDataContext);

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
};
