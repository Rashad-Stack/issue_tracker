"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

export default function IssueCarts({ open, closed, inProgress }: Props) {
  const data = [
    {
      label: "Open Issues",
      value: open,
    },
    { label: "Closed Issues", value: closed },
    { label: "In Progress Issues", value: inProgress },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
