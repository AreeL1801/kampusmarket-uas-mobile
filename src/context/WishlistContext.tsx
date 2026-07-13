import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { Product } from "../types";

type WishlistContextValue = {
  items: Product[];
  ids: Set<number>;
  toggle: (product: Product) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<Product[]>([]);

  const toggle = useCallback((product: Product) => {
    setItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }

      return [product, ...current];
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const ids = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  const value = useMemo(() => ({ items, ids, toggle, clear }), [items, ids, toggle, clear]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
