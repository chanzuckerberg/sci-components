import React from "react";
import IntentMessage, { IntentMessageItem } from "src/core/IntentMessage";
import InputText from "src/core/InputText";
import InputCheckbox from "src/core/InputCheckbox";

const sampleMessages: IntentMessageItem[] = [
  { intent: "negative", text: "Negative message" },
  { intent: "notice", text: "Notice message" },
  { intent: "positive", text: "Positive message" },
];

export const ScreenshotTestDemo = (): JSX.Element => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <div>
        <h3>No Border</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <IntentMessage messages={[sampleMessages[0]]}>
            <InputText
              label="Negative"
              id="input-negative"
              placeholder="Input placeholder"
              intent="negative"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[1]]}>
            <InputText
              label="Notice"
              id="input-notice"
              placeholder="Input placeholder"
              intent="notice"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[2]]}>
            <InputText
              label="Positive"
              id="input-positive"
              placeholder="Input placeholder"
              intent="positive"
            />
          </IntentMessage>
          <IntentMessage messages={sampleMessages}>
            <InputText
              label="Stacked"
              id="input-stacked"
              placeholder="Input placeholder"
              intent="negative"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[0]]}>
            <InputCheckbox
              id="checkbox-negative"
              label="Checkbox Label"
              caption="Caption"
              intent="negative"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[0]]}>
            <InputText
              label="Password"
              id="password-negative"
              placeholder="Password"
              type="password"
              intent="negative"
            />
          </IntentMessage>
        </div>
      </div>

      <div>
        <h3>With Border</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <IntentMessage messages={[sampleMessages[0]]} border>
            <InputText
              label="Negative"
              id="input-negative-border"
              placeholder="Input placeholder"
              intent="negative"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[1]]} border>
            <InputText
              label="Notice"
              id="input-notice-border"
              placeholder="Input placeholder"
              intent="notice"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[2]]} border>
            <InputText
              label="Positive"
              id="input-positive-border"
              placeholder="Input placeholder"
              intent="positive"
            />
          </IntentMessage>
          <IntentMessage messages={sampleMessages} border>
            <InputText
              label="Stacked"
              id="input-stacked-border"
              placeholder="Input placeholder"
              intent="negative"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[0]]} border>
            <InputCheckbox
              id="checkbox-negative-border"
              label="Checkbox Label"
              caption="Caption"
              intent="negative"
            />
          </IntentMessage>
          <IntentMessage messages={[sampleMessages[0]]} border>
            <InputText
              label="Password"
              id="password-negative-border"
              placeholder="Password"
              type="password"
              intent="negative"
            />
          </IntentMessage>
        </div>
      </div>
    </div>
  );
};
