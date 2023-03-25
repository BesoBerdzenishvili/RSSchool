import * as React from 'react';
import { FormData } from '../types/FormData';

export type FormDataContextType = {
  formData: FormData[];
  setFormData: (data: FormData[]) => void;
};

export const FormDataContext = React.createContext<FormDataContextType>({
  formData: [],
  setFormData: () => {},
});

interface FormDataProviderProps {
  children: React.ReactNode;
}

export class FormDataProvider extends React.Component<FormDataProviderProps, FormDataContextType> {
  state: FormDataContextType = {
    formData: [],
    setFormData: (data: FormData[]) => {
      this.setState({ formData: data });
    },
  };

  render() {
    return (
      <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>
    );
  }
}
