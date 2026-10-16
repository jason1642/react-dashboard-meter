import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadialGauge } from "./RadialGauge";
import type { RadialGaugeProps } from "./types";

const standardLabels: NonNullable<
  RadialGaugeProps["labelOptions"]
>["fixedLabels"] = ["0", "25", "50", "75", "100"];

const meta = {
  title: "Dashboard Meter/RadialGauge",
  component: RadialGauge,
  tags: ["autodocs"],
  args: {
    value: 68,
    shape: "half-circle",
    variant: "filled-arc",
    roundedCaps: true,
    showValue: true,
    showTarget: false,
    target: 80,
    ticks: "labels-and-ticks",
    range: [0, 100],
    labelOptions: {
      fixedLabels: standardLabels,
      labelPosition: "outward",
    },
    progressBarOptions: {
      fillerTriColors: ["#34d399", "#fbbf24", "#fb7185"],
      emptyAreaColor: "#283244",
      colorMode: "thresholds",
    },
    valueOptions: {
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
          backgroundColor: "#283244",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    shape: { control: "select", options: ["half-circle", "three-quarter"] },
    variant: { control: "select", options: ["filled-arc", "needle"] },
    ticks: {
      control: "select",
      options: ["labels-and-ticks", "ticks-only", "none", "labels-only"],
    },
    roundedCaps: { control: "boolean" },
    showValue: { control: "boolean" },
    showTarget: { control: "boolean" },
    progressBarOptions: { control: "object" },
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
    valueOptions: {
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

export const SingleColor: Story = {
  args: {
    value: 68,
    progressBarOptions: {
      colorMode: "single-color",
      color: "#60a5fa",
      thickness: 18,
    },
  },
};
