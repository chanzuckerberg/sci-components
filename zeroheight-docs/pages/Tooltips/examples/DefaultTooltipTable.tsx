import { ButtonIcon, Tooltip, TooltipTable } from "@czi-sds/components";

function App() {
  const data = [
    {
      dataRows: [
        { label: "First", value: 1 },
        { label: "Second", value: 2 },
      ],
      label: "Section 1",
    },
    {
      dataRows: [{ label: "Third", value: 3 }],
      label: "Section 2",
    },
  ];
  return (
    <div className="app">
      <Tooltip
        arrow
        title={<TooltipTable itemAlign="right" data={data} />}
        placement="right-end"
      >
        <ButtonIcon sdsType="secondary" sdsSize="large" icon="InfoCircle" />
      </Tooltip>
    </div>
  );
}

export default App;
