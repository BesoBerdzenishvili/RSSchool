import React, { createContext, useState } from 'react';
import { FormData } from '../types/FormData';

type FormDataContextType = {
  formData: FormData[];
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>;
};

export const FormDataContext = createContext<FormDataContextType>({
  formData: [],
  setFormData: () => {},
});

export const FormDataProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [formData, setFormData] = useState<FormData[]>([]);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
