import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";

type Props = {
  productId: string;
};

const ChangeQtyButton = ({ productId }: Props) => {
  const { getProductById, incQty, decQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      incQty: state.incQty,
      decQty: state.decQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );

    return unSub;
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button onClick={() => decQty(product.id)}>
            <Minus />
          </Button>
          <p>{product.qty}</p>
          <Button onClick={() => incQty(product.id)}>
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
};

export default ChangeQtyButton;
