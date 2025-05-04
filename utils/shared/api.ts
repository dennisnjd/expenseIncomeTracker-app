import axios from "axios";
import { reloadAppAsync } from "expo";
import { router } from "expo-router";

import { apiDebug } from "./debugLogging";
import { mmkvGetItem, mmkvSetItem } from "./mmkv_utils";

type BasicApiResponse = {
  status: 1 | 0|101 ;
  message: string;
};

type GetRequest = {
  url: string;
  debug?: boolean;
  callback?: () => void;
  token_required?: boolean;
};

const baseUrl: string = 'http://10.0.2.2:3000/';

export const getRequest = async <Result,>({
  url,
  debug = true,
  callback,
  token_required = true,
}: GetRequest): Promise<Result> => {
  const token: string = mmkvGetItem("token") as string;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token_required && { Authorization: `Bearer ${token}` }),
  };

  const options = { headers };
  const URL = baseUrl + url;

  try {
    const response = await axios.get<Result & BasicApiResponse>(URL, options);
    const responseData = response?.data;

    if (debug) apiDebug(URL, headers, null, response);

    // if (!responseData?.status) {
    //   throw new Error(
    //     "Invalid Status, response:" + JSON.stringify(response, null, 2),
    //   );
    // }

    if (responseData.status === 101) {
      // Handle token mismatch scenario. Redirecting to login screen
     mmkvSetItem("token", "");

      if (__DEV__) {
        router.replace("/auth");
      } else {
        reloadAppAsync();
      }
    }

    if (callback) callback();
    return response.data;
  } catch (error: any) {
    if (__DEV__) console.error(error);

    apiDebug(URL, headers, null, error);
    throw new Error(error.toString());
  }
};

type PostRequest = {
  url: string;
  body: object;
  debug?: boolean;
  callback?: () => void;
  token_required?: boolean;
};

export const postRequest = async <Response,>({
  url,
  body,
  debug = true,
  callback,
  token_required = true,
}: PostRequest): Promise<Response> => {
  const token: string = mmkvGetItem("token") as string;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token_required && { Authorization: `Bearer ${token}` }),
  };

  const options = { headers };
  const URL = baseUrl + url;

  try {
    const response = await axios.post<Response & BasicApiResponse>(
      URL,
      body,
      options,
    );
    if (debug) apiDebug(URL, headers, body, response);

    const responseData = response?.data;

    if (responseData.status == null || responseData.status === undefined) {
      throw new Error(
        "Invalid Status, response:" + JSON.stringify(response, null, 2),
      );
    }

    if (responseData.status === 101) {
      // Handle token mismatch scenario. Redirecting to login screen
      mmkvSetItem("token", "");

      if (__DEV__) {
        router.replace("/auth");
      } else {
        reloadAppAsync();
      }
    }

    if (callback) callback();

    return response.data;
  } catch (error: any) {
    if (__DEV__) console.error(error);

    apiDebug(URL, headers, body, error);
    throw new Error(error.toString());
  }
};
