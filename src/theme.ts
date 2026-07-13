export const colors = {
  background: "#f5f8f2",
  surface: "#fbfcf7",
  surfaceMuted: "#eef3e8",
  surfaceRaised: "#fdfdf9",
  border: "#d9e1d2",
  borderStrong: "#b9c7ad",
  text: "#182014",
  textMuted: "#65705c",
  primary: "#2f6d4f",
  primaryPressed: "#245a41",
  primarySoft: "#dbeadd",
  amber: "#b56b22",
  amberSoft: "#f4e3c6",
  rose: "#b44756",
  roseSoft: "#f6dde2",
  success: "#357a55",
  info: "#3e6f87",
  tabInactive: "#7b8472"
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
} as const;

export const radius = {
  sm: 8,
  md: 8,
  lg: 8,
  xl: 8
} as const;

export const shadow = {
  subtle: {
    shadowColor: "#203018",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  }
} as const;
