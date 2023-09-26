import { Term } from "../../models/term";

export type ListParams = {
  letters: string[];
};

export type ListResponse = {
  items: Term[];
};
