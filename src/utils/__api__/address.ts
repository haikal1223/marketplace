import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";
// CUSTOM DATA MODEL
import { IdParams } from "models/Common";
import Address from "models/Address.model";

const getAddressList = cache(async (page = 1) => {
  const PAGE_SIZE = 5;
  const PAGE_NO = page - 1;

  const api = await getServerAxios();
  const { data: addressList } = await api.get<Address[]>("/api/address/user");

  const totalPages = Math.ceil(addressList.length / PAGE_SIZE);
  const currentAddressList = addressList.slice(PAGE_NO * PAGE_SIZE, (PAGE_NO + 1) * PAGE_SIZE);

  const response = { addressList: currentAddressList, totalOrders: addressList.length, totalPages };
  return response;
});

const getIds = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get<IdParams[]>("/api/address/address-ids");
  return response.data;
});

const getAddress = cache(async (id: string) => {
  const api = await getServerAxios();
  const response = await api.get<Address>(`/api/address/user/${id}`);
  return response.data;
});

export default { getAddressList, getIds, getAddress };
