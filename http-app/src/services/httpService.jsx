import axios from "axios";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/browser";

axios.interceptors.response.use(null, error => {
  // * Intercept errors
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);

    Sentry.captureException(error);

    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
