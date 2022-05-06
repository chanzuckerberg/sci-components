import { Table, TableBody, TableContainer, TableRow } from "@material-ui/core";
import React from "react";
import {
  Alert,
  RowLabel,
  RowValue,
  Section,
  SectionLabel,
  TooltipTableExtraProps,
} from "./style";

type TooltipTableContentProps = TooltipTableExtraProps;

export type { TooltipTableContentProps };

const TooltipTableContent = (props: TooltipTableContentProps): JSX.Element => {
  const { contentAlert, data, itemAlign = "right", ...rest } = props;

  return (
    <TableContainer {...rest}>
      {contentAlert && <Alert>{contentAlert}</Alert>}
      {data?.map((section) => (
        <Section disabled={section.disabled} key={`${section.label}`}>
          <SectionLabel disabled={section.disabled} label={section.label}>
            {section.label}
          </SectionLabel>
          <Table size="small">
            <TableBody>
              {section.dataRows.map((row) => (
                <TableRow key={row.label}>
                  <RowLabel disabled={section.disabled} align="left">
                    {row.label}
                  </RowLabel>
                  <RowValue disabled={section.disabled} align={itemAlign}>
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
