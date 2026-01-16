export interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  productId: number;
}

export interface CartProps {
  title?: string;
  items?: CartItem[];
  isActive?: boolean;
  className?: string;
}
