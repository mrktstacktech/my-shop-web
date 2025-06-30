interface TypoProps {
    children?: React.ReactNode;
    as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Typo({ as = 'p', children }: TypoProps) {
    const Component = as;
    return (
        <Component>{children}</Component>
    );
}