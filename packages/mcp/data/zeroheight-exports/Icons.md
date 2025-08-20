# Icons

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

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

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

| **Chevrons** |     |     |     |
| ------------ | --- | --- | --- |

| **Chevrons** |     |     | **Circles** |
| ------------ | --- | --- | ----------- |

| **Code** | **Compass** | **Copy** | **Cube** |
| -------- | ----------- | -------- | -------- |

| **DNA** | **Document** | **Dots** | **Download** |
| ------- | ------------ | -------- | ------------ |

| **Edit** | **Envelope** | **Exclamation Marks** |     |
| -------- | ------------ | --------------------- | --- |

| **Eyes** |     | **Filter** | **Flags** |
| -------- | --- | ---------- | --------- |

| **Flags** |     |     | **Flasks** |
| --------- | --- | --- | ---------- |

| **Flasks** |     | **Gear** | **Github** |
| ---------- | --- | -------- | ---------- |

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

| **Grids** |     | **House** | **Info** |
| --------- | --- | --------- | -------- |

| **Info** | **Life Ring** | **Lightbulb** | **Lines** |
| -------- | ------------- | ------------- | --------- |

| **Lines** | **Link** | **List** | **Loading** |
| --------- | -------- | -------- | ----------- |

| **Locks** |     | **Minus** | **Open** |
| --------- | --- | --------- | -------- |

| **Pause** | **People** |     | **Percentage** |
| --------- | ---------- | --- | -------------- |

| **Pins** |     | **Play** | **Pluses** |
| -------- | --- | -------- | ---------- |

| **Pluses** | **Projects** |     | **Puzzle Piece** |
| ---------- | ------------ | --- | ---------------- |

| **Question Marks** |     | **Quote** | **Read** |
| ------------------ | --- | --------- | -------- |

| **Refresh** | **Report** | **Rocket** | **Rotate** |
| ----------- | ---------- | ---------- | ---------- |

| **Rotate** | **Save** | **Scale** | **Scatter Plot** |
| ---------- | -------- | --------- | ---------------- |

| **Search** |     | **Send** | **Share** |
| ---------- | --- | -------- | --------- |

| **Sliders** | **Speech Bubbles** | **Squares** | **Stars** |
| ----------- | ------------------ | ----------- | --------- |

| **Stars** | **Table** | **Thumbs** |     |
| --------- | --------- | ---------- | --- |

| **Trash Can** | **Trees** |     |     |
| ------------- | --------- | --- | --- |

| **Trees** |     |     | **Triangles** |
| --------- | --- | --- | ------------- |

| **Triangles** |     |     | **Update** |
| ------------- | --- | --- | ---------- |

| **Upload** | **Viruses** |     | **Widget** |
| ---------- | ----------- | --- | ---------- |

| **X Marks** |     |     |     |
| ----------- | --- | --- | --- |

---

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

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

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

| **Chevrons** |     |     |     |
| ------------ | --- | --- | --- |

| **Chevrons** | **Circles** | **Code** | **Copy** |
| ------------ | ----------- | -------- | -------- |

| **Copy** | **Cube** | **DNA** | **Document** |
| -------- | -------- | ------- | ------------ |

| **Dots** | **Download** | **Edit** | **Exclamation Marks** |
| -------- | ------------ | -------- | --------------------- |

| **Exclamation Marks** | **Eyes** |     | **Filter** |
| --------------------- | -------- | --- | ---------- |

| **Flags** |     |     |     |
| --------- | --- | --- | --- |

| **Flasks** |     |     | **Gear** |
| ---------- | --- | --- | -------- |

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

| **Grids** | **House** | **Info** |     |
| --------- | --------- | -------- | --- |

| **Life Ring** | **Lightbulb** | **Lines** |     |
| ------------- | ------------- | --------- | --- |

| **Link** | **List** | **Loading** | **Locks** |
| -------- | -------- | ----------- | --------- |

| **Locks** | **Minus** | **Open** | **People** |
| --------- | --------- | -------- | ---------- |

| **Person** | **Percentage** | **Pins** |     |
| ---------- | -------------- | -------- | --- |

| **Play** | **Pluses** |     | **Projects** |
| -------- | ---------- | --- | ------------ |

| **Projects** | **Puzzle Piece** | **Question Mark** | **Quote** |
| ------------ | ---------------- | ----------------- | --------- |

| **Refresh** | **Save** | **Search** |     |
| ----------- | -------- | ---------- | --- |

| **Share** | **Sliders** | **Speech Bubbles** | **Squares** |
| --------- | ----------- | ------------------ | ----------- |

| **Stars** |     | **Table** | **Trash Can** |
| --------- | --- | --------- | ------------- |

| **Trees** |     |     |     |
| --------- | --- | --- | --- |

| **Trees** |     | **Triangles** |     |
| --------- | --- | ------------- | --- |

| **Triangles** |     | **Upload** | **Viruses** |
| ------------- | --- | ---------- | ----------- |

| **Viruses** | **Xmarks** |     |     |
| ----------- | ---------- | --- | --- |

---

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

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

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

| **Chevrons** |     |     | **Circles** |
| ------------ | --- | --- | ----------- |

