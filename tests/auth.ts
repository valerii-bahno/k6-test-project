import { check, sleep } from "k6";
import http from "k6/http"
import { getAuthToken } from "../utils/auth.helper.ts";
import { postPizza } from "../utils/pizza.helper.ts";
import { Options } from "k6/options";

// smoke test
export const options: Options = {
  vus: 3,
  duration: '20s'
}

export function setup() {
  const token = getAuthToken({
      username: "default",
      password: "12345678",
    });
  
  return { token }
}

export default function ({ token }) {
  const response = postPizza(token);

  check(response, {
    "Status-code": (res) => res.status == 200,
    "Request-duration": (res) => res.timings.duration < 300,
  });

  sleep(1);
}