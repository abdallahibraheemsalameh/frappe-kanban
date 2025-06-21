<template>
  <kanban-board />
</template>
<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from "vue";
import { getSalesOrders } from "./services/frappe";

const orders = ref([]);

const kanbanBoard = defineAsyncComponent(
  () => import("./components/KanbanBoard.vue")
);
</script>
