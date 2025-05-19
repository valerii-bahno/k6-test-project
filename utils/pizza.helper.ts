import http from "k6/http";

export function postPizza(token) {
    const res = http.post(
        "https://quickpizza.grafana.com/api/pizza",
        JSON.stringify({
          maxCaloriesPerSlice: 1000,
          mustBeVegetarian: false,
          excludedIngredients: [],
          excludedTools: [],
          maxNumberOfToppings: 5,
          minNumberOfToppings: 2,
        }),
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    return res;
}