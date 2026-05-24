import { render, screen } from "@testing-library/vue";
import { http, HttpResponse } from "msw";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Router } from "vue-router";

import UsersPage from "@/pages/UsersPage/UsersPage.vue";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockUsers } from "@tests/__mocks__/user.mock";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/users/:id", component: { template: "<div />" } },
    ],
  });

const renderPage = (): RenderResult =>
  render(UsersPage, {
    global: { plugins: [createTestRouter()] },
  });

describe("UsersPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
    });

    it("should show the loading state initially", () => {
      renderPage();
      expect(screen.getByText("Loading users…")).toBeInTheDocument();
    });

    it("should render the loading state with role status", () => {
      renderPage();
      expect(screen.getByRole("status")).toHaveTextContent("Loading users…");
    });

    it("should render the back to home link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Back to Home" })).toBeInTheDocument();
    });

    it("should render a card for each user after a successful fetch", async () => {
      mockMswServer.use(http.get("/users", () => HttpResponse.json(mockUsers)));

      renderPage();

      expect(
        await screen.findByRole("article", { name: "Profile of Leanne Graham" })
      ).toBeInTheDocument();
      expect(screen.getByRole("article", { name: "Profile of Ervin Howell" })).toBeInTheDocument();
    });

    it("should render a link for each user after a successful fetch", async () => {
      mockMswServer.use(http.get("/users", () => HttpResponse.json(mockUsers)));

      renderPage();

      expect(
        await screen.findByRole("link", { name: "View details for Leanne Graham" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "View details for Ervin Howell" })
      ).toBeInTheDocument();
    });

    it("should render an empty list when the API returns no users", async () => {
      mockMswServer.use(http.get("/users", () => HttpResponse.json([])));

      renderPage();
      await screen.findByRole("list");

      expect(screen.queryAllByRole("article")).toHaveLength(0);
    });
  });

  describe("error handling", () => {
    it("should show an error message when the API responds 500", async () => {
      mockMswServer.use(http.get("/users", () => new HttpResponse(null, { status: 500 })));

      renderPage();

      expect(await screen.findByText(/HTTP error! status: 500/)).toBeInTheDocument();
    });

    it("should render the error message with role alert", async () => {
      mockMswServer.use(http.get("/users", () => new HttpResponse(null, { status: 500 })));

      renderPage();

      expect(await screen.findByRole("alert")).toHaveTextContent(/HTTP error! status: 500/);
    });

    it("should not render any user cards on error", async () => {
      mockMswServer.use(http.get("/users", () => new HttpResponse(null, { status: 500 })));

      renderPage();
      await screen.findByText(/HTTP error!/);

      expect(screen.queryAllByRole("article")).toHaveLength(0);
    });
  });
});
