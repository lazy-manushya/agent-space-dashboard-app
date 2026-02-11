export interface IModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
