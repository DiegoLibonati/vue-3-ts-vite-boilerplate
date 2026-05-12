import { render, screen } from "@testing-library/vue";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Router } from "vue-router";

import HomePage from "@/pages/HomePage/HomePage.vue";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/about", component: { template: "<div />" } },
      { path: "/pinia", component: { template: "<div />" } },
      { path: "/context", component: { template: "<div />" } },
      { path: "/users", component: { template: "<div />" } },
    ],
  });

const renderPage = (): RenderResult =>
  render(HomePage, {
    global: { plugins: [createTestRouter()] },
  });

describe("HomePage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "Vue 3 TS Vite Boilerplate" })
      ).toBeInTheDocument();
    });

    it("should render the subtitle", () => {
      renderPage();
      expect(screen.getByText(/Production-ready starting point/i)).toBeInTheDocument();
    });

    it("should render the main navigation", () => {
      renderPage();
      expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    });

    it("should render the About link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to About page" })).toHaveTextContent("About");
    });

    it("should render the Pinia link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to Pinia example" })).toHaveTextContent("Pinia");
    });

    it("should render the Context link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to Context example" })).toHaveTextContent(
        "Context"
      );
    });

    it("should render the Users link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go to Users page" })).toHaveTextContent("Users");
    });
  });
});
