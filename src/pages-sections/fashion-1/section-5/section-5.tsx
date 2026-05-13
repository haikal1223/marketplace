import Image from "next/image";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import CarouselCard from "./carousel-card";
// STYLED COMPONENTS
import { ContentWrapper, BadgeBox } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/fashion-1";

// ========================================================
interface Deal {
  imgUrl: string;
  expireDate: string;
  productName: string;
  offerName: string;
  offerTagline: string;
  offerDescription: string;
}
// ========================================================

export default async function Section5() {
  const hotDealList: Deal[] = await api.getHotDealList();
  if (!hotDealList || !hotDealList.length) return null;
  const item = hotDealList[0];

  return (
    <Container className="pb-4">
      <ContentWrapper>
        <CarouselCard
          buttonText="BUY NOW"
          imgUrl={item.imgUrl}
          productName={item.productName}
          offerName={item.offerName}
          offerTagline={item.offerTagline}
          offerDescription={item.offerDescription}
          expireDate={new Date(item.expireDate).getTime()}
        />

        <BadgeBox>
          <Image src="/assets/images/badges/hot.svg" width={110} height={130} alt="New" />
        </BadgeBox>
      </ContentWrapper>
    </Container>
  );
}
