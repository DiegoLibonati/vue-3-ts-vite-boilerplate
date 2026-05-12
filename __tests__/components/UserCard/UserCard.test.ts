import { render, screen } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";
import type { UserCardProps } from "@/types/props";

import UserCard from "@/components/UserCard/UserCard.vue";

const defaultProps: UserCardProps = {
  name: "Leanne Graham",
  username: "Bret",
  email: "sincere@april.biz",
  phone: "1-770-736-8031",
  website: "hildegard.org",
  company: { name: "Romaguera-Crona" },
};

const renderComponent = (props: Partial<UserCardProps> = {}): RenderResult =>
  render(UserCard, { props: { ...defaultProps, ...props } });

describe("UserCard", () => {
  describe("rendering", () => {
    it("should render the user name as a heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "Leanne Graham" })).toBeInTheDocument();
    });

    it("should render the username with the @ prefix", () => {
      renderComponent();
      expect(screen.getByText("@Bret")).toBeInTheDocument();
    });

    it("should render the email as a mailto link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "sincere@april.biz" })).toHaveAttribute(
        "href",
        "mailto:sincere@april.biz"
      );
    });

    it("should render the phone as a tel link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "1-770-736-8031" })).toHaveAttribute(
        "href",
        "tel:1-770-736-8031"
      );
    });

    it("should render the website as an external link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "hildegard.org" })).toHaveAttribute(
        "href",
        "https://hildegard.org"
      );
    });

    it("should render the company name", () => {
      renderComponent();
      expect(screen.getByRole("article", { name: "Profile of Leanne Graham" })).toHaveTextContent(
        "Romaguera-Crona"
      );
    });
  });

  describe("accessibility", () => {
    it("should have an aria-label with the user name on the article", () => {
      renderComponent();
      expect(screen.getByRole("article", { name: "Profile of Leanne Graham" })).toBeInTheDocument();
    });

    it("should label the username paragraph with the username value", () => {
      renderComponent();
      expect(screen.getByLabelText("Username: Bret")).toBeInTheDocument();
    });
  });
});
