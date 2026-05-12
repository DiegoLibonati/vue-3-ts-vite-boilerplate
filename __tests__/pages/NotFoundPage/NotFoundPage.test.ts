import { render, screen } from "@testing-library/vue";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Router } from "vue-router";

import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.vue";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [{ path: "/", component: { template: "<div />" } }],
  });

const renderPage = (): RenderResult =>
  render(NotFoundPage, {
    global: { plugins: [createTestRouter()] },
  });

describe("NotFoundPage", () => {
  describe("rendering", () => {
    it("should render the 404 code", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    });

    it("should render the not found message", () => {
      renderPage();
      expect(screen.getByText("The page you are looking for does not exist.")).toBeInTheDocument();
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
