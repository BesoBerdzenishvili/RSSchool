import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../../types/FormData';
import { FormDataContext } from '../../contexts/formDataContext';
import './Add.css';

const Add = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const { formData, setFormData } = useContext(FormDataContext);
  const watchedImg = watch('img') as File[] | undefined;

  useEffect(() => {
    if (watchedImg && watchedImg.length > 0) {
      setSelectedFile(watchedImg[0]);
    }
  }, [watchedImg]);

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    data.id = Math.random().toString(36).substr(2, 9);
    setFormData([...formData, data]);
    if (Object.keys(errors).length === 0) {
      navigate('/');
    }
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
      <br />
      <label htmlFor="price">Price:</label>
      <input type="number" {...register('price', { required: true, min: 1000 })} />
      {errors.price && <p className="error">Price must be greater than or equal to 1000</p>}
      <br />
      <label htmlFor="priceType">Price Type:</label>
      <input
        className="radio"
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
      {errors.priceType && <p className="error">Price Type is required</p>}
      <label htmlFor="description">Description:</label>
      <textarea {...register('description', { required: true, minLength: 10 })} />
      {errors.description && (
        <p className="error">Description must be at least 10 characters long</p>
      )}
      <br />
      <label htmlFor="date">Date:</label>
      <input type="date" {...register('date', { required: true })} />
      {errors.date && <p className="error">Date is required</p>}
      <label htmlFor="recieveEmails">Recieve Emails:</label>
      <select {...register('recieveEmails', { required: true })}>
        <option value="">Choose option</option>
        <option value="never">Never</option>
        <option value="every day">Every day</option>
        <option value="every week">Every week</option>
        <option value="every month">Every month</option>
      </select>
      {errors.recieveEmails && <p className="error">Recieve Emails is required</p>}
      <br />
      <label htmlFor="agreeTerms">
        I agree to terms of service
        <br />
        <input type="checkbox" {...register('agreeTerms', { required: true })} />
      </label>
      {errors.agreeTerms && <p className="error">You must agree to the terms of service</p>}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Add;
