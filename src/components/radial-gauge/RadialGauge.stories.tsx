import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadialGauge } from "./RadialGauge";
import type { GaugeMeterProps } from "./RadialGauge.types";

const standardLabels: NonNullable<
  GaugeMeterProps["labelOptions"]
>["fixedLabels"] = ["0", "25", "50", "75", "100"];

const meta = {
  title: "Dashboard Meter/RadialGauge",
  component: RadialGauge,
  tags: ["autodocs"],
  args: {
    value: 68,
    shape: "half-circle",
    variant: "filled-arc",
    range: [0, 100],
    innerAreaColor: "#ffffff",
    labelOptions: {
      fixedLabels: standardLabels,
      labelPosition: "outward",
    },
    progressBarOptions: {
      fillerTriColors: ["#16a34a", "#facc15", "#ef4444"],
      emptyAreaColor: "#d1d5db",
    },
    titleOptions: {
      appendedText: "%",
      toFixedAmount: 0,
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: "border-box",
          width: "min(440px, 90vw)",
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadialGauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NearlyEmpty: Story = {
  args: {
    value: 12,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const CustomRange: Story = {
  args: {
    value: 720,
    range: [0, 1000],
    titleOptions: {
      appendedText: " pts",
      toFixedAmount: 0,
    },
    labelOptions: {
      fixedLabels: ["0", "250", "500", "750", "1000"],
      labelPosition: "outward",
    },
  },
};

export const InsideLabels: Story = {
  args: {
    value: 42,
    innerAreaSize: 78,
    labelOptions: {
      fixedLabels: standardLabels,
      labelPosition: "inside",
      labelStyles: {
        color: "#374151",
      },
    },
  },
};

export const ThreeQuarterNeedle: Story = {
  args: {
    value: 72,
    shape: "three-quarter",
    variant: "needle",
    labelOptions: {
      fixedLabels: ["0", "25", "50", "75", "100"],
      labelPosition: "outward",
    },
  },
};

export const ThreeQuarterFilledArc: Story = {
  args: {
    value: 72,
    shape: "three-quarter",
    variant: "filled-arc",
  },
};
