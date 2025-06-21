<template>
  <kanban-board />
</template>
<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { getSalesOrders } from "./services/frappe";

const orders = ref([]);

onMounted(async (): any => {
  try {
    orders.value = await getSalesOrders();
    console.log(orders.value);
  } catch (error) {
    console.error("Failed to fetch Sales Orders:", error);
  }
});

const kanbanBoard = defineAsyncComponent(
  () => import("./components/KanbanBoard.vue")
);
</script>
