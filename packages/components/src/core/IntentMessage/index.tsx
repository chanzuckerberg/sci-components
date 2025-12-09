import React from "react";
import Icon, { IconNameToSizes } from "src/core/Icon";
import {
  IntentMessageIntent,
  IntentMessageItem,
  IntentMessageProps,
} from "./IntentMessage.types";
import { StyledIntentMessage, StyledMessageItem } from "./style";

const IntentMessage = (props: IntentMessageProps): JSX.Element => {
  const { messages = [], children, border = false, ...rest } = props;

  const hasNegative = messages?.some((m) => m.intent === "negative");
  const hasNotice = messages?.some((m) => m.intent === "notice");
  const hasPositive = messages?.some((m) => m.intent === "positive");

  let borderColorIntent: IntentMessageIntent | undefined;
  if (hasNegative) borderColorIntent = "negative";
  else if (hasNotice) borderColorIntent = "notice";
  else if (hasPositive) borderColorIntent = "positive";

  const getIcon = (item: IntentMessageItem) => {
    const { icon, intent } = item;
    if (icon) {
      if (typeof icon !== "string") {
        return icon;
      }
      return <Icon sdsIcon={icon as keyof IconNameToSizes} sdsSize="xs" />;
    }

    switch (intent) {
      case "positive":
        return <Icon sdsIcon="CheckCircle" sdsSize="xs" />;
      case "negative":
      case "notice":
      default:
        return <Icon sdsIcon="ExclamationMarkCircle" sdsSize="xs" />;
    }
  };

  return (
    <StyledIntentMessage
      borderIntent={borderColorIntent}
      hasBorder={border}
      {...rest}
    >
      {children}
      {messages.map((message, index) => (
        <StyledMessageItem key={index} intent={message.intent}>
          {getIcon(message)}
          <span>{message.text}</span>
        </StyledMessageItem>
      ))}
    </StyledIntentMessage>
  );
};

export type {
  IntentMessageItem,
  IntentMessageProps,
} from "./IntentMessage.types";
export default IntentMessage;
