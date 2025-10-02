# Icons

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

**Lock_Xl**

---

**Lock_L**

---

**Lock_S**

---

**Lock_Xs**

---

| Used only for Icon Buttons. | Buttons, Callouts, Notifications, Tags, etc. | Dropdown Inputs, Search Inputs, Segmented Control, etc. | Checkbox Inputs, Filter Tags, Multi-select Menu Items, etc. |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |

### Custom Icons

In rare circumstances, an icon will need added to the UI without using the Icon component (most often in cases where the icon being used is not part of the icon set within the design system). In these cases, an svg of the icon should always be used and its size should be set using one of the sizing variables below. The dimensions established with these variables align to the dimensions used by the `sdsSize` prop on the Icon component.

| **Visual** |     | **SDS Variable** |     | **Value**                    |     | **Equivalent Value in sdsSize Prop** |
| ---------- | --- | ---------------- | --- | ---------------------------- | --- | ------------------------------------ |
|            |     | `iconSizeXl`     |     | `height: 32px` `width: 32px` |     | `extraLarge`                         |
|            |     | `iconSizeL`      |     | `height: 24px` `width: 24px` |     | `large`                              |
|            |     | `iconSizeS`      |     | `height: 16px` `width: 16px` |     | `small`                              |
|            |     | `iconSizeXs`     |     | `height: 12px` `width: 12px` |     | `extraSmall`                         |

### Icons

The table below provides a visual of each icon, its name to be passed in the `sdsIcon` prop, as well as the sizes available to be passed in the `sdsSize` prop.

| **Bacteria** | **Bar Charts** |     |     |
| ------------ | -------------- | --- | --- |

**Bacteria**

---

**BarChartHorizontal3**

---

**BarChartVertical3**

---

**BarChartVertical4**

---

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

**Book**

---

**Check**

---

**CheckCircle**

---

**ChevronDown**

---

| **Chevrons** |     |     |     |
| ------------ | --- | --- | --- |

**ChevronDown2**

---

**ChevronLeft**

---

**ChevronLeft2**

---

**ChevronRight**

---

| **Chevrons** |     |     | **Circles** |
| ------------ | --- | --- | ----------- |

**ChevronRight2**

---

**ChevronUp**

---

**ChevronUp2**

---

**CirclesOverlap2**

---

| **Code** | **Compass** | **Copy** | **Cube** |
| -------- | ----------- | -------- | -------- |

**Code**

---

**Compass**

---

**Copy**

---

**Cube**

---

| **DNA** | **Document** | **Dots** | **Download** |
| ------- | ------------ | -------- | ------------ |

**DNA**

---

**Document**

---

**DotsHorizontal3**

---

**Download**

---

| **Edit** | **Envelope** | **Exclamation Marks** |     |
| -------- | ------------ | --------------------- | --- |

**Edit**

---

**Envelope**

---

**ExclamationmarkCircle**

---

**ExclamationmarkSpeechBubble**

---

| **Eyes** |     | **Filter** | **Flags** |
| -------- | --- | ---------- | --------- |

**EyeClosed**

---

**EyeOpen**

---

**Filter**

---

**FlagCheck**

---

| **Flags** |     |     | **Flasks** |
| --------- | --- | --- | ---------- |

**FlagOutline**

---

**FlagQuestionmark**

---

**FlagXmark**

---

**Flask**

---

| **Flasks** |     | **Gear** | **Github** |
| ---------- | --- | -------- | ---------- |

**FlaskPrivate**

---

**FlaskPublic**

---

**Gear**

---

**Github**

---

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

**Globe**

---

**GlobeBasic**

---

**Grid**

---

**GridDots3**

---

| **Grids** |     | **House** | **Info** |
| --------- | --- | --------- | -------- |

**GridPrivate**

---

**GridPublic**

---

**House**

---

**InfoCircle**

---

| **Info** | **Life Ring** | **Lightbulb** | **Lines** |
| -------- | ------------- | ------------- | --------- |

**InfoSpeechBubble**

---

**LifeRing**

---

**Lightbulb**

---

**LinesDashed3Solid1**

---

| **Lines** | **Link** | **List** | **Loading** |
| --------- | -------- | -------- | ----------- |

**LinesHorizontal3**

---

**Link**

---

**List**

---

**Loading**

---

| **Locks** |     | **Minus** | **Open** |
| --------- | --- | --------- | -------- |

