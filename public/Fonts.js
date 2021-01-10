import { Global } from "@emotion/react";
export const Fonts = () => (
  <Global
    styles={`
    /* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjrj9ytf.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjjj9ytf.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjnj9ytf.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjfj9w.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjrj9ytf.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjjj9ytf.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjnj9ytf.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjfj9w.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjrj9ytf.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjjj9ytf.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjnj9ytf.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjfj9w.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjrj9ytf.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjjj9ytf.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjnj9ytf.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjfj9w.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjrj9ytf.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjjj9ytf.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjnj9ytf.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjfj9w.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjrj9ytf.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjjj9ytf.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjnj9ytf.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c79IRs1JiJN1FRAMjTN5zd9vgsFHXwcjfj9w.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX4QjX78w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX6QjX78w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX7QjX78w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX1QjU.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX4QjX78w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX6QjX78w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX7QjX78w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX1QjU.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX4QjX78w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX6QjX78w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX7QjX78w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX1QjU.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX4QjX78w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX6QjX78w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX7QjX78w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX1QjU.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX4QjX78w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX6QjX78w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX7QjX78w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX1QjU.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX4QjX78w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX6QjX78w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX7QjX78w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Merriweather Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/merriweathersans/v13/2-c99IRs1JiJN1FRAMjTN5zd9vgsFHX1QjU.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
      `}
  />
);
