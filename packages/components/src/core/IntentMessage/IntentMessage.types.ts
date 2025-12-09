import { IconNameToSizes } from "src/core/Icon";

export type IntentMessageIntent = "negative" | "notice" | "positive";

export interface IntentMessageItem {
  intent: IntentMessageIntent;
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  text: string;
}

export interface IntentMessageProps {
  children?: React.ReactNode;
  messages?: IntentMessageItem[];
  border?: boolean;
}
