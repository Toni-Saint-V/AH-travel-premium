/**
 * AH Travel Premium Design Tokens
 * Liner-inspired, Apple-grade polish
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // Background surfaces
  bg0: '#0B0D10',
  bg1: '#111317',
  bg2: '#15181D',
  
  // Text hierarchy
  textHigh: '#EDEFF5',
  textMid: '#B6BECF',
  textLow: '#7C879A',
  
  // Borders
  borderHairline: '#1D2128',
  borderStrong: '#262B35',
  
  // Accent colors
  accentPrimary: '#6C63FF',
  accentSecondary: '#2CD4FF',
  
  // Semantic colors
  success: '#3BD671',
  warning: '#FFB547',
  danger: '#FF5C7C',
} as const

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    sans: 'Inter, SF Pro Text, system-ui, sans-serif',
    mono: 'Geist Mono, SF Mono, monospace',
  },
  
  display: {
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  
  h2: {
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  
  h3: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.25,
  },
  
  body: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.45,
  },
  
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.35,
  },
  
  label: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.25,
  },
} as const

// ============================================
// SPACING
// ============================================

export const spacing = {
  1: '4px',
  1.5: '6px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const

// ============================================
// RADIUS
// ============================================

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  pill: '9999px',
} as const

// ============================================
// MOTION
// ============================================

export const motion = {
  duration: {
    fast: '120ms',
    base: '180ms',
    slow: '240ms',
  },
  easing: {
    default: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
} as const

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  elev1: '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15)',
  elev2: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
  glowAccent: '0 0 20px rgba(108, 99, 255, 0.15)',
  glowSuccess: '0 0 20px rgba(59, 214, 113, 0.15)',
  glowWarning: '0 0 20px rgba(255, 181, 71, 0.15)',
  glowDanger: '0 0 20px rgba(255, 92, 124, 0.15)',
} as const

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  mobile: '375px',
  mobileLarge: '390px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
} as const

// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
} as const

// ============================================
// GRID
// ============================================

export const grid = {
  mobile: {
    columns: 4,
    margin: '16px',
    gutter: '16px',
  },
  desktop: {
    columns: 12,
    margin: '24px',
    gutter: '24px',
    maxContent: '1200px',
    sidebar: '240px',
  },
} as const
