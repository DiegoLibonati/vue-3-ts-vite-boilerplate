import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createPinia } from "pinia";
import { nextTick } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Router } from "vue-router";

import PiniaPage from "@/pages/PiniaPage/PiniaPage.vue";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [{ path: "/", component: { template: "<div />" } }],
  });

const renderPage = (): RenderResult =>
  render(PiniaPage, {
    global: {
      plugins: [createPinia(), createTestRouter()],
    },
  });

describe("PiniaPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Pinia Store Example" })).toBeInTheDocument();
    });

    it("should render the count starting at 0", () => {
      renderPage();
      expect(screen.getByText(/Count:/)).toHaveTextContent("Count: 0");
    });

    it("should render the doubled value starting at 0", () => {
      renderPage();
      expect(screen.getByText(/Doubled:/)).toHaveTextContent("Doubled: 0");
    });

    it("should render the increment button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Increment counter" })).toBeInTheDocument();
    });

    it("should render the decrement button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Decrement counter" })).toBeInTheDocument();
    });

    it("should render the reset button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Reset counter" })).toBeInTheDocument();
    });

    it("should render the back to home link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Back to Home" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should increment the count when the increment button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();

      await user.click(screen.getByRole("button", { name: "Increment counter" }));
      await nextTick();

      expect(screen.getByText(/Count:/)).toHaveTextContent("Count: 1");
    });

    it("should decrement the count when the decrement button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();

      await user.click(screen.getByRole("button", { name: "Increment counter" }));
      await nextTick();
      await user.click(screen.getByRole("button", { name: "Decrement counter" }));
      await nextTick();

      expect(screen.getByText(/Count:/)).toHaveTextContent("Count: 0");
    });

    it("should reset the count to 0 when the reset button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();

      await user.click(screen.getByRole("button", { name: "Increment counter" }));
      await nextTick();
      await user.click(screen.getByRole("button", { name: "Increment counter" }));
      await nextTick();
      await user.click(screen.getByRole("button", { name: "Reset counter" }));
      await nextTick();

      expect(screen.getByText(/Count:/)).toHaveTextContent("Count: 0");
    });

    it("should update the doubled value when the count changes", async () => {
      const user = userEvent.setup();
      renderPage();

      await user.click(screen.getByRole("button", { name: "Increment counter" }));
      await nextTick();
      await user.click(screen.getByRole("button", { name: "Increment counter" }));
      await nextTick();

      expect(screen.getByText(/Doubled:/)).toHaveTextContent("Doubled: 4");
    });
  });
});
