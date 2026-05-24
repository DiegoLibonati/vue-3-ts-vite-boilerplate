import { render, screen } from "@testing-library/vue";
import { http, HttpResponse } from "msw";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Router } from "vue-router";

import UserPage from "@/pages/UserPage/UserPage.vue";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockUser } from "@tests/__mocks__/user.mock";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/users", component: { template: "<div />" } },
    ],
  });

const renderPage = (id = "1"): RenderResult =>
  render(UserPage, {
    props: { id },
    global: { plugins: [createTestRouter()] },
  });

describe("UserPage", () => {
  describe("rendering", () => {
    it("should render the page title", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "User Detail" })).toBeInTheDocument();
    });

    it("should show the loading state initially", () => {
      renderPage();
      expect(screen.getByText("Loading user…")).toBeInTheDocument();
    });

    it("should render the loading state with role status", () => {
      renderPage();
      expect(screen.getByRole("status")).toHaveTextContent("Loading user…");
    });

    it("should render the back to users link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Back to Users list" })).toBeInTheDocument();
    });

    it("should render the user card after a successful fetch", async () => {
      mockMswServer.use(http.get("/users/1", () => HttpResponse.json(mockUser)));

      renderPage("1");

      expect(
        await screen.findByRole("article", { name: "Profile of Leanne Graham" })
      ).toBeInTheDocument();
    });

    it("should render the user name after a successful fetch", async () => {
      mockMswServer.use(http.get("/users/1", () => HttpResponse.json(mockUser)));

      renderPage("1");

      expect(await screen.findByRole("heading", { name: "Leanne Graham" })).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("should show an error message when the API responds 500", async () => {
      mockMswServer.use(http.get("/users/1", () => new HttpResponse(null, { status: 500 })));

      renderPage("1");

      expect(await screen.findByText(/HTTP error! status: 500/)).toBeInTheDocument();
    });

    it("should render the error message with role alert", async () => {
      mockMswServer.use(http.get("/users/1", () => new HttpResponse(null, { status: 500 })));

      renderPage("1");

      expect(await screen.findByRole("alert")).toHaveTextContent(/HTTP error! status: 500/);
    });

    it("should show an invalid id error when the id is not a number", async () => {
      renderPage("not-a-number");

      expect(await screen.findByText("Invalid user id")).toBeInTheDocument();
    });

    it("should not show the loading state after an error", async () => {
      mockMswServer.use(http.get("/users/1", () => new HttpResponse(null, { status: 500 })));

      renderPage("1");
      await screen.findByText(/HTTP error!/);

      expect(screen.queryByText("Loading user…")).not.toBeInTheDocument();
    });
  });
});
