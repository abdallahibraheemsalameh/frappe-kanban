# Vue.js + Frappe Kanban Integration – Implementation Summary

## Implementation Approach

- I built a **Vue 3 + TypeScript Kanban board** using [`vuedraggable`](https://github.com/SortableJS/vue.draggable.next), styled with basic CSS.
- The board fetches `Sales Order` documents from the **Frappe REST API** and organizes them by delivery day.
- When a card is dragged to a different column, the `delivery_date` of that `Sales Order` is updated using a PATCH request to the Frappe API.

## Frappe Integration

- ⚠️ I did **not** create a custom Frappe app.
- I used the **existing Frappe REST API** to interact with the built-in `Sales Order` DocType.
- The **backend remained unchanged** — all logic and UI are handled in the Vue frontend.

## Structure

- `KanbanBoard.vue`: Main component rendering the columns and cards.
- `services/frappe.ts`: Abstracted API functions to fetch and update `Sales Order` records.
- The board displays **7 columns**, one for each weekday, and maps orders by their delivery date.

## Assumptions

- The Frappe server exposes `GET` and `PUT` access on `/api/resource/Sales Order`.
- CORS and CSRF settings were configured on the backend to allow API access from `http://localhost:5173`.
- The user has the required permissions to view and update `Sales Order` records.

---

## ✅ Submission Checklist

- [x] Attached Vue.js page (`KanbanBoard.vue`) + service file (`frappe.ts`)
- [x] Included this brief documentation
- [x] Clarified that **no custom Frappe code** was written or needed
