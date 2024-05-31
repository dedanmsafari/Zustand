import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { PRODUCTS_DATA } from "./lib/mockData";

import { useStore } from "./store/store";
import ChangeQtyButton from "./components/ui/ChangeQtyButtons";
import Cart from "./components/Cart";
import User from "./components/User";

export default function App() {
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  return (
    <main className="space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
      <div className="flex justify-between">
        <User />
        <Cart />
      </div>
      <h1 className="text-2xl">Products:</h1>
      <div className="space-y-3">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardFooter>
              {cartProducts.find(
                (cartProduct) => cartProduct.id === product.id
              ) ? (
                <ChangeQtyButton productId={product.id} />
              ) : (
                <Button variant="default" onClick={() => addProduct(product)}>
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

// import { create } from "zustand";

// import { Button } from "@/components/ui/button";

// const useCountStore = create<{
//   count: number;
//   inc: () => void;
//   dec: () => void;
//   reset: () => void;
// }>()((set) => ({
//   count: 5,
//   inc: () => set((state) => ({ count: state.count + 1 })),
//   dec: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
// }));

// function App() {
//   const increment = useCountStore((state) => state.inc);
//   const decrement = useCountStore((state) => state.dec);
//   const reset = useCountStore((state) => state.reset);
//   return (
//     <div>
//       <Button onClick={decrement}>Decrement</Button>
//       <Count />
//       <Button onClick={increment}>Increment</Button>
//       <br />
//       <br />
//       <Button onClick={reset}>Reset</Button>
//     </div>
//   );
// }

// export default App;

// const Count = () => {
//   const count = useCountStore((state) => state.count);
//   return <>{count}</>;
// };
