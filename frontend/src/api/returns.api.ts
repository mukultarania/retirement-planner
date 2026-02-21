// src/api/returns.api.ts
import { api } from "./axios";

export const getIndexReturns = (data: any) => api.post("/returns:index", data);

export const getNpsReturns = (data: any) => api.post("/returns:nps", data);
