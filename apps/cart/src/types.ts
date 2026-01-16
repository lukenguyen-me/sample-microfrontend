export interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartProps {
  title?: string;
  items?: CartItem[];
  isActive?: boolean;
  className?: string;
}
