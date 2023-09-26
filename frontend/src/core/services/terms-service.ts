import { HttpClient } from "../api/http-client";
import { ListRespontApi } from "../api/types/list-response";
import { Term } from "../models/term";
import { ListParams, ListResponse } from "./types/list";

const baseUrl = import.meta.env.VITE_URL_API_URL + "/terms";

export function TermsService() {
  const List = async (params: ListParams): Promise<ListResponse> => {
    const endpoint = "/list";

    const response = await HttpClient().request<ListRespontApi<Term>>({
      method: "post",
      url: baseUrl + endpoint,
      body: params,
    });

    return {
      items: response.body.items,
    };
  };

  return {
    List,
  };
}
