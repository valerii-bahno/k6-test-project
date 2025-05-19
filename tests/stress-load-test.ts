import { check, sleep } from "k6";
import { getAuthToken } from "../utils/auth.helper.ts";
import { postPizza } from "../utils/pizza.helper.ts";
import { Options } from "k6/options";

// stress load test
export const options: Options = {
  stages: [{
    duration: '5s',
    target: 2,
  },{
    duration: '10s',
    target: 10,
  },{
    duration: '1m',
    target: 16,
  },{
    duration: '30s',
    target: 10,
  },{
    duration: '20s',
    target: 0,
  }]
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