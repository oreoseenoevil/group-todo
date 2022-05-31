import { Button } from 'Components/Button';
import { InputField } from 'Components/InputField';
import { FC } from 'react';

interface FormProps {
  value?: string;
  onSubmit?: () => unknown;
  onChange?: (value: string) => unknown;
}

export const Form: FC<FormProps> = ({ onSubmit, onChange, value }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <InputField onChange={onChange} value={value} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
