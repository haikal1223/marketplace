"use client";

import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider } from "components/form-hook";
// LOCAL CUSTOM COMPONENTS
import Card from "./card";
import Heading from "./heading";
import DeliveryDate from "./delivery-date";
import DeliveryAddresses from "./delivery-addresses";
import Voucher from "./payments/voucher";
import CardList from "./payments/card-list";
import PaymentForm from "./payments/payment-form";
// TYPES
import { DeliveryTime, DeliveryAddress, PaymentCard } from "models/Common";

const validationSchema = yup.object().shape({
  card: yup.string().optional(),
  voucher: yup.string().optional(),
  saveCard: yup.boolean().optional(),
  date: yup.string().required("Delivery date is required"),
  time: yup.string().required("Delivery time is required"),
  address: yup.string().required("Delivery address is required"),
  cardHolderName: yup.string().when("card", {
    is: (val: string) => !val,
    then: (Schema) => Schema.required("Name is required")
  }),
  cardNo: yup.string().when("card", {
    is: (val: string) => !val,
    then: (Schema) => Schema.required("Card No is required")
  }),
  cardExpiry: yup.string().when("card", {
    is: (val: string) => !val,
    then: (Schema) => Schema.required("Expiry is required")
  }),
  cardCVC: yup.string().when("card", {
    is: (val: string) => !val,
    then: (Schema) => Schema.required("CVC is required")
  })
});

type FormValues = yup.InferType<typeof validationSchema>;

// ==============================================================
interface Props {
  cards: PaymentCard[];
  deliveryTimes: DeliveryTime[];
  deliveryAddresses: DeliveryAddress[];
}
// ==============================================================

export default function CheckoutForm({ cards, deliveryAddresses, deliveryTimes }: Props) {
  const initialValues: FormValues = {
    card: "",
    date: "",
    time: "",
    address: "",
    voucher: "",
    cardNo: "",
    cardCVC: "",
    cardExpiry: "",
    cardHolderName: "",
    saveCard: false
  };

  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema) as Resolver<FormValues>
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  const handleSubmitForm = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
    // router.push("/payment");
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <DeliveryDate deliveryTimes={deliveryTimes} />

      <DeliveryAddresses deliveryAddresses={deliveryAddresses} />

      <Card>
        <Heading number={3} title="Payment Details" />

        {!watch("card") && <PaymentForm />}

        <CardList cards={cards} />

        <Voucher />

        <Button
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          loading={isSubmitting}>
          Place Order
        </Button>
      </Card>
    </FormProvider>
  );
}
