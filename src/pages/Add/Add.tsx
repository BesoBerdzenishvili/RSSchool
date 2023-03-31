import React from 'react';
import { FormDataContext } from '../../contexts/formDataContext';
import './Add.css';

type State = {
  errors: {
    price?: string;
    agreeTerms?: string;
    img?: string;
    description?: string;
    date?: string;
    priceType?: string;
    recieveEmails?: string;
  };
};

class Add extends React.Component {
  static contextType = FormDataContext;
  declare context: React.ContextType<typeof FormDataContext>;

  private fileInput = React.createRef<HTMLInputElement>();
  private imgElement = React.createRef<HTMLImageElement>();
  private uploadButton = React.createRef<HTMLButtonElement>();
  private priceInput = React.createRef<HTMLInputElement>();
  private priceTypeInput = React.createRef<HTMLInputElement>();
  private agreeTermsInput = React.createRef<HTMLInputElement>();
  private descriptionInput = React.createRef<HTMLTextAreaElement>();
  private dateInput = React.createRef<HTMLInputElement>();
  private recieveEmailsInput = React.createRef<HTMLSelectElement>();

  state: State = {
    errors: {},
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const img = this.fileInput.current?.files?.[0];
    const price = Number(this.priceInput.current?.value);
    const priceType = this.priceTypeInput.current?.checked ? this.priceTypeInput.current.value : '';
    const agreeTerms = this.agreeTermsInput.current?.checked || false;
    const description = this.descriptionInput.current?.value || '';
    const date = this.dateInput.current?.value || '';
    const recieveEmails = this.recieveEmailsInput.current?.value || '';

    let errors = {};

    if (price < 1000) {
      errors = { ...errors, price: 'Price must be at least a four-digit number' };
    }

    if (description.length < 10) {
      errors = { ...errors, description: 'Please provide detailed description' };
    }

    if (!img) {
      errors = { ...errors, img: 'Image must be uploaded' };
    }

    if (!date) {
      errors = { ...errors, date: 'Please provide date' };
    }

    if (!priceType) {
      errors = { ...errors, priceType: 'Please specify your price type' };
    }
    if (!recieveEmails) {
      errors = { ...errors, recieveEmails: 'Please choose one option' };
    }

    if (!agreeTerms) {
      errors = { ...errors, agreeTerms: 'You must agree to our terms of service' };
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    this.context.setFormData([
      ...this.context.formData,
      { id, img, price, priceType, agreeTerms, description, date, recieveEmails },
    ]);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors: {} });
      return;
    }

    alert('Data has been saved');

    if (this.fileInput.current) {
      this.fileInput.current.value = '';
      if (this.imgElement.current) {
        this.imgElement.current.src = '';
      }
      if (this.uploadButton.current) {
        this.uploadButton.current.style.display = 'inline-block';
      }
    }
    if (this.priceInput.current) {
      this.priceInput.current.value = '';
    }
    if (this.descriptionInput.current) {
      this.descriptionInput.current.value = '';
    }
    if (this.dateInput.current) {
      this.dateInput.current.value = '';
    }
    if (this.recieveEmailsInput.current) {
      this.recieveEmailsInput.current.value = '';
    }
    if (this.priceTypeInput.current) {
      this.priceTypeInput.current.value = '';
    }
    if (this.agreeTermsInput.current) {
      this.agreeTermsInput.current.checked = false;
    }
    this.setState({ errors: {} });
  };

  handleFileClick = () => {
    const fileInput = this.fileInput.current;
    if (fileInput) {
      fileInput.click();
      fileInput.onchange = () => {
        const file = fileInput.files?.[0];
        if (file && this.imgElement.current) {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imgElement.current!.src = reader.result as string;
            if (this.uploadButton.current) {
              this.uploadButton.current.style.display = 'none';
            }
          };
          reader.readAsDataURL(file);
        }
      };
    }
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <input
          type="file"
          accept="image/jpeg,image/png"
          ref={this.fileInput}
          style={{ display: 'none' }}
        />
        <button type="button" onClick={this.handleFileClick} ref={this.uploadButton}>
          Upload Image
        </button>
        <img ref={this.imgElement} className="upload-image" />
        {this.state.errors.img && <div className="error">{this.state.errors.img}</div>}
        <br />
        <label htmlFor="price" data-testid="price-label">
          Price:
          <br />
          <input
            name="price"
            id="price"
            type="number"
            ref={this.priceInput}
            data-testid="price-input"
          />
        </label>
        {this.state.errors.price && <div className="error">{this.state.errors.price}</div>}
        <br />
        <label>
          Price Type:
          <br />
          <div className="radio">
            <label>
              <input type="radio" value="Guide Price" name="price-type" ref={this.priceTypeInput} />
              Guide Price
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="Exact Price" name="price-type" ref={this.priceTypeInput} />
              Exact Price
            </label>
          </div>
        </label>
        {this.state.errors.priceType && <div className="error">{this.state.errors.priceType}</div>}
        <br />
        <label>
          Description:
          <br />
          <textarea ref={this.descriptionInput} />
        </label>
        {this.state.errors.description && (
          <div className="error">{this.state.errors.description}</div>
        )}
        <br />
        <label>
          Date:
          <br />
          <input type="date" ref={this.dateInput} />
        </label>
        {this.state.errors.date && <div className="error">{this.state.errors.date}</div>}
        <br />
        <label>
          Recieve Emails:
          <br />
          <select ref={this.recieveEmailsInput}>
            <option value="">Choose time</option>
            <option value="never">Never</option>
            <option value="every day">Every Day</option>
            <option value="every week">Every Week</option>
            <option value="every month">Every Month</option>
          </select>
        </label>
        {this.state.errors.recieveEmails && (
          <div className="error">{this.state.errors.recieveEmails}</div>
        )}
        <br />
        <label>
          I agree to terms of service
          <br />
          <input type="checkbox" ref={this.agreeTermsInput} />
        </label>
        {this.state.errors.agreeTerms && (
          <div className="error">{this.state.errors.agreeTerms}</div>
        )}

        <br />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    );
  }
}

export default Add;
