import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import React from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
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

  // const priorities = React.useMemo(() => {
  //   return orderBy
  //     ? orderBy.reduce(
  //         (acc, intent, index) => {
  //           acc[intent] = index;
  //           return acc;
  //         },
  //         {} as Record<IntentMessageIntent, number>
  //       )
  //     : DEFAULT_INTENT_PRIORITY;
  // }, [orderBy]);
  const priorities = orderBy
    ? Object.fromEntries(orderBy.map((value, index) => [value, index]))
    : DEFAULT_INTENT_PRIORITY;

  /**
   * Determines the left border color based on message intent priority.
   * When multiple IntentMessage items are rendered together, the border color
   * corresponds to the highest-priority intent present.
   */
  const borderColorIntent = React.useMemo(() => {
    if (!messages || messages.length === 0) return undefined;

    // Find the message with the highest priority (lowest number)
    const highestPriorityMessage = messages.reduce((prev, current) => {
      const priorityPrev = priorities[prev.intent] ?? 999;
      const priorityCurrent = priorities[current.intent] ?? 999;
      return priorityPrev <= priorityCurrent ? prev : current;
    });

    return highestPriorityMessage.intent;
  }, [messages, priorities]);

  const getIcon = (item: IntentMessageItem) => {
    const { icon, intent } = item;
    if (icon) return icon;

    switch (intent) {
      case "positive":
        return <CheckCircleIcon {...INTERNAL_ICON_PROPS} size={12} />;
      case "negative":
      case "notice":
      default:
        return <WarningCircleIcon {...INTERNAL_ICON_PROPS} size={12} />;
    }
  };

  const sortedMessages = React.useMemo(() => {
    if (!autoOrder) return messages;

    return [...messages].sort((a, b) => {
      const priorityA = priorities[a.intent] ?? 999;
      const priorityB = priorities[b.intent] ?? 999;
      return priorityA - priorityB;
    });
  }, [messages, autoOrder, priorities]);

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
