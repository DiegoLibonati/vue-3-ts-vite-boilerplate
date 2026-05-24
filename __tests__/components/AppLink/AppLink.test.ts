import { render, screen } from "@testing-library/vue";
import { createMemoryHistory, createRouter } from "vue-router";

import type { RenderResult } from "@testing-library/vue";
import type { Router } from "vue-router";
import type { LinkProps } from "@/types/props";

import AppLink from "@/components/AppLink/AppLink.vue";

const createTestRouter = (): Router =>
  createRouter({
    history: createMemoryHistory("/"),
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/about", component: { template: "<div />" } },
    ],
  });

const renderComponent = (props: Partial<LinkProps> = {}, slotContent = "Link"): RenderResult => {
  const defaultProps: LinkProps = {
    id: "test-link",
    href: "/about",
    ariaLabel: "test link",
    ...props,
  };
  return render(AppLink, {
    props: defaultProps,
    slots: { default: slotContent },
    global: { plugins: [createTestRouter()] },
  });
};

describe("AppLink", () => {
  describe("rendering", () => {
    it("should render a link element", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "test link" })).toBeInTheDocument();
    });

    it("should render the slot content", () => {
      renderComponent({}, "About");
      expect(screen.getByRole("link", { name: "test link" })).toHaveTextContent("About");
    });

    it("should render with the provided id", () => {
      renderComponent({ id: "my-link" });
      expect(screen.getByRole("link", { name: "test link" })).toHaveAttribute("id", "my-link");
    });

    it("should apply the app-link class", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "test link" })).toHaveClass("app-link");
    });
  });

  describe("external links", () => {
    it("should render an anchor element for external https URLs", () => {
      renderComponent({ href: "https://example.com", ariaLabel: "external link" });
      const link = screen.getByRole("link", { name: "external link" });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("should render an anchor element for external http URLs", () => {
      renderComponent({ href: "http://example.com", ariaLabel: "external link" });
      expect(screen.getByRole("link", { name: "external link" })).toHaveAttribute(
        "href",
        "http://example.com"
      );
    });

    it("should add rel noopener noreferrer when target is _blank", () => {
      renderComponent({ href: "https://example.com", target: "_blank" });
      expect(screen.getByRole("link", { name: "test link" })).toHaveAttribute(
        "rel",
        "noopener noreferrer"
      );
    });

    it("should not add rel when target is _self", () => {
      renderComponent({ href: "https://example.com", target: "_self" });
      expect(screen.getByRole("link", { name: "test link" })).not.toHaveAttribute("rel");
    });
  });

  describe("internal links", () => {
    it("should render an anchor element for internal paths", () => {
      renderComponent({ href: "/about" });
      const link = screen.getByRole("link", { name: "test link" });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("should not add rel for internal links", () => {
      renderComponent({ href: "/about" });
      expect(screen.getByRole("link", { name: "test link" })).not.toHaveAttribute("rel");
    });
  });
});
