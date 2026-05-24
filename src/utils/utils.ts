import { BaseParams } from "@/types/api";

export const generateQueryString = (params: BaseParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams.toString();
};

export const appendQueryString = (
  url: string,
  queryString?: string
): string => {
  return queryString ? `${url}?${queryString}` : url;
};

export const appendQueryParams = (url: string, params: BaseParams): string => {
  const queryString = generateQueryString(params);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${queryString}`
  );
  return appendQueryString(url, queryString);
};
