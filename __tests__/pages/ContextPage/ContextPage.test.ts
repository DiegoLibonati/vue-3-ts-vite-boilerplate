import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Ref } from "vue";
import type { Router } from "vue-router";

import ContextPage from "@/pages/ContextPage/ContextPage.vue";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [{ path: "/", component: { template: "<div />" } }],
  });

const renderPage = (theme: "light" | "dark" = "dark", mockToggle = vi.fn()): RenderResult => {
  const themeRef: Ref<"light" | "dark"> = ref(theme);
  return render(ContextPage, {
    global: {
      plugins: [createTestRouter()],
      provide: {
        theme: themeRef,
        toggleTheme: mockToggle,
      },
    },
  });
};

describe("ContextPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Provide / Inject" })).toBeInTheDocument();
    });

    it("should render the current dark theme", () => {
      renderPage("dark");
      expect(screen.getByText(/Current theme:/)).toHaveTextContent("dark");
    });

    it("should render the current light theme", () => {
      renderPage("light");
      expect(screen.getByText(/Current theme:/)).toHaveTextContent("light");
    });

    it("should render the toggle theme button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Toggle theme" })).toBeInTheDocument();
    });

    it("should render the back to home link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Back to Home" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call toggleTheme when the toggle button is clicked", async () => {
      const user = userEvent.setup();
      const mockToggle = vi.fn();
      renderPage("dark", mockToggle);

      await user.click(screen.getByRole("button", { name: "Toggle theme" }));

      expect(mockToggle).toHaveBeenCalledTimes(1);
    });
  });
});
