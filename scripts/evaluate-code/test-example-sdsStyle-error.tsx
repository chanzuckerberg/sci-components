import { Button, InputText, Icon } from "@czi-sds/components";

export const TestComponent = () => (
  <div>
    <Button sdsStyle="VALUE_DOES_NOT_EXIST" sdsType="primary">
      Click me
    </Button>
    <InputText
      placeholder="Enter text"
      id="test-input"
      label="Test Input"
      variant="filled"
    />
    <Icon sdsIcon="ChevronRight" sdsSize="s" />
  </div>
);
