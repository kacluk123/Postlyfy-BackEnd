export interface StandardInputProps {
    value: string
    label: string
    name: string
    type?: 'password' | 'text' | 'number'
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    errorMessage?: string;
    isValid?: boolean;
}