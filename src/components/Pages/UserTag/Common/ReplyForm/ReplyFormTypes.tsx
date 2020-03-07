export interface IReplyForm {
  name: string;
  value: string;
  handleSubmit: () => void;
  isButtonDisable: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