**Lock**

---

**LockCircle**

---

**Minus**

---

**Open**

---

| **Pause** | **People** |     | **Percentage** |
| --------- | ---------- | --- | -------------- |

**Pause**

---

**People**

---

**Person**

---

**Percentage**

---

| **Pins** |     | **Play** | **Pluses** |
| -------- | --- | -------- | ---------- |

**Pin**

---

**PinLocation**

---

**Play**

---

**Plus**

---

| **Pluses** | **Projects** |     | **Puzzle Piece** |
| ---------- | ------------ | --- | ---------------- |

**PlusCircle**

---

**ProjectPrivate**

---

**ProjectPublic**

---

**PuzzlePiece**

---

| **Question Marks** |     | **Quote** | **Read** |
| ------------------ | --- | --------- | -------- |

**Questionmark**

---

**QuestionMarkCircle**

---

**Quote**

---

**Read**

---

| **Refresh** | **Report** | **Rocket** | **Rotate** |
| ----------- | ---------- | ---------- | ---------- |

**Refresh**

---

**Report**

---

**Rocket**

---

**RotateLeft**

---

| **Rotate** | **Save** | **Scale** | **Scatter Plot** |
| ---------- | -------- | --------- | ---------------- |

**RotateRight**

---

**Save**

---

**Scale**

---

**ScatterPlot**

---

| **Search** |     | **Send** | **Share** |
| ---------- | --- | -------- | --------- |

**Search**

---

**SearchLinesHorizontal3**

---

**Send**

---

**Share**

---

| **Sliders** | **Speech Bubbles** | **Squares** | **Stars** |
| ----------- | ------------------ | ----------- | --------- |

**SlidersHorizontal**

---

**SpeechBubbles**

---

**SquareOnDashedSquare**

---

**Star**

---

| **Stars** | **Table** | **Thumbs** |     |
| --------- | --------- | ---------- | --- |

**Starburst**

---

**Table**

---

**ThumbsDown**

---

**ThumbsUp**

---

| **Trash Can** | **Trees** |     |     |
| ------------- | --------- | --- | --- |

**TrashCan**

---

**TreeDendogram**

---

**TreeHorizontal**

---

**TreeHorizontalPrivate**

---

| **Trees** |     |     | **Triangles** |
| --------- | --- | --- | ------------- |

**TreeHorizontalPublic**

---

**TreeHorizontalTopRightFilled**

---

**TreeVertical**

---

**TriangleDown**

---

| **Triangles** |     |     | **Update** |
| ------------- | --- | --- | ---------- |

**TriangleLeft**

---

**TriangleRight**

---

**TriangleUp**

---

**Update**

---

| **Upload** | **Viruses** |     | **Widget** |
| ---------- | ----------- | --- | ---------- |

**Upload**

---

**Virus**

---

**VirusCoV2**

---

**Widget**

---

| **X Marks** |     |     |     |
| ----------- | --- | --- | --- |

**Xmark**

---

**XmarkCircle**

---

---

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

**Lock_Xl**

---

**Lock_L**

---

**Lock_S**

---

**Lock_Xs**

---

| Used only for Icon Buttons. | Buttons and Tags | Dropdown Input and Search Inputs | Checkbox Inputs, Tags, Menu Items |
| --------------------------- | ---------------- | -------------------------------- | --------------------------------- |

### Custom Icons

In rare circumstances, an icon will need added to the UI without using the Icon component (most often in cases where the icon being used is not part of the icon set within the design system). In these cases, an svg of the icon should always be used and its size should be set using one of the sizing variables below. The dimensions established with these variables align to the dimensions used by the `sdsSize` prop on the Icon component.

| **Visual** |     | **Variable** |     | **Value**                    |     | **Equivalent sdsSize Value** |
| ---------- | --- | ------------ | --- | ---------------------------- | --- | ---------------------------- |
|            |     | `iconSizeXl` |     | `height: 32px` `width: 32px` |     | `extraLarge`                 |
|            |     | `iconSizeL`  |     | `height: 22px` `width: 22px` |     | `large`                      |
|            |     | `iconSizeS`  |     | `height: 14px` `width: 14px` |     | `small`                      |
|            |     | `iconSizeXs` |     | `height: 10px` `width: 10px` |     | `extraSmall`                 |

### Icons

