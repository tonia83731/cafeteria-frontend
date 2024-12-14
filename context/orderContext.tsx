import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  ChangeEvent,
} from "react";
// import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { clientFetch } from "@/lib/fetch";
import { toast } from "react-toastify";
import {
  DefaultCustomProps,
  OptionType,
  SizeCustomProps,
} from "@/types/default";
import { CartItemProps, ShippingProps } from "@/types/cart-type";
import { useAuthContext } from "./authContext";

// type CurrEditType = {
//   cartItemId: number | null;
//   quantity: number;
//   sizeId: number | null;
//   sugarId: number | null;
//   iceId: number | null;
// };

interface OrderState {
  cartProducts: CartItemProps[];
  priceData: {
    productPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
  };
  customData: {
    sizes: SizeCustomProps[];
    sugars: DefaultCustomProps[];
    ices: DefaultCustomProps[];
  };
  shippingMethod: OptionType | null;
  paymentMethod: OptionType | null;
  dropdownToggle: {
    shipping: boolean;
    payment: boolean;
  };
  orderForm: {
    discountId: number | null;
    discount: string;
    name: string;
    phone: string;
    // email: string;
    address: string;
  };
  cardForm: {
    cardName: string;
    cardNumber: string;
    cardDate: string;
    cardCVC: string;
  };
  syncChecked: boolean;
  steps: number;
  selectShippingMethod: (
    option: OptionType,
    shippings: ShippingProps[]
  ) => void;
  selectPaymentMethod: (option: OptionType) => void;
  setCartProducts: (items: CartItemProps[]) => void;
  handleProductPrice: (total: number) => void;
  handleDropdownToggle: (type: "shipping" | "payment") => void;
  handleProductDelete: (cartItemId: number) => void;
  handleProductEdit: (cartItemId: number, body: any) => void;
  handleOrderFormInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSyncChecked: () => void;
  handleCardFormInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleControlSteps: (type: "prev" | "next") => void;
  step_disabled_condition: boolean;
  handleCouponAdd: () => void;
  handleCouponClear: () => void;
  couponAvailabled: boolean | null;
  handleOrderSubmit: () => void;
}

