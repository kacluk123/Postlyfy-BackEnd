export interface StandardButton {
  isPending?: boolean;
  children: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
}
