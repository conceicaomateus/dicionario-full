import { HttpClient } from "../api/http-client";
import { ListResponseApi } from "../api/types/list-response";
import { Term } from "../models/term";
import { ListParams, ListResponse } from "./types/list";

const baseUrl = import.meta.env.VITE_URL_API_URL + "/terms";

export function TermsService() {
  const List = async (params: ListParams): Promise<ListResponse> => {
    const endpoint = "/list";

    const response = await HttpClient().request<ListResponseApi<Term>>({
      method: "post",
      url: baseUrl + endpoint,
      body: params,
    });

    return {
      items: response.body.items,
    };
  };

  const GetById = async (id: string): Promise<Term> => {
    const endpoint = `/getById/${id}`;

    const response = await HttpClient().request<Term>({
      method: "get",
      url: baseUrl + endpoint,
    });

    return response.body;
  };

  const Create = async (term: Partial<Term>): Promise<{ Id: string }> => {
    const endpoint = "/create";

    const response = await HttpClient().request<{ Id: string }>({
      method: "post",
      url: baseUrl + endpoint,
      body: term,
    });

    return response.body;
  };

  const Update = async (
    id: string,
    term: Partial<Term>
  ): Promise<{ Id: string }> => {
    const endpoint = `/update/${id}`;

    const response = await HttpClient().request<{ Id: string }>({
      method: "patch",
      url: baseUrl + endpoint,
      body: term,
    });

    return response.body;
  };

  const SaveOrUpdate = async (term: Partial<Term>): Promise<string> => {
    if (term?._id) {
      const res = await Update(term._id, term);

      return res.Id;
    }

    const res = await Create(term);
    return res.Id;
  };

  const Delete = async (id: string): Promise<{ message: string }> => {
    const endpoint = `/delete/${id}`;

    const response = await HttpClient().request<{ message: string }>({
      method: "delete",
      url: baseUrl + endpoint,
    });

    return {
      message: response.body.message,
    };
  };

  return {
    List,
    Delete,
    GetById,
    SaveOrUpdate,
  };
}
