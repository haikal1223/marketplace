import { useCallback } from "react";
import { useController } from "react-hook-form";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// CUSTOM DATA MODEL
import { PaymentCard } from "models/Common";

// ==============================================================
type Props = { cards: PaymentCard[] };
// ==============================================================

export default function CardList({ cards }: Props) {
  const { field } = useController({ name: "card" });

  const handleCardSelect = useCallback(
    (digits: string) => {
      field.onChange(digits);
    },
    [field]
  );

  if (!cards || cards.length === 0) return null;

  return (
    <Box mb={3}>
      <Typography fontWeight={500} variant="body1">
        Saved Cards
      </Typography>

      <Grid container spacing={2} mt={1.5}>
        {cards.map((card) => (
          <CardItem
            card={card}
            key={card.last4Digits}
            onSelect={handleCardSelect}
            isSelected={field.value === card.last4Digits}
          />
        ))}
      </Grid>
    </Box>
  );
}

interface CardItemProps {
  card: PaymentCard;
  isSelected: boolean;
  onSelect: (digits: string) => void;
}

function CardItem({ card, isSelected, onSelect }: CardItemProps) {
  const { cardType, last4Digits, name } = card;

  const handleSelectCard = useCallback(() => {
    onSelect(isSelected ? "" : last4Digits);
  }, [isSelected, last4Digits, onSelect]);

  return (
    <Grid size={{ md: 4, sm: 6, xs: 12 }} key={last4Digits}>
      <Card
        onClick={handleSelectCard}
        sx={(theme) => ({
          padding: 2,
          boxShadow: "none",
          cursor: "pointer",
          border: `1px solid ${theme.palette.divider}`,
          ...(isSelected && {
            borderColor: theme.palette.grey[100],
            backgroundColor: theme.palette.grey[50]
          })
        })}>
        <Box height={24} width={36} position="relative" mb={1}>
          <LazyImage
            fill
            alt={`${name}'s ${cardType} card`}
            sizes="(max-width: 768px) 100vw, 33vw"
            src={`/assets/images/payment-methods/${cardType}.svg`}
          />
        </Box>

        <Typography variant="body1">**** **** **** {last4Digits}</Typography>
        <Typography variant="body1">{name}</Typography>
      </Card>
    </Grid>
  );
}
