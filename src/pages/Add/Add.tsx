import React from 'react';
import './Add.css';

type FormData = {
  id: string;
  img: File | undefined;
  price: number;
  priceType: string;
  showPrice: boolean;
  description: string;
  date: string;
  recieveEmails: string;
};

type Props = {
  formData: FormData[];
  setFormData: (data: FormData[]) => void;
};

type State = {
  errors: {
    price?: string;
    showPrice?: string;
    img?: string;
  };
};

class Add extends React.Component<Props, State> {
  private fileInput = React.createRef<HTMLInputElement>();
  private imgElement = React.createRef<HTMLImageElement>();
  private uploadButton = React.createRef<HTMLButtonElement>();
  private priceInput = React.createRef<HTMLInputElement>();
  private priceTypeInput = React.createRef<HTMLInputElement>();
  private showPriceInput = React.createRef<HTMLInputElement>();
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
    const priceType = this.priceTypeInput.current?.value || 'Guide Price';
    const showPrice = this.showPriceInput.current?.checked || false;
    const description = this.descriptionInput.current?.value || '';
    const date = this.dateInput.current?.value || '';
    const recieveEmails = this.recieveEmailsInput.current?.value || 'every week';

    let errors = {};

    if (price < 1000) {
      errors = { ...errors, price: 'Price must be at least a four-digit number' };
    }

    if (!showPrice) {
      errors = { ...errors, showPrice: 'Show Price must be selected' };
    }

    if (!img) {
      errors = { ...errors, img: 'Image must be uploaded' };
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const id = Math.random().toString(36).substr(2, 9);

    this.props.setFormData([
      ...this.props.formData,
      { id, img, price, priceType, showPrice, description, date, recieveEmails },
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
    if (this.priceTypeInput.current) {
      this.priceTypeInput.current.value = 'Guide Price';
    }
    if (this.showPriceInput.current) {
      this.showPriceInput.current.checked = false;
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
        <input type="file" ref={this.fileInput} style={{ display: 'none' }} />
        <button type="button" onClick={this.handleFileClick} ref={this.uploadButton}>
          Upload Image
        </button>
        <img ref={this.imgElement} />
        {this.state.errors.img && <div className="error">{this.state.errors.img}</div>}
        <br />
        <label>
          Price:
          <br />
          <input type="number" ref={this.priceInput} />
        </label>
        {this.state.errors.price && <div className="error">{this.state.errors.price}</div>}
        <br />
        <label>
          Price Type:
          <br />
          <div className="radio">
            <label>
              <input
                defaultChecked
                type="radio"
                value="Guide Price"
                name="priceType"
                ref={this.priceTypeInput}
              />
              Guide Price
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="Exact Price" name="priceType" ref={this.priceTypeInput} />
              Exact Price
            </label>
          </div>
        </label>
        <br />
        <label>
          Show Price:
          <br />
          <input type="checkbox" ref={this.showPriceInput} />
        </label>
        {this.state.errors.showPrice && <div className="error">{this.state.errors.showPrice}</div>}
        <br />
        <label>
          Description:
          <br />
          <textarea ref={this.descriptionInput} />
        </label>
        <br />
        <label>
          Date:
          <br />
          <input type="date" ref={this.dateInput} />
        </label>
        <br />
        <label>
          Recieve Emails:
          <br />
          <select ref={this.recieveEmailsInput} defaultValue={'every week'}>
            <option value="never">Never</option>
            <option value="every day">Every Day</option>
            <option value="every week">Every Week</option>
            <option value="every month">Every Month</option>
          </select>
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Add;
