import dayjs from "dayjs";
import type { ISalesOrder } from "../meta/i-sales-order";

class SalesOrder implements ISalesOrder {
  name: string;
  customer_name: string;
  delivery_date: string;

  constructor(
    name: string = "",
    customer_name: string = "",
    delivery_date: string = ""
  ) {
    this.name = name;
    this.customer_name = customer_name;
    this.delivery_date = dayjs(delivery_date).format("YYYY-MM-DD");
  }
}

export { SalesOrder };
