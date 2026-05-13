import { cache } from "react";
import { getServerAxios } from "utils/serverAxios";
// CUSTOM DATA MODEL
import Ticket from "models/Ticket.model";
import { SlugParams } from "models/Common";

export const getTicketList = cache(async (page = 1) => {
  const PAGE_SIZE = 5;
  const PAGE_NO = page - 1;

  const api = await getServerAxios();
  const { data } = await api.get<{ tickets: Ticket[]; total: number; totalPages: number }>("/api/tickets", {
    params: { page }
  });
  const tickets = data.tickets ?? [];
  const totalPages = data.totalPages ?? Math.ceil(tickets.length / PAGE_SIZE);
  const response = { tickets, totalTickets: data.total ?? tickets.length, totalPages };
  return response;
});

export const getTicket = cache(async (slug: string) => {
  const api = await getServerAxios();
  const response = await api.get<Ticket>("/api/tickets/single", { params: { slug } });
  return response.data;
});

export const getSlugs = cache(async () => {
  const api = await getServerAxios();
  const response = await api.get<SlugParams[]>("/api/tickets/slugs");
  return response.data;
});

export default { getTicketList, getTicket, getSlugs };
