import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
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
