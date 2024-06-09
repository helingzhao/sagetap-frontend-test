import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

import "@mantine/core/styles.css";
import {
  MantineProvider,
  TypographyStylesProvider,
  createTheme,
  rem,
} from "@mantine/core";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  headings: { fontFamily: "Montserrat, Verdana, Greycliff CF, sans-serif" },
  fontSizes: {
    xs: rem(10),
    sm: "16px",
    md: "18px",
    lg: "22px",
    xl: "34px",
  },
  colors: {
    "dark-blue": [
      "#ededfd",
      "#d5d6f5",
      "#a8aaee",
      "#777ae7",
      "#5152e1",
      "#3a39df",
      "#2d2cdf",
      "#2220c6",
      "#1c1db1",
      "#12179c",
    ],
    "sky-blue": [
      "#e4feff",
      "#d0f8ff",
      "#a1effd",
      "#6fe6fd",
      "#4edffc",
      "#3edbfb",
      "#32d8fc",
      "#22bfe1",
      "#00abc9",
      "#0094b0",
    ],
  },
  spacing: {
    xs: ".5rem", // Default is 4
    sm: "1rem", // Default is 8
    md: "2rem", // Default is 16
    lg: "3rem", // Default is 32
    xl: "4rem", // Default is 40
  },
  components: {
    Stack: {
      defaultProps: {
        gap: "0",
      },
    },
    Group: {
      defaultProps: {
        gap: "0",
      },
    },
    UnstyledButton: {
      styles: (theme: any) => ({
        root: {
          fontSize: theme.fontSizes.md,
          color: "#FFFFFF",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#000000",
            color: "#FFFFFF",
          },
          // Define the active state styles
          '&[data-active="true"]': {
            backgroundColor: "#6C65C2",
            color: "#FFFFFF",
            position: "relative",
          },
        },
      }),
    },
    Title: {
      // Target styles for Title with specific order
      styles: (theme: any, { order }: { order: number }) => ({
        root:
          order === 2
            ? {
                fontSize: theme.fontSizes.xl,
                fontWeight: 600,
                color: "#0B0647",
              }
            : order === 3
            ? {
                fontSize: "22px",
                fontWeight: 400,
                color: "#000000",
                paddingBottom: ".5rem",
              }
            : null,
      }),
    },
    Text: {
      defaultProps: {
        m: "0",
      },
      styles: (theme: any) => ({
        root: {
          fontFamily: "Montserrat",
          fontSize: theme.fontSizes.sm,
        },
      }),
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
    Badge: {
      defaultProps: {
        size: "xl",
        bg: "#B7F4FF",
        radius: "md",
      },
      styles: (theme: any) => ({
        root: {
          fontFamily: "Montserrat",
          fontSize: theme.fontSizes.lg,
          color: "#000000",
        },
      }),
    },
    Button: {
      defaultProps: {},
      styles: (theme: any) => ({
        root: {
          // Apply a specific font family and size to all Text components
          fontFamily: "Montserrat",
          fontSize: "16px",
          fontWeight: 600,
        },
      }),
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <TypographyStylesProvider>
        <App />
      </TypographyStylesProvider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
