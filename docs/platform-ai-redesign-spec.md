# Platform AI redesign spec

Source: Figma file `OTiGUm2hqeK04Y3Ugaeofj`, desktop node `4071:34421`.

## Layout anchors

- Main desktop frame: `1440px` wide.
- Main content frame: `1160px` wide, centered (`140px` side insets at 1440px).
- Header: `1440 × 75px`.
- Hero: `1440 × 1269.43px` below the header.
- Assistant content grid: `449px` text column, `80px` gap, `631px` media column.
- Page background: `#080D1D`.

## Color variables

```css
--bg-page: #080D1D;
--bg-primary: #FFFFFF;
--bg-secondary: rgb(255 255 255 / 9%);
--bg-tertiary: rgb(255 255 255 / 4%);
--bg-hover: rgb(255 255 255 / 2%);
--text-primary: #FFFFFF;
--text-secondary: rgb(255 255 255 / 80%);
--text-tertiary: rgb(255 255 255 / 60%);
--text-on-primary: #0A0A0B;
--stroke-primary: rgb(255 255 255 / 8%);
--stroke-secondary: rgb(255 255 255 / 4%);
--blue-primary: #78CEFF;
--blue-tertiary: rgb(56 168 237 / 8%);
```

## Type variables

- Inter: heading 1 `56/105`, heading 2 `44/120`, heading 3 `36/120`, heading 4 `20/120`.
- Inter: body 1 large `18/140`, body 2 large `16/140`, body 2 `16/140`, body 3 large `14/140`, body 3 `14/140`.
- Geist Mono: caption 1 `11/140` and compact labels.

The implementation keeps these tokens scoped under `.pa-page`, so the portfolio's global CSS remains unchanged.
