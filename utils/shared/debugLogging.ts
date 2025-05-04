const logging = (...data: any[]) => {
    if (__DEV__) {
      const message = data.join(" ");
      console.log(message);
    }
  };
  export const apiDebug = (
    url: string,
    headers: any,
    body: any,
    response: any,
  ) => {
    const layer = `\n**************************************************\n\n`;
    const responseString = JSON.stringify(response?.data, null, 2);
    const bodyString = JSON.stringify(body, null, 2);
    const headersString = JSON.stringify(headers, null, 2);
    const text =
      layer +
      "API Response:\nURL: " +
      url +
      "\nHeaders:\n" +
      headersString +
      "\nBody:\n" +
      bodyString +
      "\nResponse:\n" +
      responseString +
      "\n" +
      layer;
    logging(text);
  };
  
  export default logging;
  