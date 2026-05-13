import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";
import { fetchPayoutSettings, savePayoutSettings } from "../settings-api";

const validationSchema = yup.object().shape({
  cardCvc: yup.string().required("Card CVC is required!"),
  amount: yup.string().required("Amount is required!"),
  cardNo: yup.string().required("Card No is required!"),
  cardHolderName: yup.string().required("Card Holder Name is required!")
});

export default function CardPayment() {
  const initialValues = {
    amount: "0",
    cardCvc: "",
    cardNo: "",
    cardHolderName: ""
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;

  useEffect(() => {
    fetchPayoutSettings()
      .then((s) => {
        if (s?.card) reset({ ...initialValues, ...s.card });
      })
      .catch(() => setError("Gagal memuat card payout setting."));
  }, [reset]);

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    setSuccess(null);
    setError(null);
    try {
      await savePayoutSettings("card", values);
      setSuccess("Card payout setting tersimpan.");
    } catch {
      setError("Gagal menyimpan card payout setting.");
    }
  });

  return (
    <Fragment>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Card Payment
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        <Stack spacing={3} mb={3}>
          <TextField color="info" size="medium" name="amount" label="Amount" />
          <TextField color="info" size="medium" name="cardHolderName" label="Card Holder Name" />
          <TextField color="info" size="medium" name="cardNo" label="Card No" />
          <TextField color="info" size="medium" name="cardCvc" label="Card CVC" />
        </Stack>

        <Button loading={isSubmitting} type="submit" color="info" variant="contained">
          Save Changes
        </Button>
      </FormProvider>
    </Fragment>
  );
}
