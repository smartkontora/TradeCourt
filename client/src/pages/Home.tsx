import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Offer } from "../components/home/Offer";
import { Header } from "../components/home/Header";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "../api/offer.services";
import {
  IBank,
  IFiat,
  IOffer,
  IPayment,
  IRegion,
  IToken,
} from "../models/models";
import { SkeletonWrapper } from "../components/ui/SkeletonWrapper";
import { SearchField } from "../components/ui/SearchField";
import { Dropdown } from "../components/home/Dropdown";
import { useFetchFilters } from "../hooks/useFetchFilters";
import { useInfiniteOffers } from "../hooks/useInfiniteOffers";
import { Button } from "../components/ui/Button";

export interface IActiveFilters {
  crypto: string | undefined;
  fiat: string | undefined;
}

export const Home = () => {
  const initialFilters: IActiveFilters = {
    crypto: "",
    fiat: "",
  };

  const [activeCrypto, setActiveCrypto] = useState<IToken | null>(null);
  console.log(activeCrypto);
  const [activeFiat, setActiveFiat] = useState<IFiat | null>(null);
  console.log(activeFiat);
  // const [activePayment, setActivePayment] = useState<IPayment>();
  // const [activeRegion, setActiveRegion] = useState<IRegion>();
  // const [activeRating, setActiveRating] = useState({});
  const [activeFilters, setActiveFilters] =
    useState<IActiveFilters>(initialFilters);

  useEffect(() => {
    setActiveFilters({
      crypto: activeCrypto?._id || "",
      fiat: activeFiat?._id || "",
    });
  }, [activeCrypto, activeFiat]);

  const { fiat, crypto, isFiltersFetchOk } = useFetchFilters();

  const { data, error, status, lastItemRef } = useInfiniteOffers(activeFilters);

  const isLoaded = isFiltersFetchOk && status === "success";

  const content = data?.pages.map((page) => {
    return page?.map((offer: IOffer, i: number) => {
      if (page.length === i + 1) {
        return <Offer ref={lastItemRef} {...offer} key={offer._id} />;
      }
      return <Offer {...offer} key={offer._id} />;
    });
  });

  const [searchTerm, setSearchTerm] = useState("");

  const headers = [
    "Maker Address",
    "Avaliable / Limit",
    "Unit Price",
    "Payment Methods",
    "Buy / Sell",
  ];

  return (
    <div className='grid grid-cols-homePage gap-5 my-5'>
      <SkeletonWrapper isLoaded={isLoaded} height={1000}>
        <aside className='bg-white shadow-customDark p-5 rounded-2xl flex flex-col gap-5 sticky top-5 overflow-auto max-h-screen'>
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder='Search...'
          />
          <Dropdown
            onSelect={setActiveCrypto}
            data={{
              items: crypto.data,
              options: "symbol",
            }}
            label='Crypto'
            activeSelect={activeCrypto}
          />
          <Dropdown
            onSelect={setActiveFiat}
            data={{
              items: fiat.data,
              options: "ticker",
            }}
            label='Fiat'
            activeSelect={activeFiat}
          />
          {/* <Dropdown
            onSelect={setActivePayment}
            data={{
              ,
              options: "item?.name",
            }}
            activeSelect='Payment Method'
          /> */}
          {/* <Dropdown
            onSelect={setActiveRegion}
            data={{
              items: fiat.data.regions,
              options: "item?.name",
            }}
            activeSelect='Region'
          />
          <Dropdown
            onSelect={setActiveRating}
            data={{
              items: crypto.data,
              options: "item?.symbol",
            }}
            activeSelect='Rating'
          /> */}
          <Button
            name={"Clear All"}
            onClick={() => {
              setActiveCrypto(null);
              setActiveFiat(null);
            }}
          />
        </aside>
      </SkeletonWrapper>

      <main>
        <SkeletonWrapper height={30} isLoaded={isLoaded} margin={"20px"}>
          <Header headers={headers} />
        </SkeletonWrapper>
        <SkeletonWrapper
          isLoaded={isLoaded}
          height={100}
          count={10}
          margin={"20px"}
        >
          <div className='space-y-2'>{content}</div>
        </SkeletonWrapper>
      </main>
    </div>
  );
};
