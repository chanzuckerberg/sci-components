import * as React from 'react';
import { FormControl, RadioGroup, FormLabel, styled } from "@mui/material";
import RawInputRadio from "@components/src/core/InputRadio";
import * as S from "@ds-stories/packages/components/src/core/InputRadio/__storybook__/index.stories";

function compose(S: any, key: string) {
  const meta: any = S.default ?? {};
  const st: any = S[key];
  const args: any = { ...(meta.args ?? {}), ...(st && st.args ? st.args : {}) };
  // Storybook resolves argTypes.mapping (control value -> real arg) before
  // rendering; mirror that so mapped args don't render raw.
  const at: any = { ...(meta.argTypes ?? {}), ...(st && st.argTypes ? st.argTypes : {}) };
  for (const k of Object.keys(args)) {
    const m = at[k] && at[k].mapping;
    if (m && typeof m === 'object' && args[k] in m) args[k] = m[args[k]];
  }
  const title: string = typeof meta.title === 'string' ? meta.title : '';
  const ctx: any = {
    args, name: key, title, kind: title, id: '', componentId: '',
    globals: {}, viewMode: 'story',
    parameters: (st && st.parameters) ?? meta.parameters ?? {},
  };
  let render: (() => any) | null = null;
  if (st && typeof st.render === 'function') render = () => st.render(args, ctx);
  else if (typeof st === 'function') render = () => st(args, ctx);
  else if (typeof meta.render === 'function') render = () => meta.render(args, ctx);
  else {
    const C = (st && st.component) || meta.component;
    if (C) render = () => React.createElement(C, args);
  }
  if (!render) return () => null;
  // [].concat: a single function is legal CSF decorator shorthand. A
  // decorator returning undefined (stubbed addon) falls through to the inner
  // render — otherwise one unrecognized addon blanks the cell silently.
  const decorators: any[] = ([] as any[]).concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
  return decorators.reduce((inner: any, dec: any) => () => {
    const out = dec(inner, ctx);
    return out === undefined ? inner() : out;
  }, render);
}

export const Default = /* Default */ compose(S, "Default");

// Test — mirrors packages/components/src/core/InputRadio/__storybook__/stories/test.tsx
// (TestDemo).
//
// Two things the raw story relies on do NOT survive into this preview module and
// are reproduced explicitly here:
//   1. StyledFormLabel — the story styles FormLabel with `fontBodySemiboldXxxs`
//      (reads MUI/emotion theme). In the preview, neither MUI's `styled` (bare
//      default theme, no SDS typography) nor `@emotion/styled` (empty theme in
//      this module's emotion instance) resolves the SDS font/color, so the label
//      renders as an unstyled 16px MUI FormLabel. The font tokens are inlined
//      instead (body/xxxs/600 = 600 11px/16px Inter, 0.06px; text-primary #000).
//   2. RadioGroup selection — the story uses `defaultValue="demo1"`, but the
//      RadioGroup context does not connect to the SDS Radio across the
//      source-pass boundary, so no option ever selects. Blocked is marked
//      `checked` directly (it forwards to the underlying MUI Radio via ...rest),
//      reproducing the story's rendered state (Blocked selected).
const StyledFormLabel = styled(FormLabel)`
  font-family: Inter, sans-serif;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: 0.06px;
  color: #000000;
`;

export function Test() {
  return (
    <FormControl>
      <StyledFormLabel id="demo-radio-buttons-group-label">
        Ticket Status
      </StyledFormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="input-radio-group"
        data-testid="radioButtonGroup"
        sx={{ mt: 5, gap: "8px" }}
      >
        <RawInputRadio
          checked
          data-testid="inputRadio"
          label="Blocked"
          value="demo1"
        />
        <RawInputRadio
          caption="Caption"
          data-testid="inputRadio"
          label="In Progress"
          value="demo2"
        />
        <RawInputRadio
          caption="Caption"
          data-testid="inputRadio"
          label="Completed"
          value="demo3"
        />
      </RadioGroup>
    </FormControl>
  );
}
