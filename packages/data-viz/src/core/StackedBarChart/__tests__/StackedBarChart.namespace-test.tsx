import { StackedBarChart, StackedBarChartProps } from "@czi-sds/data-viz";
import React from "react";

const StackedBarChartNameSpaceTest = (props: StackedBarChartProps) => {
  return (
    <>
      {/* Basic usage */}
      <StackedBarChart
        data={[
          {
            name: "Category 1",
            value: 100,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Category 2",
            value: 200,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Category 3",
            value: 300,
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
      />

      {/* With title and badge */}
      <StackedBarChart
        title="Domain Distribution"
        badge="7 items"
        data={[
          {
            name: "Transcriptomic",
            value: 117,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Imaging",
            value: 61,
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
        width="400px"
        showLegend
        showLegendValues
      />

      {/* Percentage mode with selection */}
      <StackedBarChart
        title="Data Distribution"
        data={[
          {
            name: "Type A",
            value: 50,
            color: "#FF5733",
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Type B",
            value: 30,
            color: "#33FF57",
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Type C",
            value: 20,
            color: "#3357FF",
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
        mode="percentage"
        selectedIndices={[0, 1]}
        onSelectionChange={(indices, selectedData) =>
          console.log(indices, selectedData)
        }
        showLegend
        showLegendValues
      />

      {/* Amount mode with maxAmount and remaining segment */}
      <StackedBarChart
        title="Storage Usage"
        data={[
          {
            name: "Documents",
            value: 150,
            unit: "GB",
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Images",
            value: 200,
            unit: "GB",
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Videos",
            value: 100,
            unit: "GB",
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
        mode="amount"
        maxAmount={1000}
        unit="GB"
        remainingLabel="Available"
        remainingUnit="GB"
        showLegend
        showLegendValues
        barHeight={20}
        width={500}
      />

      {/* With disabled items */}
      <StackedBarChart
        data={[
          {
            name: "Active Category",
            value: 100,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Disabled Category",
            value: 50,
            disabled: true,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Another Active",
            value: 75,
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
        selectedIndices={[0]}
        onSelectionChange={(indices, selectedData) =>
          console.log(indices, selectedData)
        }
      />

      {/* Without legend */}
      <StackedBarChart
        data={[
          {
            name: "Item 1",
            value: 40,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Item 2",
            value: 60,
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
        showLegend={false}
        width="300px"
        barHeight={12}
      />

      {/* Hidden badge */}
      <StackedBarChart
        title="Chart with no badge"
        data={[
          {
            name: "A",
            value: 10,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "B",
            value: 20,
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
        hideBadge
      />

      {/* Custom badge text */}
      <StackedBarChart
        title="Custom Badge"
        badge="Custom: 5/10"
        data={[
          {
            name: "X",
            value: 100,
            tooltip: { showSectionHeader: false, data: [] },
          },
          {
            name: "Y",
            value: 200,
            tooltip: { showSectionHeader: false, data: [] },
          },
        ]}
      />
    </>
  );
};
