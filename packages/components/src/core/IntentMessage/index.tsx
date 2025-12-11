import React from "react";
import Icon, { IconNameToSizes } from "src/core/Icon";
import {
  IntentMessageIntent,
  IntentMessageItem,
  IntentMessageProps,
} from "./IntentMessage.types";
import { StyledIntentMessage, StyledMessageItem } from "./style";

const DEFAULT_INTENT_PRIORITY: Record<IntentMessageIntent, number> = {
  negative: 0,
  notice: 1,
  positive: 2,
};

const IntentMessage = (props: IntentMessageProps): JSX.Element => {
  const {
    messages = [],
    children,
    border = false,
    autoOrder = true,
    orderBy,
    ...rest
  } = props;

  /**
   * Determines the left border color based on message intent priority.
   * When multiple IntentMessage items are rendered together, the border color
   * corresponds to the highest-priority intent present. Priority order:
   * 1. negative
   * 2. notice
   * 3. positive
   * For example, if both a negative and a notice intent are included, the border
   * color will use the negative intent.
   */
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

  const sortedMessages = React.useMemo(() => {
    if (!autoOrder) return messages;

    const priorities = orderBy
      ? orderBy.reduce(
          (acc, intent, index) => {
            acc[intent] = index;
            return acc;
          },
          {} as Record<IntentMessageIntent, number>
        )
      : DEFAULT_INTENT_PRIORITY;

    return [...messages].sort((a, b) => {
      const priorityA = priorities[a.intent] ?? 999;
      const priorityB = priorities[b.intent] ?? 999;
      return priorityA - priorityB;
    });
  }, [messages, autoOrder, orderBy]);

  return (
    <StyledIntentMessage
      borderIntent={borderColorIntent}
      hasBorder={border}
      {...rest}
    >
      {children}
      {sortedMessages.map((message, index) => (
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
