import { useTheme } from "@emotion/react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import cx from "classnames";
import React from "react";
import {
  alertCss,
  disabledCss,
  ExtraProps,
  rowLabelCss,
  rowValueCss,
  sectionCss,
  sectionLabelCss,
} from "./style";

type TooltipTableContentProps = ExtraProps;

export { TooltipTableContentProps };

const TooltipTableContent = (props: TooltipTableContentProps): JSX.Element => {
  const { alert, data, ...rest } = props;

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    theme,
    /* stylelint-enable property-no-unknown -- false positive */
  };

  const alertClassName = alertCss(extraProps);
  const disabled = disabledCss(extraProps);
  const sectionClassName = sectionCss(extraProps);
  const sectionLabel = sectionLabelCss(extraProps);
  const rowLabel = rowLabelCss(extraProps);
  const rowValue = rowValueCss(extraProps);

  return (
    <TableContainer {...rest}>
      {alert && <div className={alertClassName}>{alert}</div>}
      {data?.map((section) => (
        <div
          className={cx(sectionClassName, section.disabled && disabled)}
          key={`${section.label}`}
        >
          <div className={cx(sectionLabel, section.disabled && disabled)}>
            {section.label}
          </div>
          <Table size="small">
            <TableBody>
              {section.dataRows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell
                    className={cx(rowLabel, section.disabled && disabled)}
                  >
                    {row.label}
                  </TableCell>
                  <TableCell
                    className={cx(rowValue, section.disabled && disabled)}
                    align="left"
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </TableContainer>
  );
};

export default TooltipTableContent;
