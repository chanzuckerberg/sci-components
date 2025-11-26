import { useState } from "react";
import { Args } from "@storybook/react-webpack5";
import RawStackedBarChart from "../../index";
import { StackedBarChartDataItem } from "../../StackedBarChart.types";

export default function WithMouseEventsStory(args: Args): JSX.Element {
  const { data, ...rest } = args;
  const [hoveredSegment, setHoveredSegment] = useState<{
    item: StackedBarChartDataItem;
    index: number;
    source: "segment" | "legend";
  } | null>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const addToLog = (message: string) => {
    setEventLog((prev) => [message, ...prev].slice(0, 10)); // Keep last 10 events
  };

  const handleSegmentMouseEnter = (
    item: StackedBarChartDataItem,
    index: number
  ) => {
    setHoveredSegment({ item, index, source: "segment" });
    addToLog(`Segment Enter: ${item.name} (index ${index})`);
    console.log("Segment Mouse Enter:", { item, index });
  };

  const handleSegmentMouseLeave = (
    item: StackedBarChartDataItem,
    index: number
  ) => {
    setHoveredSegment(null);
    addToLog(`Segment Leave: ${item.name} (index ${index})`);
    console.log("Segment Mouse Leave:", { item, index });
  };

  const handleLegendItemMouseEnter = (
    item: StackedBarChartDataItem,
    index: number
  ) => {
    setHoveredSegment({ item, index, source: "legend" });
    addToLog(`Legend Enter: ${item.name} (index ${index})`);
    console.log("Legend Mouse Enter:", { item, index });
  };

  const handleLegendItemMouseLeave = (
    item: StackedBarChartDataItem,
    index: number
  ) => {
    setHoveredSegment(null);
    addToLog(`Legend Leave: ${item.name} (index ${index})`);
    console.log("Legend Mouse Leave:", { item, index });
  };

  const handleSegmentClick = (item: StackedBarChartDataItem, index: number) => {
    addToLog(`Segment Click: ${item.name} (index ${index})`);
    console.log("Segment Click:", { item, index });
  };

  const handleLegendItemClick = (
    item: StackedBarChartDataItem,
    index: number
  ) => {
    addToLog(`Legend Click: ${item.name} (index ${index})`);
    console.log("Legend Click:", { item, index });
  };

  return (
    <div
      style={{
        margin: 150,
      }}
    >
      <RawStackedBarChart
        {...rest}
        data={data}
        onSegmentMouseEnter={handleSegmentMouseEnter}
        onSegmentMouseLeave={handleSegmentMouseLeave}
        onLegendItemMouseEnter={handleLegendItemMouseEnter}
        onLegendItemMouseLeave={handleLegendItemMouseLeave}
        onSegmentClick={handleSegmentClick}
        onLegendItemClick={handleLegendItemClick}
      />

      <div style={{ marginTop: "40px" }}>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
            Current Hover State:
          </h3>
          {hoveredSegment ? (
            <div>
              <div>
                <strong>Name:</strong> {hoveredSegment.item.name}
              </div>
              <div>
                <strong>Value:</strong> {hoveredSegment.item.value}
              </div>
              <div>
                <strong>Index:</strong> {hoveredSegment.index}
              </div>
              <div>
                <strong>Source:</strong> {hoveredSegment.source}
              </div>
              {hoveredSegment.item.color && (
                <div>
                  <strong>Color:</strong>{" "}
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: hoveredSegment.item.color,
                      border: "1px solid #ccc",
                      marginLeft: "4px",
                      verticalAlign: "middle",
                    }}
                  />
                  {hoveredSegment.item.color}
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: "#999" }}>
              Hover over a bar segment or legend item
            </div>
          )}
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          <h3 style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
            Event Log (last 10 events):
          </h3>
          {eventLog.length === 0 ? (
            <div style={{ color: "#999", fontSize: "12px" }}>
              No events yet. Hover or click on segments or legend items to see
              events.
            </div>
          ) : (
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 20px",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              {eventLog.map((event, index) => (
                <li key={index} style={{ marginBottom: "4px" }}>
                  {event}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
