import axios from "axios";
import { HttpRequest } from "./types/http-request";
import { HttpResponse } from "./types/http-response";

export function HttpClient() {
  const request = async <R>(data: HttpRequest): Promise<HttpResponse<R>> => {
    const response = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers,
    });

    return {
      statusCode: response.status,
      body: response.data,
    };
  };

  return {
    request,
  };
}
