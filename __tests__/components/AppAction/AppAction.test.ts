import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/vue";
import type { ActionProps } from "@/types/props";

import AppAction from "@/components/AppAction/AppAction.vue";

const renderComponent = (
  props: Partial<ActionProps> = {},
  slotContent = "Action"
): RenderResult => {
  const defaultProps: ActionProps = {
    id: "test-action",
    ariaLabel: "test action",
    ...props,
  };
  return render(AppAction, {
    props: defaultProps,
    slots: { default: slotContent },
  });
};

describe("AppAction", () => {
  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "test action" })).toBeInTheDocument();
    });

    it("should render with type button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "test action" })).toHaveAttribute("type", "button");
    });

    it("should render with the provided id", () => {
      renderComponent({ id: "my-action" });
      expect(screen.getByRole("button", { name: "test action" })).toHaveAttribute(
        "id",
        "my-action"
      );
    });

    it("should render with the provided aria-label", () => {
      renderComponent({ ariaLabel: "close dialog" });
      expect(screen.getByRole("button", { name: "close dialog" })).toBeInTheDocument();
    });

    it("should apply the app-action class", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "test action" })).toHaveClass("app-action");
    });

    it("should render the default slot content", () => {
      renderComponent({}, "Click me");
      expect(screen.getByRole("button", { name: "test action" })).toHaveTextContent("Click me");
    });
  });

  describe("behavior", () => {
    it("should emit click when clicked", async () => {
      const user = userEvent.setup();
      const { emitted } = renderComponent();

      await user.click(screen.getByRole("button", { name: "test action" }));

      expect(emitted()).toHaveProperty("click");
    });

    it("should emit click with the MouseEvent", async () => {
      const user = userEvent.setup();
      const { emitted } = renderComponent();

      await user.click(screen.getByRole("button", { name: "test action" }));

      expect(emitted<[MouseEvent]>("click")[0]?.[0]).toBeInstanceOf(MouseEvent);
    });
  });
});
