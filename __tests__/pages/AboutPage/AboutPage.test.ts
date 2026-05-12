import { render, screen } from "@testing-library/vue";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Router } from "vue-router";

import AboutPage from "@/pages/AboutPage/AboutPage.vue";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [{ path: "/", component: { template: "<div />" } }],
  });

const renderPage = (): RenderResult =>
  render(AboutPage, {
    global: { plugins: [createTestRouter()] },
  });

describe("AboutPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    });

    it("should render the description text", () => {
      renderPage();
      expect(screen.getByText(/clean starting point for Vue 3/i)).toBeInTheDocument();
    });

    it("should render the back to home link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Back to Home" })).toBeInTheDocument();
    });

    it("should have the back to home link pointing to the root path", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
    });
  });
});
