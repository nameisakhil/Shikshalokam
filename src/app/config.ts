export enum ActiveTab {
  employee = 'employee',
  company = 'company',
}

export enum Validations {
  isRequired = 'isRequired',
  pattern = 'pattern',
}

export enum Types {
  text = 'text',
  date = 'date',
  radio = 'radio',
  checkbox = 'checkbox',
  select = 'select',
}

export interface FormFieldEmployee {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  value: any;
  options: [Object];
}