export const OrderContext = createContext<OrderState | null>(null);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const token = getCookie("authToken");
  const t = useTranslations("Cart");
  const { userProfile } = useAuthContext();
  const [cartProducts, setCartProducts] = useState<CartItemProps[]>([]);

  const [priceData, setPriceData] = useState({
    productPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  });

  const [customData, setCustomData] = useState({
    sizes: [],
    ices: [],
    sugars: [],
  });

  const [dropdownToggle, setDropdownToggle] = useState({
    shipping: false,
    payment: false,
  });
  const [shippingMethod, setShippingMethod] = useState<OptionType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<OptionType | null>(null);

  const [orderForm, setOrderForm] = useState({
    discountId: null,
    discount: "",
    name: "",
    phone: "",
    // email: "",
    address: "",
  });
  const [cardForm, setCardForm] = useState({
    cardName: "",
    cardNumber: "",
    cardDate: "",
    cardCVC: "",
  });
  const [syncChecked, setSyncChecked] = useState(false);
  const [steps, setSteps] = useState(0);
  const [couponAvailabled, setCouponAvailable] = useState<boolean | null>(null);
  // const [stepDisabled, setStepDisabled] = useState(true)
  const step_disabled_condition =
    (steps === 0 && !shippingMethod && !paymentMethod) ||
    (steps === 1 &&
      !orderForm.name &&
      !orderForm.address &&
      // !orderForm.email &&
      !orderForm.phone);

  const handleProductPrice = (total: number) => {
    setPriceData((prev) => ({ ...prev, productPrice: total }));
  };

  const selectShippingMethod = (
    option: OptionType,
    shippings: ShippingProps[]
  ) => {
    if (!option) return;
    setShippingMethod(option);
    const shipping_data = shippings.find((item) => item.id === option.value);
    if (shipping_data) {
      const price = shipping_data.price;
      setPriceData((prev) => ({ ...prev, shippingPrice: price }));
    }
  };

  const selectPaymentMethod = (option: OptionType) => {
    setPaymentMethod(option);
  };

  const handleDropdownToggle = (type: "shipping" | "payment") => {
    setDropdownToggle((prev) => ({
      ...prev,
      [type]: !prev[type],
      [type === "shipping" ? "payment" : "shipping"]: false,
    }));
  };

  const handleProductDelete = async (cartItemId: number) => {
    try {
      const response = await clientFetch(`/carts/${cartItemId}`, {
        method: "DELETE",
        token,
      });

      if (response.success) {
        const updated_cart_items = cartProducts.filter(
          (item) => item.id !== cartItemId
        );
        const total = updated_cart_items.reduce(
          (acc, curr) => acc + curr.total,
          0
        );
        setCartProducts(updated_cart_items);
        handleProductPrice(total);
        toast.error(t("message.delete-success"));
      } else {
        toast.error(t("message.delete-error"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductEdit = async (cartItemId: number, body: any) => {
    try {
      const response = await clientFetch(`/carts/${cartItemId}`, {
        method: "PUT",
        token,
        body,
      });
      if (response.success) {
        console.log(response.data);
        const update_products = cartProducts.map((item) => {
          return item.id === cartItemId ? response.data : item;
        });
        setCartProducts(update_products);
        toast.success(t("message.edit-success"));
      } else {
        toast.error(t("message.edit-error"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "discount") {
      setCouponAvailable(null);
    }

    setOrderForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSyncChecked = () => {
    setSyncChecked(!syncChecked);
    if (!syncChecked) {
      if (userProfile) {
        setOrderForm((prev) => ({
          ...prev,
          name: userProfile.name || "",
          phone: userProfile.phone || "",
          // email: userProfile.email || "",
          address: userProfile.address || "",
        }));
      }
    } else {
      setOrderForm((prev) => ({
        ...prev,
        name: "",
        phone: "",
        email: "",
        address: "",
      }));
    }
  };

  const handleCardFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "cardNumber") {
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    if (name === "cardDate") {
      value = value.replace(/(\d{2})(?=\d)/g, "$1/").slice(0, 5);
    }

    setCardForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleControlSteps = (type: "prev" | "next") => {
    if (type === "prev") {
      setSteps(steps - 1);
    } else {
      setSteps(steps + 1);
    }
  };
  const handleCouponAdd = async () => {
    if (!orderForm.discount) return;
    try {
      const response = await clientFetch("/discounts/checked", {
        token,
        method: "POST",
        body: {
          code: orderForm.discount,
        },
      });

      if (response.success) {
        if (response.available) {
          setCouponAvailable(true);
          setOrderForm((prev) => ({
            ...prev,
            discountId: response.data.id,
          }));
        } else {
          setCouponAvailable(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCouponClear = () => {
    setOrderForm((prev) => ({
      ...prev,
      discountId: null,
      discount: "",
    }));
    setCouponAvailable(null);
  };

  const handleOrderSubmit = () => {
    const body = {
      recipientName: orderForm.name,
      recipientPhone: orderForm.phone,
      recipientAddress: orderForm.address,
      shippingId: shippingMethod?.value,
      paymentId: paymentMethod?.value,
      discountId: orderForm.discountId,
      totalPrice: priceData.totalPrice,
    };
    console.log(body);
  };

  useEffect(() => {
    const tax = priceData.productPrice * 0.1;
    setPriceData((prev) => ({ ...prev, taxPrice: tax }));
  }, [priceData.productPrice]);
  useEffect(() => {
    const total =
      priceData.productPrice + priceData.shippingPrice + priceData.taxPrice;
    setPriceData((prev) => ({ ...prev, totalPrice: total }));
  }, [priceData.productPrice, priceData.shippingPrice, priceData.taxPrice]);

  useEffect(() => {
    const fetchCustomData = async () => {
      const [sizes_res, ices_res, sugars_res] = await Promise.all([
        clientFetch("/sizes", {
          method: "GET",
        }),
        clientFetch("/ices", {
          method: "GET",
        }),
        clientFetch("/sugars", {
          method: "GET",
        }),
      ]);
      if (sizes_res.success) {
        const sizes = sizes_res.data.map(
          ({ id, title, price }: SizeCustomProps) => {
            return { id, title, price };
          }
        );
        setCustomData((prev) => ({ ...prev, sizes }));
      }

      if (sugars_res.success) {
        const sugars = sugars_res.data.map(
          ({ id, title }: DefaultCustomProps) => {
            return { id, title };
          }
        );
        setCustomData((prev) => ({ ...prev, sugars }));
      }

      if (ices_res.success) {
        const ices = ices_res.data.map(({ id, title }: DefaultCustomProps) => {
          return { id, title };
        });
        setCustomData((prev) => ({ ...prev, ices }));
      }
    };
    fetchCustomData();
  }, []);
  return (
    <OrderContext.Provider
      value={{
        cartProducts,
        customData,
        syncChecked,
        handleSyncChecked,
        orderForm,
        handleOrderFormInput,
        cardForm,
        handleCardFormInput,
        dropdownToggle,
        handleDropdownToggle,
        shippingMethod,
        paymentMethod,
        selectShippingMethod,
        selectPaymentMethod,
        setCartProducts,
        priceData,
        handleProductPrice,
        handleProductDelete,
        handleProductEdit,
        steps,
        handleControlSteps,
        step_disabled_condition,
        handleCouponAdd,
        couponAvailabled,
        handleCouponClear,
        handleOrderSubmit,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }

  return context;
};
