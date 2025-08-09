import { Table, TableBody, TableRow } from "@mui/material";
import {
  Alert,
  RowLabel,
  RowValue,
  Section,
  SectionLabel,
  StyledTableContainer,
  TooltipTableExtraProps,
} from "./style";

type TooltipTableContentProps = TooltipTableExtraProps;

export type { TooltipTableContentProps };

/**
 * @see https://mui.com/material-ui/react-table/
 */
const TooltipTableContent = (props: TooltipTableContentProps): JSX.Element => {
  const {
    contentAlert,
    data,
    itemAlign = "right",
    showSectionHeader = true,
    ...rest
  } = props;

  return (
    <StyledTableContainer {...rest}>
      {contentAlert && <Alert>{contentAlert}</Alert>}
      {data?.map((section, index) => (
        <Section
          disabled={section.disabled}
          key={`${section.label + String(index)}`}
        >
          {showSectionHeader && (
            <SectionLabel disabled={section.disabled} label={section.label}>
              {section.label}
            </SectionLabel>
          )}
          <Table size="small">
            <TableBody>
              {section.dataRows.map((row, rowIndex) => (
                <TableRow key={row.label + String(rowIndex)}>
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
    </StyledTableContainer>
  );
};

export default TooltipTableContent;
