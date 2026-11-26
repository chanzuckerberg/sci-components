export type IntentMessageIntent = "negative" | "notice" | "positive";

export interface IntentMessageItem {
  intent: IntentMessageIntent;
  /**
   * Replaces the default icon, usually with a Phosphor or `@czi-sds/icons`
   * icon. It is drawn at 12px, and its fill is overridden by the intent color.
   */
  icon?: React.ReactElement;
  text: string;
}

export interface IntentMessageProps {
  autoOrder?: boolean;
  orderBy?: IntentMessageIntent[];
  children?: React.ReactNode;
  messages?: IntentMessageItem[];
  border?: boolean;
}
