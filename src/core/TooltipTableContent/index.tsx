import { Table, TableBody, TableContainer, TableRow } from "@material-ui/core";
import React from "react";
import {
  Alert,
  ExtraProps,
  RowLabel,
  RowValue,
  Section,
  SectionLabel,
} from "./style";

type TooltipTableContentProps = ExtraProps;

export { TooltipTableContentProps };

const TooltipTableContent = (props: TooltipTableContentProps): JSX.Element => {
  const { alert, data, ...rest } = props;

  return (
    <TableContainer {...rest}>
      {alert && <Alert>{alert}</Alert>}
      {data?.map((section) => (
        <Section disabled={section.disabled} key={`${section.label}`}>
          <SectionLabel disabled={section.disabled}>
            {section.label}
          </SectionLabel>
          <Table size="small">
            <TableBody>
              {section.dataRows.map((row) => (
                <TableRow key={row.label}>
                  <RowLabel disabled={section.disabled}>{row.label}</RowLabel>
                  <RowValue disabled={section.disabled} align="left">
                    {row.value}
                  </RowValue>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>
      ))}
    </TableContainer>
  );
};

export default TooltipTableContent;
