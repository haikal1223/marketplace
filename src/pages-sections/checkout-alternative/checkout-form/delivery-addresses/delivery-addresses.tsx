import { Controller, useFormContext } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
// CUSTOM ICON COMPONENTS
import Trash from "icons/Trash";
import Pencil from "icons/Pencil";
// LOCAL CUSTOM HOOK
import useDeliveryAddresses from "./use-delivery-addresses";
// LOCAL CUSTOM COMPONENTS
import Card from "../card";
import Heading from "../heading";
import DeliveryAddressForm from "./delivery-address-form";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
// TYPES
import { DeliveryAddress } from "models/Common";

// STYLED COMPONENTS
const AddressCard = styled("div", {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "error"
})<{ active: boolean; error: boolean }>(({ theme, active, error }) => ({
  padding: "1rem",
  boxShadow: "none",
  cursor: "pointer",
  position: "relative",
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  ...(error && {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.light, 0.3)
  }),
  ...(active && {
    borderColor: theme.palette.grey[100],
    backgroundColor: theme.palette.grey[50]
  }),
  h6: { marginBottom: theme.spacing(0.5) },
  p: { color: theme.palette.grey[700] }
}));

// ==============================================================
type Props = { deliveryAddresses: DeliveryAddress[] };
// ==============================================================

export default function DeliveryAddresses({ deliveryAddresses }: Props) {
  const {
    openModal,
    editDeliveryAddress,
    toggleModal,
    handleAddNewAddress,
    handleEditDeliveryAddress,
    handleDeleteDeliveryAddress
  } = useDeliveryAddresses();

  const { control } = useFormContext();

  const HeaderSection = (
    <FlexBetween mb={4}>
      <Heading number={2} title="Delivery Address" mb={0} />
      <Button color="primary" variant="outlined" onClick={handleAddNewAddress}>
        Add New Address
      </Button>
    </FlexBetween>
  );

  if (!Array.isArray(deliveryAddresses) || deliveryAddresses.length === 0) {
    return (
      <Card>
        {HeaderSection}

        <Typography fontSize={16} variant="body1" color="text.secondary" textAlign="center">
          No delivery addresses found. Please add a new address.
        </Typography>
      </Card>
    );
  }

  return (
    <Card>
      {HeaderSection}

      <Grid container spacing={2}>
        {deliveryAddresses.map((address, ind) => (
          <Grid size={{ md: 4, sm: 6, xs: 12 }} key={ind}>
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <AddressItem
                  address={address}
                  isSelected={address.street1 === field.value}
                  hasError={Boolean(error)}
                  onSelect={field.onChange}
                  onEdit={handleEditDeliveryAddress}
                  onDelete={handleDeleteDeliveryAddress}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>

      {/* SHOW DELIVERY ADDRESS FORM MODAL WHEN CLICK EDIT BUTTON */}
      {openModal && (
        <DeliveryAddressForm handleCloseModal={toggleModal} deliveryAddress={editDeliveryAddress} />
      )}
    </Card>
  );
}

interface AddressItemProps {
  hasError: boolean;
  isSelected: boolean;
  address: DeliveryAddress;
  onDelete: (id: number) => void;
  onSelect: (street: string) => void;
  onEdit: (address: DeliveryAddress) => void;
}

function AddressItem({
  address,
  hasError,
  isSelected,
  onSelect,
  onEdit,
  onDelete
}: AddressItemProps) {
  return (
    <AddressCard error={hasError} active={isSelected} onClick={() => onSelect(address.street1)}>
      <FlexBox position="absolute" top={13} right={7}>
        <IconButton size="small" onClick={() => onEdit(address)}>
          <Pencil color="inherit" sx={{ fontSize: 16 }} />
        </IconButton>

        <IconButton size="small" color="error" onClick={() => onDelete(address.id)}>
          <Trash color="error" sx={{ fontSize: 16 }} />
        </IconButton>
      </FlexBox>

      <Typography noWrap variant="h6">
        {address.name}
      </Typography>

      <Typography variant="body1">{address.street1}</Typography>

      {address.street2 && <Typography variant="body1">{address.street2}</Typography>}

      <Typography variant="body1">{address.phone}</Typography>
    </AddressCard>
  );
}