The table below provides a visual of each icon, its name to be passed in the `sdsIcon` prop, as well as the sizes available to be passed in the `sdsSize` prop.

| **Bacteria** | **Bar Charts** |     |     |
| ------------ | -------------- | --- | --- |

**Bacteria**

---

**BarChartHorizontal3**

---

**BarChartVertical3**

---

**BarChartVertical4**

---

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

**Book**

---

**Check**

---

**CheckCircle**

---

**ChevronDown**

---

| **Chevrons** |     |     |     |
| ------------ | --- | --- | --- |

**ChevronLeft**

---

**ChevronLeft2**

---

**ChevronRight**

---

**ChevronRight2**

---

| **Chevrons** | **Circles** | **Code** | **Copy** |
| ------------ | ----------- | -------- | -------- |

**ChevronUp**

---

**CirclesOverlap2**

---

**Code**

---

**Compass**

---

| **Copy** | **Cube** | **DNA** | **Document** |
| -------- | -------- | ------- | ------------ |

**Copy**

---

**Cube**

---

**DNA**

---

**Document**

---

| **Dots** | **Download** | **Edit** | **Exclamation Marks** |
| -------- | ------------ | -------- | --------------------- |

**DotsHorizontal3**

---

**Download**

---

**Edit**

---

**ExclamationmarkCircle**

---

| **Exclamation Marks** | **Eyes** |     | **Filter** |
| --------------------- | -------- | --- | ---------- |

**ExclamationmarkSpeechBubble**

---

**EyeClosed**

---

**EyeOpen**

---

**Filter**

---

| **Flags** |     |     |     |
| --------- | --- | --- | --- |

**FlagCheck**

---

**FlagOutline**

---

**FlagQuestionmark**

---

**FlagXmark**

---

| **Flasks** |     |     | **Gear** |
| ---------- | --- | --- | -------- |

**Flask**

---

**FlaskPrivate**

---

**FlaskPublic**

---

**Gear**

---

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

**Globe**

---

**GlobeBasic**

---

**Grid**

---

**GridPrivate**

---

| **Grids** | **House** | **Info** |     |
| --------- | --------- | -------- | --- |

**GridPublic**

---

**House**

---

**InfoCircle**

---

**InfoSpeechBubble**

---

| **Life Ring** | **Lightbulb** | **Lines** |     |
| ------------- | ------------- | --------- | --- |

**LifeRing**

---

**Lightbulb**

---

**LinesDashed3Solid1**

---

**LinesHorizontal3**

---

| **Link** | **List** | **Loading** | **Locks** |
| -------- | -------- | ----------- | --------- |

**Link**

---

**List**

---

**Loading**

---

**Lock**

---

| **Locks** | **Minus** | **Open** | **People** |
| --------- | --------- | -------- | ---------- |

**LockCircle**

---

**Minus**

---

**Open**

---

**People**

---

| **Person** | **Percentage** | **Pins** |     |
| ---------- | -------------- | -------- | --- |

**Person**

---

**Percentage**

---

**Pin**

---

**PinLocation**

---

| **Play** | **Pluses** |     | **Projects** |
| -------- | ---------- | --- | ------------ |

**Play**

---

**Plus**

---

**PlusCircle**

---

**ProjectPrivate**

---

| **Projects** | **Puzzle Piece** | **Question Mark** | **Quote** |
| ------------ | ---------------- | ----------------- | --------- |

**ProjectPublic**

---

**PuzzlePiece**

---

**Questionmark**

---

**Quote**

---

| **Refresh** | **Save** | **Search** |     |
| ----------- | -------- | ---------- | --- |

**Refresh**

---

**Save**

---

**Search**

---

**SearchLinesHorizontal3**

---

| **Share** | **Sliders** | **Speech Bubbles** | **Squares** |
| --------- | ----------- | ------------------ | ----------- |

**Share**

---

**SlidersHorizontal**

---

**SpeechBubbles**

---

**SquareOnDashedSquare**

---

| **Stars** |     | **Table** | **Trash Can** |
| --------- | --- | --------- | ------------- |

**Star**

---

**Starburst**

---

**Table**

---

**TrashCan**

---

| **Trees** |     |     |     |
| --------- | --- | --- | --- |

**TreeDendogram**

---

**TreeHorizontal**

---

**TreeHorizontalTopRightFilled**

---

**TreeHorizontalPrivate**

