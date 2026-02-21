// src/api/transactions.api.ts
import { api } from "./axios";

export const parseTransactions = (data: any) =>
	api.post("/transactions:parse", data);

export const validateTransactions = (data: any) =>
	api.post("/transactions:validate", data);

export const filterTransactions = (data: any) =>
	api.post("/transactions:filter", data);
