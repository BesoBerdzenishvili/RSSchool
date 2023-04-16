import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCard } from '../../../redux/formApi';
import { FormData } from '../../../types/DataTypes';
import './Add.css';

const Add = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const watchedImg = watch('img') as File[] | undefined;

  useEffect(() => {
    if (watchedImg && watchedImg.length > 0) {
      setSelectedFile(watchedImg && watchedImg[0]);
    }
  }, [watchedImg]);

  const onSubmit = (data: FormData) => {
    setTimeout(() => reset(), 1500);
    data.id = Math.random().toString(36).substr(2, 9);
    dispatch(addCard(data));
    alert('Success!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-form">
      <label htmlFor="img">Image:</label>
      <input
        id="img"
        className="upload-image"
        type="file"
        accept="image/*"
        {...register('img', { required: true })}
      />
      <label htmlFor="img" className="upload-image-label">
        {selectedFile ? selectedFile.name : 'Choose File'}
      </label>
      {errors.img && <p className="error">Image is required</p>}
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" {...register('price', { required: true, min: 1000 })} />
      {errors.price && <p className="error">Price must be greater than or equal to 1000</p>}
      <label htmlFor="priceType">Price Type:</label>
      <div className="price-type">
        <input
          className="radio"
          id="priceType"
          type="radio"
          value="Guide Price"
          {...register('priceType', { required: true })}
        />
        Guide Price
        <input
          className="radio"
          type="radio"
          value="Exact Price"
          {...register('priceType', { required: true })}
        />
        Exact Price
      </div>
      {errors.priceType && <p className="error">Price Type is required</p>}
      <label htmlFor="description">Description:</label>
      <textarea id="description" {...register('description', { required: true, minLength: 10 })} />
      {errors.description && (
        <p className="error">Description must be at least 10 characters long</p>
      )}
      <label htmlFor="date">Date:</label>
      <input id="date" type="date" {...register('date', { required: true })} />
      {errors.date && <p className="error">Date is required</p>}
      <label htmlFor="recieveEmails">Recieve Emails:</label>
      <select id="recieveEmails" {...register('recieveEmails', { required: true })}>
        <option value="">Choose option</option>
        <option value="never">Never</option>
        <option value="every day">Every day</option>
        <option value="every week">Every week</option>
        <option value="every month">Every month</option>
      </select>
      {errors.recieveEmails && <p className="error">Recieve Emails is required</p>}
      <label htmlFor="agreeTerms">I agree to terms of service</label>
      <input id="agreeTerms" type="checkbox" {...register('agreeTerms', { required: true })} />
      {errors.agreeTerms && <p className="error">You must agree to the terms of service</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Add;