---

| **Trees** |     | **Triangles** |     |
| --------- | --- | ------------- | --- |

**TreeHorizontalPublic**

---

**TreeVertical**

---

**TriangleDown**

---

**TriangleLeft**

---

| **Triangles** |     | **Upload** | **Viruses** |
| ------------- | --- | ---------- | ----------- |

**TriangleRight**

---

**TriangleUp**

---

**Upload**

---

**Virus**

---

| **Viruses** | **Xmarks** |     |     |
| ----------- | ---------- | --- | --- |

**VirusCoV2**

---

**Xmark**

---

**XmarkCircle**

---

---

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

**Lock_Xl**

---

**Lock_L**

---

**Lock_S**

---

**Lock_Xs**

---

| Used only for Icon Buttons. | Buttons, Callouts, Notifications, Tags, etc. | Dropdown Inputs, Search Inputs, Segmented Control, etc. | Checkbox Inputs, Filter Tags, Multi-select Menu Items, etc. |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |

### Custom Icons

In rare circumstances, an icon will need added to the UI without using the Icon component (most often in cases where the icon being used is not part of the icon set within the design system). In these cases, an svg of the icon should always be used and its size should be set using one of the sizing variables below. The dimensions established with these variables align to the dimensions used by the `sdsSize` prop on the Icon component.

| **Visual** |     | **Variable** |     | **Value**                    |     | **Equivalent sdsSize Value** |
| ---------- | --- | ------------ | --- | ---------------------------- | --- | ---------------------------- |
|            |     | `iconSizeXl` |     | `height: 32px` `width: 32px` |     | `extraLarge`                 |
|            |     | `iconSizeL`  |     | `height: 22px` `width: 22px` |     | `large`                      |
|            |     | `iconSizeS`  |     | `height: 14px` `width: 14px` |     | `small`                      |
|            |     | `iconSizeXs` |     | `height: 10px` `width: 10px` |     | `extraSmall`                 |

### Icons

The table below provides a visual of each icon, its name to be passed in the `sdsIcon` prop, as well as the sizes available to be passed in the `sdsSize` prop.

| **Bacteria** | **Bar Charts** |     |     |
| ------------ | -------------- | --- | --- |

**Bacteria**

---

**BarChartHorizontal3**

---

**BarChartVertical3**

---

**BarChartVertical4**

---

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

**Book**

---

**Check**

---

**CheckCircle**

---

**ChevronDown**

---

| **Chevrons** |     |     | **Circles** |
| ------------ | --- | --- | ----------- |

**ChevronLeft**

---

**ChevronRight**

---

**ChevronUp**

---

**CirclesOverlap2**

---

| **Compass** | **Copy** | **DNA** | **Document** |
| ----------- | -------- | ------- | ------------ |

**Compass**

---

**Copy**

---

**DNA**

---

**Document**

---

| **Dots** | **Download** | **Edit** | **Exclamation Marks** |
| -------- | ------------ | -------- | --------------------- |

**DotsHorizontal3**

---

**Download**

---

**Edit**

---

**ExclamationmarkCircle**

---

| **Exclamation Marks** | **Eyes** |     | **Filter** |
| --------------------- | -------- | --- | ---------- |

**ExclamationmarkSpeechBubble**

---

**EyeClosed**

---

**EyeOpen**

---

**Filter**

---

| **Flags** |     |     |     |
| --------- | --- | --- | --- |

**FlagCheck**

---

**FlagOutline**

---

**FlagQuestionmark**

---

**FlagXmark**

---

| **Flasks** |     |     | **Gear** |
| ---------- | --- | --- | -------- |

**Flask**

---

**FlaskPrivate**

---

**FlaskPublic**

---

**Gear**

---

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

**Globe**

---

**GlobeBasic**

---

**Grid**

---

**GridPrivate**

---

| **Grids** | **House** | **Info** |     |
| --------- | --------- | -------- | --- |

**GridPublic**

---

**House**

---

**InfoCircle**

---

**InfoSpeechBubble**

---

| **Life Ring** | **Lightbulb** | **Lines** |     |
| ------------- | ------------- | --------- | --- |

**LifeRing**

---

**Lightbulb**

---

**LinesDashed3Solid1**

---

**LinesHorizontal3**

---

| **Link** | **List** | **Loading** | **Locks** |
| -------- | -------- | ----------- | --------- |