| **Compass** | **Copy** | **DNA** | **Document** |
| ----------- | -------- | ------- | ------------ |

| **Dots** | **Download** | **Edit** | **Exclamation Marks** |
| -------- | ------------ | -------- | --------------------- |

| **Exclamation Marks** | **Eyes** |     | **Filter** |
| --------------------- | -------- | --- | ---------- |

| **Flags** |     |     |     |
| --------- | --- | --- | --- |

| **Flasks** |     |     | **Gear** |
| ---------- | --- | --- | -------- |

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

| **Grids** | **House** | **Info** |     |
| --------- | --------- | -------- | --- |

| **Life Ring** | **Lightbulb** | **Lines** |     |
| ------------- | ------------- | --------- | --- |

| **Link** | **List** | **Loading** | **Locks** |
| -------- | -------- | ----------- | --------- |

| **Locks** | **Minus** | **Open** | **People** |
| --------- | --------- | -------- | ---------- |

| **People** | **Percentage** | **Pins** |     |
| ---------- | -------------- | -------- | --- |

| **Play** | **Pluses** |     | **Projects** |
| -------- | ---------- | --- | ------------ |

| **Projects** | **Puzzle Piece** | **Question Mark** | **Refresh** |
| ------------ | ---------------- | ----------------- | ----------- |

| **Save** | **Search** |     | **Share** |
| -------- | ---------- | --- | --------- |

| **Sliders** | **Speech Bubbles** | **Squares** | **Stars** |
| ----------- | ------------------ | ----------- | --------- |

| **Stars** | **Table** | **Trash Can** | **Trees** |
| --------- | --------- | ------------- | --------- |

| **Trees** |     |     |     |
| --------- | --- | --- | --- |

| **Trees** | **Triangles** |     |     |
| --------- | ------------- | --- | --- |

| **Triangles** | **Upload** | **Virus** | **Xmarks** |
| ------------- | ---------- | --------- | ---------- |

| **Xmarks** |     |     |     |
| ---------- | --- | --- | --- |

---

Icons are generally used in conjunction with text to further clarify the outcome of a user's action. Occasionally they are used as buttons themselves without accompanying text.

### Icon Component and Sizes

Any icons used in the UI should be added using the Icon component; it contains two props, `sdsIcon` and `sdsSize`.

The first prop, `sdsIcon`, is the name of the icon to be displayed. It is built as an enum and thus only accepts strings that contain icon names found in the design system.

The second prop, `sdsSize`, dictates the size of the icon to be displayed. There are four icon sizes available and each icon has a pre-established set of sizes available to it. The icon name passed into the `sdsIcon` prop will limit which sizes are available to be passed into the `sdsSize` prop.

| **Extra Large** | **Large** | **Small** | **Extra Small** |
| --------------- | --------- | --------- | --------------- |

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

| **Book** | **Checks** |     | **Chevrons** |
| -------- | ---------- | --- | ------------ |

| **Chevrons** |     |     |     |
| ------------ | --- | --- | --- |

| **Chevrons** | **Circles** | **Code** | **Compass** |
| ------------ | ----------- | -------- | ----------- |

| **Copy** | **Cube** | **DNA** | **Document** |
| -------- | -------- | ------- | ------------ |

| **Dots** | **Download** | **Edit** | **Exclamation Marks** |
| -------- | ------------ | -------- | --------------------- |

| **Exclamation Marks** | **Eyes** |     | **Filter** |
| --------------------- | -------- | --- | ---------- |

| **Flags** |     |     |     |
| --------- | --- | --- | --- |

| **Flasks** |     |     | **Gear** |
| ---------- | --- | --- | -------- |

| **Globes** |     | **Grids** |     |
| ---------- | --- | --------- | --- |

| **Grids** | **House** | **Info** |     |
| --------- | --------- | -------- | --- |

| **Life Ring** | **Lightbulb** | **Lines** |     |
| ------------- | ------------- | --------- | --- |

| **Link** | **List** | **Loading** | **Locks** |
| -------- | -------- | ----------- | --------- |

| **Locks** | **Minus** | **Open** | **People** |
| --------- | --------- | -------- | ---------- |

| **Person** | **Percentage** | **Pins** |     |
| ---------- | -------------- | -------- | --- |

| **Play** | **Pluses** |     | **Puzzle Piece** |
| -------- | ---------- | --- | ---------------- |

| **Projects** | **Puzzle Piece** | **Question Mark** | **Quote** |
| ------------ | ---------------- | ----------------- | --------- |

| **Refresh** | **Save** | **Search** |     |
| ----------- | -------- | ---------- | --- |

| **Share** | **Sliders** | **Speech Bubbles** | **Squares** |
| --------- | ----------- | ------------------ | ----------- |

| **Stars** |     | **Tables** | **Trash Can** |
| --------- | --- | ---------- | ------------- |

| **Trees** |     |     |     |
| --------- | --- | --- | --- |

| **Trees** |     | **Triangles** |     |
| --------- | --- | ------------- | --- |

| **Triangles** |     | **Upload** | **Viruses** |
| ------------- | --- | ---------- | ----------- |

| **Viruses** | **Xmarks** |     |     |
| ----------- | ---------- | --- | --- |
