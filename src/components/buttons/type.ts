export type ButtonType = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    link?: string;
}