**Link**

---

**List**

---

**Loading**

---

**Lock**

---

| **Locks** | **Minus** | **Open** | **People** |
| --------- | --------- | -------- | ---------- |

**LockCircle**

---

**Minus**

---

**Open**

---

**People**

---

| **People** | **Percentage** | **Pins** |     |
| ---------- | -------------- | -------- | --- |

**Person**

---

**Percentage**

---

**Pin**

---

**PinLocation**

---

| **Play** | **Pluses** |     | **Projects** |
| -------- | ---------- | --- | ------------ |

**Play**

---

**Plus**

---

**PlusCircle**

---

**ProjectPrivate**

---

| **Projects** | **Puzzle Piece** | **Question Mark** | **Refresh** |
| ------------ | ---------------- | ----------------- | ----------- |

**ProjectPublic**

---

**PuzzlePiece**

---

**Questionmark**

---

**Refresh**

---

| **Save** | **Search** |     | **Share** |
| -------- | ---------- | --- | --------- |

**Save**

---

**Search**

---

**SearchLinesHorizontal3**

---

**Share**

---

| **Sliders** | **Speech Bubbles** | **Squares** | **Stars** |
| ----------- | ------------------ | ----------- | --------- |

**SlidersHorizontal**

---

**SpeechBubbles**

---

**SquareOnDashedSquare**

---

**Star**

---

| **Stars** | **Table** | **Trash Can** | **Trees** |
| --------- | --------- | ------------- | --------- |

**Starburst**

---

**Table**

---

**TrashCan**

---

**TreeDendogram**

---

| **Trees** |     |     |     |
| --------- | --- | --- | --- |

**TreeHorizontal**

---

**TreeHorizontalTopRightFilled**

---

**TreeHorizontalPrivate**

---

**TreeHorizontalPublic**

---

| **Trees** | **Triangles** |     |     |
| --------- | ------------- | --- | --- |

**TreeVertical**

---

**TriangleDown**

---

**TriangleLeft**

---

**TriangleRight**

---

| **Triangles** | **Upload** | **Virus** | **Xmarks** |
| ------------- | ---------- | --------- | ---------- |

**TriangleUp**

---

**Upload**

---

**Virus**

---

**Xmark**

---

| **Xmarks** |     |     |     |
| ---------- | --- | --- | --- |

**XmarkCircle**

---

---

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

**Lock_Xl**

---

**Lock_L**

---

**Lock_S**

---

**Lock_Xs**

---

| Used only for Icon Buttons. | Buttons, Callouts, Notifications, Tags, etc. | Dropdown Inputs, Search Inputs, Segmented Control, etc. | Checkbox Inputs, Filter Tags, Multi-select Menu Items, etc. |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |

### Custom Icons

In rare circumstances, an icon will need added to the UI without using the Icon component (most often in cases where the icon being used is not part of the icon set within the design system). In these cases, an svg of the icon should always be used and its size should be set using one of the sizing variables below. The dimensions established with these variables align to the dimensions used by the `sdsSize` prop on the Icon component.

| **Visual** |     | **Variable** |     | **Value**                    |     | **Equivalent sdsSize Value** |
| ---------- | --- | ------------ | --- | ---------------------------- | --- | ---------------------------- |
|            |     | `iconSizeXl` |     | `height: 32px` `width: 32px` |     | `extraLarge`                 |
|            |     | `iconSizeL`  |     | `height: 22px` `width: 22px` |     | `large`                      |
|            |     | `iconSizeS`  |     | `height: 14px` `width: 14px` |     | `small`                      |
|            |     | `iconSizeXs` |     | `height: 10px` `width: 10px` |     | `extraSmall`                 |

### Icons

The table below provides a visual of each icon, its name to be passed in the `sdsIcon` prop, as well as the sizes available to be passed in the `sdsSize` prop.

| **Bacteria** | **Bar Charts** |     |     |
| ------------ | -------------- | --- | --- |

**Bacteria**

---

**BarChartHorizontal3**

---

**BarChartVertical3**

---

**BarChartVertical4**

---

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

**Book**

---

**Check**

---

**CheckCircle**

---

**ChevronDown**

---

| **Chevrons** |     |     |     |
| ------------ | --- | --- | --- |

**ChevronLeft**

---

**ChevronLeft2**

---

**ChevronRight**

---

**ChevronRight2**

