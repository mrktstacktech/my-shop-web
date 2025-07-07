export type TooltipType = {
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}