import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type DistribuicaoPieChartProps = {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
};

const defaultColors = ['#2563eb', '#16a34a', '#ef4444', '#94a3b8'];

export function DistribuicaoPieChart({ data, colors = defaultColors }: DistribuicaoPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="85%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4}>
          {data.map((_entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