---

| **Chevrons** | **Circles** | **Code** | **Compass** |
| ------------ | ----------- | -------- | ----------- |

**ChevronUp**

---

**CirclesOverlap2**

---

**Code**

---

**Compass**

---

| **Copy** | **Cube** | **DNA** | **Document** |
| -------- | -------- | ------- | ------------ |

**Copy**

---

**Cube**

---

**DNA**

---

**Document**

---

| **Dots** | **Download** | **Edit** | **Exclamation Marks** |
| -------- | ------------ | -------- | --------------------- |

**DotsHorizontal3**

---

**Download**

---

**Edit**

---

**ExclamationmarkCircle**

---

| **Exclamation Marks** | **Eyes** |     | **Filter** |
| --------------------- | -------- | --- | ---------- |

**ExclamationmarkSpeechBubble**

---

**EyeClosed**

---

**EyeOpen**

---

**Filter**

---

| **Flags** |     |     |     |
| --------- | --- | --- | --- |

**FlagCheck**

---

**FlagOutline**

---

**FlagQuestionmark**

---

**FlagXmark**

---

| **Flasks** |     |     | **Gear** |
| ---------- | --- | --- | -------- |

**Flask**

---

**FlaskPrivate**

---

**FlaskPublic**

---

**Gear**

---

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

**Globe**

---

**GlobeBasic**

---

**Grid**

---

**GridPrivate**

---

| **Grids** | **House** | **Info** |     |
| --------- | --------- | -------- | --- |

**GridPublic**

---

**House**

---

**InfoCircle**

---

**InfoSpeechBubble**

---

| **Life Ring** | **Lightbulb** | **Lines** |     |
| ------------- | ------------- | --------- | --- |

**LifeRing**

---

**Lightbulb**

---

**LinesDashed3Solid1**

---

**LinesHorizontal3**

---

| **Link** | **List** | **Loading** | **Locks** |
| -------- | -------- | ----------- | --------- |

**Link**

---

**List**

---

**Loading**

---

**Lock**

---

| **Locks** | **Minus** | **Open** | **People** |
| --------- | --------- | -------- | ---------- |

**LockCircle**

---

**Minus**

---

**Open**

---

**People**

---

| **Person** | **Percentage** | **Pins** |     |
| ---------- | -------------- | -------- | --- |

**Person**

---

**Percentage**

---

**Pin**

---

**PinLocation**

---

| **Play** | **Pluses** |     | **Puzzle Piece** |
| -------- | ---------- | --- | ---------------- |

**Play**

---

**Plus**

---

**PlusCircle**

---

**ProjectPrivate**

---

| **Projects** | **Puzzle Piece** | **Question Mark** | **Quote** |
| ------------ | ---------------- | ----------------- | --------- |

**ProjectPublic**

---

**PuzzlePiece**

---

**Questionmark**

---

**Quote**

---

| **Refresh** | **Save** | **Search** |     |
| ----------- | -------- | ---------- | --- |

**Refresh**

---

**Save**

---

**Search**

---

**SearchLinesHorizontal3**

---

| **Share** | **Sliders** | **Speech Bubbles** | **Squares** |
| --------- | ----------- | ------------------ | ----------- |

**Share**

---

**SlidersHorizontal**

---

**SpeechBubbles**

---

**SquareOnDashedSquare**

---

| **Stars** |     | **Tables** | **Trash Can** |
| --------- | --- | ---------- | ------------- |

**Star**

---

**Starburst**

---

**Table**

---

**TrashCan**

---

| **Trees** |     |     |     |
| --------- | --- | --- | --- |

**TreeDendogram**

---

**TreeHorizontal**

---

**TreeHorizontalTopRightFilled**

---

**TreeHorizontalPrivate**

---

| **Trees** |     | **Triangles** |     |
| --------- | --- | ------------- | --- |

**TreeHorizontalPublic**

---

**TreeVertical**

---

**TriangleDown**

---

**TriangleLeft**

---

| **Triangles** |     | **Upload** | **Viruses** |
| ------------- | --- | ---------- | ----------- |

**TriangleRight**

---

**TriangleUp**

---

**Upload**

---

**Virus**

---

| **Viruses** | **Xmarks** |     |     |
| ----------- | ---------- | --- | --- |

**VirusCoV2**

---

**Xmark**

---

**XmarkCircle**

---
