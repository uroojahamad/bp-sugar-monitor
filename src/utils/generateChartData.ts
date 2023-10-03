export type ChartInput = ChartReading[]

export interface ChartReading {
  category: string
  count: string
}

export interface Data {
  labels: string[]
  datasets: Dataset[]
}

export interface Dataset {
  label: string
  data: number[]
  backgroundColor: string[]
  borderColor: string[]
  borderWidth: number
}

export const generateChartData = (input: ChartInput): Data => {
    const labels: string[] = [];
    const data: number[]= [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];

    input.forEach((category) => {
      labels.push(category.category);
      data.push(Number(category.count));

      // Generate random color
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      backgroundColor.push(`rgba(${r},${g},${b}, 0.2)`);
      borderColor.push(`rgba(${r},${g},${b}, 1)`);
    });

    return {
      labels,
      datasets: [
        {
          label: "Number of Cases",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };