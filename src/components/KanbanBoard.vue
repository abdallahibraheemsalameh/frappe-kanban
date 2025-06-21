<template>
  <div class="kanban-board">
    <div class="kanban-column" v-for="day in weekDays" :key="day">
      <div class="column-header">
        <h3 class="column-title">{{ day }}</h3>
        <div class="order-count">{{ ordersByDay[day].length }}</div>
      </div>

      <draggable
        :list="ordersByDay[day]"
        group="orders"
        itemKey="name"
        @change="(event) => onDragChange(event, day)"
        class="draggable-area"
      >
        <template #item="{ element }">
          <div v-if="element" class="kanban-card">
            <div class="card-header">
              <div class="card-indicator"></div>
              <div class="card-priority">
                <svg
                  class="priority-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>

            <div class="card-content">
              <h4 class="order-name">{{ element.name }}</h4>
              <div class="customer-info">
                <svg
                  class="customer-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span class="customer-name">{{ element.customer_name }}</span>
              </div>

              <div class="delivery-info">
                <svg
                  class="calendar-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span class="delivery-date">{{
                  formatDate(element.delivery_date)
                }}</span>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <div v-if="ordersByDay[day].length === 0" class="empty-placeholder">
            <div class="empty-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <span class="empty-text">Drop orders here</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import draggable from "vuedraggable";
import dayjs from "dayjs";
import { getSalesOrders, updateDeliveryDate } from "../services/frappe";

interface SalesOrder {
  name: string;
  customer_name: string;
  delivery_date: string;
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ordersByDay = ref<Record<string, SalesOrder[]>>(
  Object.fromEntries(weekDays.map((d) => [d, []]))
);

function getDayOfWeek(date: string): string {
  const dayIndex = dayjs(date).day();
  return weekDays[dayIndex];
}

function formatDate(date: string): string {
  return dayjs(date).format("YYYY-MM-DD");
}

async function loadOrders() {
  const orders = await getSalesOrders();
  for (const order of orders) {
    const day = getDayOfWeek(order.delivery_date);
    ordersByDay.value[day].push(order);
  }
}

async function onDragChange(event: any, day: string) {
  console.log("Drag change event:", event);
  console.log("Target day:", day);

  if (event.added) {
    const addedOrder = event.added.element;
    console.log("Added order:", addedOrder);

    const newDate = dayjs().day(weekDays.indexOf(day)).format("YYYY-MM-DD");

    console.log("Old date:", addedOrder.delivery_date, "New date:", newDate);

    if (addedOrder.delivery_date !== newDate) {
      addedOrder.delivery_date = newDate;
      await updateDeliveryDate(addedOrder.name, newDate);
    }
  }
}

onMounted(loadOrders);
</script>
