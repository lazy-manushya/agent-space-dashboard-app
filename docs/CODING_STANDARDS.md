# BOE Dashboard - Global Coding Standards & Conventions

> **CRITICAL**: ALL code changes MUST follow EVERY single rule in this document to maintain 100% consistency with the existing codebase. NO exceptions.

---

## 🎯 PROJECT IDENTITY

- **Project Name**: BOE Dashboard App (Backend Operations Engine Frontend)
- **Internal Name**: `boe-fe`
- **App Title**: "BOE"
- **Tech Stack**: Next.js 16.1.1 + React 19.2.3 + TypeScript 5
- **Architecture**: Next.js App Router with Client Components

---

## 🔥 ABSOLUTE REQUIREMENTS (READ FIRST)

### 1. FOLDER STRUCTURE IS SACRED
```
src/
├── components/      # ✅ Reusable UI components ONLY
├── features/        # ✅ Feature-specific components (Layout, Logo, AlertsButton)
├── pages_lib/       # ✅ Page implementations
├── services/        # ✅ Business logic, hooks, contexts
├── utils/           # ✅ Utility functions
└── styles/css/      # ✅ Global CSS
```

**🚨 NEVER**:
- Put page components in `components/` folder
- Put utilities in `components/` folder
- Put components outside designated folders
- Create new top-level folders without approval

### 2. COMPONENT STRUCTURE IS NON-NEGOTIABLE
```
/ComponentName/
├── ComponentName.tsx           # ✅ REQUIRED
├── ComponentName.types.ts      # ✅ REQUIRED
├── ComponentName.module.css    # ✅ REQUIRED
├── ComponentName.config.ts     # ⚠️  ONLY if CVA variants
└── index.ts                    # ✅ REQUIRED
```

**🚨 EVERY component MUST have ALL 4 files** (5 if using CVA):
- `.tsx` file (component logic)
- `.types.ts` file (TypeScript interfaces with `I` prefix)
- `.module.css` file (CSS Module with PascalCase classes)
- `index.ts` file (barrel export)
- `.config.ts` file (ONLY if component has multiple visual variants)

### 3. REACT ARIA FIRST POLICY
Before creating ANY interactive component:
1. ✅ Check if it exists in `src/components/`
2. ✅ Check React Aria documentation at https://react-spectrum.adobe.com/react-aria/
3. ✅ If React Aria provides it → Use React Aria component as base
4. ✅ Study existing similar components in codebase
5. ✅ Match existing patterns EXACTLY

**🚨 NEVER**:
- Create custom interactive components if React Aria provides them
- Reinvent accessibility features (focus management, keyboard navigation, ARIA attributes)
- Create duplicate components

### 4. NAMING CONVENTIONS ARE ABSOLUTE
- ✅ **ALL** interfaces: `I` prefix (IButtonProps, ICardProps)
- ✅ **ALL** CSS classes: PascalCase (.Button, .ButtonPrimary)
- ✅ **ALL** files: PascalCase (Button.tsx, NOT button.tsx)
- ✅ **ALL** components: Named function exports (NOT arrow functions)

**🚨 ZERO EXCEPTIONS**.

---

## 📁 FILE STRUCTURE & NAMING

### Component Organization
Every component MUST follow this exact structure:

```
/ComponentName/
├── ComponentName.tsx                ✅ Main component (PascalCase, NEVER .jsx)
├── ComponentName.types.ts           ✅ Type definitions (ALWAYS present)
├── ComponentName.config.ts          ⚠️  CVA config (ONLY if multiple variants)
├── ComponentName.types.config.ts    ⚠️  Type-specific config (rare, like InputField)
├── ComponentName.module.css         ✅ CSS Module styles (ALWAYS present)
└── index.ts                         ✅ Barrel export (ALWAYS present)
```

**CRITICAL RULES**:
- ✅ **ALWAYS** `.tsx` extension (NEVER `.jsx`)
- ✅ **ALWAYS** `.types.ts` file (even if only 1 interface)
- ✅ **ALWAYS** `.module.css` file (never plain `.css`)
- ✅ **ALWAYS** `index.ts` barrel export
- ⚠️ **ONLY** `.config.ts` when component has CVA variants
- 🚫 **NEVER** mix PascalCase and camelCase in same component folder

### Directory Structure (FIXED HIERARCHY)
```
/src/
├── app/                    # Next.js App Router pages & routes
│   ├── layout.tsx         # Root layout (ONLY place for providers)
│   ├── page.tsx           # Home page (re-exports from pages_lib)
│   ├── invoices/page.tsx  # Invoices route
│   ├── duties/page.tsx    # Duties route
│   └── users/page.tsx     # Users route
├── components/             # 21 Reusable UI components (Button, Card, Modal, etc.)
├── features/              # Feature-specific components (Layout, Logo, AlertsButton)
├── pages_lib/             # Page-level component implementations
│   └── DashboardPage/     # Actual page components
├── services/              # Business logic, hooks, contexts (Routing, Responsive, Share)
├── styles/css/            # Global CSS (MUST load in specific order)
│   ├── reset.css          # 1️⃣ FIRST - Browser reset
│   ├── global.css         # 2️⃣ SECOND - Global styles
│   ├── color.css          # 3️⃣ THIRD - CSS variables
│   └── custom-bootstrap.min.css  # 4️⃣ FOURTH - Utility classes
└── utils/                 # Utility functions (classNames, navigation)
    ├── classNames.ts      # joinClassNames utility
    ├── navigation.ts      # isPathActive utility
    └── index.ts           # Barrel export (exports all utils)
```

**🚨 CRITICAL IMPORT ORDER** (in `app/layout.tsx`):
```typescript
import "@/styles/css/reset.css";              // 1️⃣ FIRST
import "@/styles/css/global.css";             // 2️⃣ SECOND
import "@/styles/css/color.css";              // 3️⃣ THIRD
import "@/styles/css/custom-bootstrap.min.css"; // 4️⃣ FOURTH
```

### Service Organization
```
/ServiceName/
├── ServiceName.ts              # Static service class
├── ServiceName.types.ts        # Type definitions
├── ServiceName.config.ts       # Configuration (optional)
├── ServiceName.context.tsx     # React Context Provider (if needed)
├── ServiceName.utils.tsx       # Utility functions (if needed)
├── hook/
│   ├── useServiceName.tsx     # Custom hook
│   └── index.ts
└── index.ts                    # Barrel export
```

---

## 🎯 NAMING CONVENTIONS

### Must Follow Rules
| Item | Convention | ✅ Correct | ❌ Wrong |
|------|-----------|----------|----------|
| **Component Files** | PascalCase | `Button.tsx` | `button.tsx`, `Button.jsx` |
| **CSS Classes** | PascalCase | `.Button`, `.ButtonPrimary` | `.button`, `.button-primary` |
| **Interfaces** | `I` prefix + PascalCase | `IButtonProps` | `ButtonProps`, `buttonProps` |
| **CSS Modules** | `.module.css` | `Button.module.css` | `Button.css`, `button.module.css` |
| **Hooks** | `use` prefix | `useShare.tsx` | `Share.hook.tsx` |
| **Event Handlers** | `on` prefix (props) | `onPageChange` | `pageChange` |
| **Internal Handlers** | `handle` prefix | `handleCopyUrl` | `copyUrl` |

---

## 🧩 COMPONENT ARCHITECTURE

### Component File Template (EXACT FORMAT)
```typescript
"use client"; // 🚨 MANDATORY if using ANY hooks, state, or client features

// 1️⃣ External imports (React, Next.js, third-party libraries)
import { useState, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button as ReactAriaButton } from "react-aria-components";

// 2️⃣ Internal utility imports (@/utils/*)
import { joinClassNames } from "@/utils/classNames";
import { isPathActive } from "@/utils/navigation";
// OR combined import:
import { joinClassNames, isPathActive } from "@/utils";

// 3️⃣ Component/Feature imports (@/components/*, @/features/*)
import Link from "@/components/Link";
import Button from "@/components/Button";
import Logo from "@/features/Logo";

// 4️⃣ Type imports (local types, config)
import { IComponentProps } from "./ComponentName.types";
import { componentStylesConfig } from "./ComponentName.config";

// 5️⃣ Style imports (ALWAYS LAST, ALWAYS from local)
import styles from "./ComponentName.module.css";

function ComponentName({
  children,
  className,
  variant,
  size,
  ...restProps
}: IComponentProps) {
  // 🔹 Destructure consumed props
  const { ...filteredProps } = restProps;

  // 🔹 Component logic, hooks, state
  const [state, setState] = useState(null);

  const memoValue = useMemo(() => {
    // Memoized calculations
  }, [dependencies]);

  const handleEvent = useCallback(() => {
    // Event handler logic
  }, [dependencies]);

  // 🔹 Return JSX
  return (
    <div className={joinClassNames(styles.Container, className)}>
      {children}
    </div>
  );
}

export default ComponentName;
```

**🚨 MANDATORY PATTERNS**:
1. **`"use client"`** - MUST be first line if component uses ANY hooks or client features
2. **Import Order** - MUST follow 5-step order above (external → utils → components → types → styles)
3. **No semicolons after imports** - BUT semicolons IN code blocks (variable declarations, etc.)
4. **Named function** - NEVER arrow function for component export
5. **Props destructuring** - ALWAYS in function parameters, NEVER inside function body
6. **Default export** - ALWAYS use `export default ComponentName` at bottom

### Props Pattern (MANDATORY)
```typescript
// ComponentName.types.ts
import React from "react";
import { VariantProps } from "class-variance-authority";
import { componentStylesConfig } from "./ComponentName.config";

export interface IComponentProps
  extends React.HTMLAttributes<HTMLDivElement>, // If extends HTML element
    VariantProps<typeof componentStylesConfig> { // If uses CVA
  children?: React.ReactNode;
  className?: string;
  // Component-specific props here
}
```

### Barrel Export Pattern (100% MANDATORY)
```typescript
// index.ts - EXACTLY 2 lines, NO MORE, NO LESS
export { default } from "./ComponentName";
export * from "./ComponentName.types";
```

**🚨 CRITICAL RULES**:
1. **Line 1** - `export { default } from "./ComponentName";` (default export)
2. **Line 2** - `export * from "./ComponentName.types";` (type exports)
3. **NO blank lines** between exports
4. **NEVER** export config files (`.config.ts` files are NEVER exported in index)
5. **ALWAYS** 2 exports (component + types), even if types file has only 1 interface

**Examples from Real Codebase**:
```typescript
// Button/index.ts
export { default } from "./Button";
export * from "./Button.types";

// Card/index.ts
export { default } from "./Card";
export * from "./Card.types";

// Modal/index.ts
export { default } from "./Modal";
export * from "./Modal.types";
```

---

## 🎨 CSS MODULE CONVENTIONS

### Class Naming Rules
```css
/* ✅ CORRECT - PascalCase */
.Button { }
.ButtonPrimary { }
.ButtonSecondary { }
.ButtonDisabled { }
.ButtonSmall { }
.ButtonColorPrimary { }

/* ❌ WRONG - camelCase or kebab-case */
.button { }
.button-primary { }
.buttonPrimary { }
```

### CSS File Structure Pattern (EXACT ORDER)
```css
/* 1️⃣ Root container (ALWAYS .Container or component name) */
.Container {
  display: flex;
  padding: 1.5rem;
  border-radius: 1rem;
}

/* 2️⃣ Sub-elements (child elements) */
.Title {
  font-size: 1rem;
  margin-bottom: 1.125rem;
}

.Content {
  overflow: auto;
}

.Icon {
  display: flex;
  font-size: 1.25rem;
}

/* 3️⃣ Variants (from CVA config) */
.ButtonPrimary {
  --background: rgb(var(--clr-primary-rgb));
  --color: #fff;
}

.ButtonSecondary {
  --background: #fff;
  --color: rgb(var(--clr-primary-rgb));
}

/* 4️⃣ States */
.Active {
  font-weight: 600;
}

.Disabled {
  cursor: not-allowed;
  filter: grayscale(0.75);
}

/* 5️⃣ Pseudo-classes/elements */
.Button:after {
  content: "";
  position: absolute;
  opacity: 0;
  transition: opacity 240ms ease;
}

.Button[data-hovered]:after {
  opacity: 1;
}

/* 6️⃣ Responsive media queries (ALWAYS LAST) */
@media screen and (max-width: 768px) {
  .Container {
    width: 100%;
    padding: 1rem;
  }
}
```

**🚨 CSS ORDERING RULES**:
1. Root container
2. Sub-elements (alphabetical or DOM order)
3. Variants (if using CVA)
4. States (Active, Disabled, etc.)
5. Pseudo-classes and pseudo-elements
6. Media queries (ALWAYS at the bottom)

### CSS Comment Patterns
```css
/* Single-line comments for sections */
.Button {
  /* Inline comments for complex properties */
}

/* ----------------------- */
/* Section dividers use exactly 23 dashes */
/* ----------------------- */

.NextSection {
  /* ... */
}
```

### CSS Variable Usage (CRITICAL PATTERN)
```css
/* ✅ CORRECT - CSS variable pattern with local overrides */
.Button {
  /* 1️⃣ Declare local CSS variables first */
  --color: #fff;
  --background: rgb(var(--clr-primary-rgb));  /* Compose global vars */
  --border-color: rgb(var(--clr-primary-rgb));

  /* 2️⃣ Use local variables in properties */
  background: var(--background);
  color: var(--color);
  border: 1px solid var(--border-color);

  /* 3️⃣ Other properties */
  padding: 1rem;
  border-radius: 0.75rem;
  transition: filter 240ms ease;
}

/* 4️⃣ Variants override local CSS variables */
.ButtonSecondary {
  --color: rgb(var(--clr-primary-rgb));    /* Override local var */
  --background: #fff;                       /* Override local var */
  --border-color: rgb(var(--clr-primary-rgb)); /* Override local var */
}

/* ❌ WRONG - Direct color values without CSS variables */
.Button {
  background: #000000;        /* ❌ Should use CSS variable */
  color: #ffffff;             /* ❌ Should use CSS variable */
}
```

### Available Global CSS Variables (from color.css)
```css
/* In :root - color.css */
--clr-primary-rgb: 0, 0, 0;      /* RGB values WITHOUT rgb() wrapper */
--clr-danger: 255, 87, 87;       /* RGB values WITHOUT rgb() wrapper */
--page-background: #fff;         /* Full hex color */

/* Dynamically set by ResponsiveProvider (Responsive.context.tsx) */
--vh: /* 1% of viewport height (e.g., 6.4px for 640px screen) */
--vw: /* 1% of viewport width (e.g., 4.8px for 480px screen) */
```

**🚨 CRITICAL: RGB vs Full Color**:
```css
/* Global variables store RGB components ONLY (no rgb() wrapper) */
:root {
  --clr-primary-rgb: 0, 0, 0;  /* ✅ JUST numbers */
}

/* Compose at usage with rgb() */
.Button {
  background: rgb(var(--clr-primary-rgb));           /* ✅ CORRECT */
  background: rgba(var(--clr-primary-rgb), 0.5);     /* ✅ CORRECT - with alpha */
  background: var(--clr-primary-rgb);                /* ❌ WRONG - missing rgb() */
}
```

### Filter Color Utilities (from color.css)
```css
/* Pre-defined filter classes for SVG recoloring */
.filter-clr-danger {
  filter: brightness(0) invert(53%) sepia(41%) saturate(4024%)
    hue-rotate(327deg) brightness(100%) contrast(103%);
}

/* Usage: Apply to <Image> component to colorize SVG */
<Image className="filter-clr-danger" src="/icon.svg" ... />
```

### Spacing Standards (EXACT VALUES)
| Purpose | Value | Example |
|---------|-------|---------|
| Card padding | `1.5rem` | `.Card { padding: 1.5rem; }` |
| Button padding (md) | `1rem` | `.ButtonMedium { padding: 1rem; }` |
| Button padding (sm) | `0.35rem 0.5rem` | `.ButtonSmall { padding: 0.35rem 0.5rem; }` |
| Button padding (lg) | `1.25rem` | `.ButtonLarge { padding: 1.25rem; }` |
| Input field padding | `0.75rem` | `.Input { padding: 0.75rem; }` |
| Border radius (sm) | `0.25rem` | Small elements |
| Border radius (md) | `0.5rem` | `.ButtonSmall { border-radius: 0.5rem; }` |
| Border radius (default) | `0.75rem` | `.Button { border-radius: 0.75rem; }` |
| Border radius (lg) | `1rem` | `.Card { border-radius: 1rem; }` |
| Gap (elements) | `0.75rem` | `.Button { gap: 0.75rem; }` |
| Gap (small) | `0.5rem` | `.ButtonSmall { gap: 0.5rem; }` |
| Margins | `0.25rem` increments | `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.125rem`, `1.25rem`, `1.5rem` |

### Font Size Standards
| Use Case | Value | Weight |
|----------|-------|--------|
| Small text | `0.75rem` | 500-600 |
| Button small | `0.875rem` | 500 |
| Body text / Button | `1rem` | 400-600 |
| Heading 3 | `1rem` | 600 |
| Icons | `1.25rem` | N/A |

### Transition Standards (CONSISTENT TIMING)
```css
/* ✅ CORRECT - 240ms ease for most interactions */
.Button {
  transition: filter 240ms ease;
  will-change: filter;
}

.Button:after {
  transition: opacity 240ms ease;
  will-change: opacity;
}

/* ⚠️ Exception: Responsive events use 250ms debounce (in JS, not CSS) */
setTimeout(() => {
  // Responsive calculations
}, 250);
```

### React Aria Data Attributes (Pseudo-classes)
```css
/* React Aria adds data-* attributes for states */
.Button[data-hovered] {
  /* Hover state */
}

.Button[data-pressed] {
  /* Active/pressed state */
}

.Button[data-focused] {
  /* Keyboard focus state */
}

.Button[data-disabled] {
  /* Disabled state */
}

/* Example from Button.module.css */
.Button[data-hovered]:after,
.Button[data-pressed]:after {
  opacity: 1;
}

.Button[data-pressed]:after {
  background: rgba(0, 0, 0, 0.1);
}
```

### Pseudo-element Pattern (Overlay Effects)
```css
/* Create overlay effect with ::after pseudo-element */
.Button {
  position: relative; /* Required for absolute positioning */
}

.Button:after {
  content: "";
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;          /* ⚠️ Inherit from parent */
  background: rgba(0, 0, 0, 0.05); /* Subtle overlay */
  pointer-events: none;            /* Don't block clicks */
  opacity: 0;
  will-change: opacity;
  transition: opacity 240ms ease;
}

.Button[data-hovered]:after {
  opacity: 1; /* Show on hover */
}
```

---

## 📘 TYPESCRIPT PATTERNS

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2017",              // ⚠️ Exactly ES2017
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,                  // 🚨 ALWAYS strict mode
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",              // ⚠️ NOT "preserve"
    "paths": {
      "@/*": ["./src/*"]             // 🚨 ALWAYS use @ alias
    }
  }
}
```

### Interface Rules (100% MANDATORY)
```typescript
// ✅ CORRECT - ALL interfaces start with 'I' prefix
export interface IButtonProps { }
export interface ICardProps { }
export interface IModalProps { }
export interface IResponsiveContext { }
export interface ILayoutProps { }
export interface IDashboardPageProps { }
export interface INavMenuProps { }

// ❌ WRONG - Missing 'I' prefix (NEVER ALLOWED)
export interface ButtonProps { }      // ❌ WRONG
export interface CardProps { }        // ❌ WRONG
export interface ModalProps { }       // ❌ WRONG
```

**🚨 ZERO EXCEPTIONS**: Every single interface in the entire codebase uses `I` prefix. This is NON-NEGOTIABLE.

### Type vs Interface Usage
```typescript
// ✅ Use Interfaces for: Props and object structures
export interface IButtonProps {
  children?: React.ReactNode;
  className?: string;
}

// ✅ Use Types for: Unions, primitives, function types
export type ShareContent = ShareData & { isUrlRelative?: boolean };
export type BREAKPOINT_NAMES = "fullhd" | "widescreen" | "desktop";
```

### Children Pattern (MANDATORY)
```typescript
// ✅ CORRECT
export interface ILayoutProps {
  children?: React.ReactNode; // Always use React.ReactNode
}

// ❌ WRONG
export interface ILayoutProps {
  children?: JSX.Element; // Don't use JSX.Element
  children?: any; // Never use any
}
```

---

## 🔧 CVA (Class Variance Authority) USAGE

### When to Use CVA
**Use `.config.ts` ONLY when component has multiple visual variants:**
- ✅ Button (primary/secondary/ghost + sizes + colors)
- ✅ InputField (sizes, states)
- ✅ Pagination (variant styles)
- ❌ Card (simple styling, no variants)
- ❌ Modal (no style variants)

### CVA Config Template
```typescript
// ComponentName.config.ts
import { cva } from "class-variance-authority";
import styles from "./ComponentName.module.css";

export const componentStylesConfig = cva(styles.BaseClass, {
  variants: {
    variant: {
      primary: styles.VariantPrimary,
      secondary: styles.VariantSecondary,
    },
    size: {
      sm: styles.Small,
      md: styles.Medium,
      lg: styles.Large,
    },
    disabled: {
      true: styles.Disabled,
      false: undefined,
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});
```

### CVA Integration with Props
```typescript
import { VariantProps } from "class-variance-authority";
import { componentStylesConfig } from "./Component.config";

export interface IComponentProps
  extends VariantProps<typeof componentStylesConfig> {
  // Other props
}
```

---

## ⚛️ REACT PATTERNS

### Hook Usage Rules (STRICT)
```typescript
// 🚨 CRITICAL: "use client" MUST be first line (no blank lines before)
"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";

function Component() {
  // 1️⃣ State hooks first
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2️⃣ Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // 3️⃣ Memoized values
  const memoValue = useMemo(() => compute(), [deps]);

  // 4️⃣ Callbacks
  const handleEvent = useCallback(() => {
    // Event logic
  }, [deps]);

  // 5️⃣ Effects (ALWAYS last)
  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [deps]);

  return <div />;
}
```

**🚨 HOOK ORDERING RULES**:
1. State hooks (`useState`)
2. Refs (`useRef`)
3. Context (`useContext`)
4. Router hooks (`useRouter`, `usePathname`, `useSearchParams`)
5. Memoized values (`useMemo`)
6. Callbacks (`useCallback`)
7. Effects (`useEffect`, `useLayoutEffect`) - ALWAYS LAST

### React Aria Hooks (Accessibility)
```typescript
import { useLandmark } from "react-aria";

function NavMenu() {
  const navRef = useRef<HTMLUListElement>(null);

  // 🔹 Use React Aria accessibility hooks
  const { landmarkProps } = useLandmark(
    {
      role: "navigation",
      "aria-label": "Main navigation",
    },
    navRef
  );

  return (
    <nav {...landmarkProps} ref={navRef}>
      {/* Navigation content */}
    </nav>
  );
}
```

### Context Pattern (MANDATORY)
```typescript
// Service.config.ts
const initialValues = {} as IServiceContext;
export const ServiceContext = createContext(initialValues);

// Service.context.tsx
export const ServiceProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // Logic here
  return (
    <ServiceContext.Provider value={{ /* values */ }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Service.utils.tsx or hook/useService.tsx
export const useService = () => useContext<IServiceContext>(ServiceContext);
```

### Component Composition with React Aria (EXACT PATTERN)
```typescript
"use client";

import { Button as ReactAriaButton } from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";

import { IButtonProps } from "./Button.types";
import styles from "./Button.module.css";
import { buttonStylesConfig } from "./Button.config";

function Button({
  children,
  className,
  variant,
  size,
  ...restProps
}: IButtonProps) {
  // 🔹 Extract specific props if needed
  const { ...filteredProps } = restProps;
  const isDisabled = restProps.disabled || false;

  // 🔹 Wrap React Aria component with custom styling
  return (
    <ReactAriaButton
      isDisabled={isDisabled}    // ⚠️ React Aria uses "isDisabled", NOT "disabled"
      className={joinClassNames(
        styles.Button,              // Base styles FIRST
        buttonStylesConfig({        // CVA variants SECOND
          variant,
          size,
          disabled: isDisabled,
        }),
        className                   // User className LAST (highest specificity)
      )}
      {...filteredProps}           // Spread remaining props
    >
      {children}
    </ReactAriaButton>
  );
}

export default Button;
```

**🚨 REACT ARIA NAMING DIFFERENCES**:
| HTML Prop | React Aria Prop | Notes |
|-----------|----------------|-------|
| `disabled` | `isDisabled` | Boolean prefix with "is" |
| `open` | `isOpen` | Boolean prefix with "is" |
| `selected` | `isSelected` | Boolean prefix with "is" |
| `onChange` | `onOpenChange`, `onSelectionChange` | More specific names |

### React Aria Components Used in Codebase
```typescript
// From react-aria-components
import {
  Button,                    // Accessible button
  Link,                      // Accessible link with router integration
  TextField,                 // Accessible text input
  Input,                     // Input element
  TextArea,                  // Textarea element
  Select,                    // Accessible select/dropdown
  SelectValue,               // Selected value display
  Popover,                   // Popover container
  ListBox,                   // Listbox for select options
  ListBoxItem,               // Individual list item
  Modal,                     // Accessible modal
  ModalOverlay,              // Modal backdrop
  Tabs,                      // Accessible tabs container
  TabList,                   // Tab navigation list
  Tab,                       // Individual tab button
  TabPanel,                  // Tab content panel
  Slider,                    // Accessible slider/range input
  SliderTrack,               // Slider track
  SliderThumb,               // Slider thumb/handle
  RouterProvider,            // Router integration for Link components
} from "react-aria-components";
```

### React Aria Module Declaration (MANDATORY for Next.js)
```typescript
// In Routing.context.tsx - MUST declare module for TypeScript
declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}
```

---

## 🛠️ SERVICE PATTERNS

### Static Service Class (MANDATORY)
```typescript
// Service.ts
class Share {
  static isShareSupported = () => {
    return !!navigator.share;
  };

  static share = async (content: ShareContent) => {
    // Implementation
  };

  static getShareUrl = (url: string) => {
    return window.location.origin + url;
  };
}

export default Share;
```

### Service Export Pattern
```typescript
// Service/index.ts
export { default } from "./Service";
export type * from "./Service.types";
export { default as useService } from "./hook/useService";
export * from "./Service.context"; // If has context
export * from "./Service.utils"; // If has utilities
```

---

## 🧰 UTILITY PATTERNS

### Utility Function Template
```typescript
// utils/utilityName.ts
export function joinClassNames(
  ...classes: (string | number | undefined | boolean)[]
): string {
  classes = Array.from(new Set(classes));
  classes = classes.filter(Boolean);
  return classes.join(" ");
}

export function isPathActive(itemPath: string, activePath: string): boolean {
  const normalize = (p: string) => p.replace(/\/$/, "").toLowerCase();
  return normalize(itemPath) === normalize(activePath);
}
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoint System (EXACT VALUES)
```typescript
// From Responsive.types.ts - NEVER change these values
export enum DEVICE_BREAKPOINT {
  fullhd = 1408,       // Ultra-wide screens
  widescreen = 1200,   // Large desktop
  desktop = 1023,      // Standard desktop
  smallMonitor = 992,  // Small desktop/large laptop
  tablet = 768,        // Tablet/iPad
  largeMobile = 460,   // Large phone
  mobile = 380,        // Standard phone
  smallMobile = 324,   // Small phone
}

// Usage in CSS - ALWAYS use exact pixel values
@media screen and (max-width: 768px) { /* tablet */ }
@media screen and (max-width: 380px) { /* mobile */ }
@media screen and (max-width: 1023px) { /* desktop */ }
```

### Responsive Context Pattern
```typescript
// Responsive.config.ts - Create context with empty initial values
const initialValues = {} as IResponsiveContext;
export const ResponsiveContext = createContext(initialValues);

// Responsive.context.tsx - Provider sets CSS variables
export const ResponsiveProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [screenWidth, setScreenWidth] = useState(480);
  const [screenHeight, setScreenHeight] = useState(640);

  const screenListenerEvent = useCallback(() => {
    setTimeout(() => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // 🚨 CRITICAL: Set CSS variables on document.body
      document.body.style.setProperty("--vh", `${screenHeight / 100}px`);
      document.body.style.setProperty("--vw", `${screenWidth / 100}px`);
    }, 250); // ⚠️ 250ms debounce delay
  }, []);

  // Setup resize listener
  useEffect(() => {
    screenListenerEvent(); // Initial call
    window.addEventListener("resize", screenListenerEvent);
    return () => window.removeEventListener("resize", screenListenerEvent);
  }, [screenListenerEvent]);

  return (
    <ResponsiveContext.Provider value={{ screenWidth, screenHeight, ... }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
```

### Dynamic CSS Variables (Set by ResponsiveProvider)
```css
/* These are dynamically set by JavaScript */
--vh: /* 1% of viewport height in px */
--vw: /* 1% of viewport width in px */

/* Usage example */
.Container {
  height: calc(var(--vh) * 100); /* Full viewport height */
  width: calc(var(--vw) * 50);   /* 50% viewport width */
}
```

### Responsive Context Usage
```typescript
import { useResponsive } from "@/services/Responsive";

function Component() {
  const { deviceName, viewportWidth } = useResponsive();

  if (deviceName === "mobile") {
    // Mobile-specific logic
  }
}
```

---

## 🎯 NEXT.JS PATTERNS

### Page Structure
```
/src/app/
├── layout.tsx           # Root layout with providers
├── page.tsx            # Home route
├── invoices/page.tsx   # /invoices route
└── duties/page.tsx     # /duties route
```

### Root Layout Template (EXACT FORMAT)
```typescript
// app/layout.tsx - ONLY file where providers live
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google"; // 🚨 Using Next.js font loader

import Layout from "@/features/Layout";
import { RoutingProvider } from "@/services/Routing";

// 🚨 CRITICAL: CSS imports in EXACT order
import "@/styles/css/reset.css";
import "@/styles/css/global.css";
import "@/styles/css/color.css";
import "@/styles/css/custom-bootstrap.min.css";

// 🔹 Font configuration
const robotoFont = Roboto({
  variable: "--roboto", // CSS variable name
});

// 🔹 Viewport configuration (disable user scaling)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // ⚠️ Disabled for mobile
};

// 🔹 Metadata
export const metadata: Metadata = {
  title: "BOE",
  description: "BOE dashboard app",
};

// 🔹 Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RoutingProvider>
      <html lang="en">
        <header>
          {/* External icon library */}
          <link
            rel="stylesheet"
            href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
          ></link>
        </header>
        <body className={`${robotoFont.variable}`}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </RoutingProvider>
  );
}
```

**🚨 CRITICAL PATTERNS**:
1. **Providers**: ONLY RoutingProvider at root (ResponsiveProvider would go in Layout if needed)
2. **Font Loading**: Use Next.js `next/font/google` loader, NOT external CDN
3. **CSS Variable**: Apply font via className: `{robotoFont.variable}`
4. **Icon Library**: Line Awesome icons via CDN link in `<header>`
5. **Viewport**: Disable user scaling for mobile consistency
6. **Readonly Props**: Always use `Readonly<{ children: React.ReactNode }>` for layout props

### Page Template
```typescript
// app/page.tsx
export { default } from "@/pages_lib/DashboardPage";
```

### Router Usage
```typescript
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Component() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Navigation
  router.push("/invoices");

  // Active state
  const isActive = pathname === "/invoices";
}
```

---

## 📦 COMPLETE COMPONENT INVENTORY

### All 21 Components (src/components/)
| Component | Has CVA Config | Description | Key Patterns |
|-----------|---------------|-------------|--------------|
| **Button** | ✅ Yes | Primary interactive element | CVA variants (primary/secondary/ghost), React Aria Button, conditional Link rendering |
| **Card** | ❌ No | Content container | Simple wrapper, title + children slots |
| **ExampleComponent** | ❌ No | Template/example | Reference for new components |
| **FieldGroup** | ❌ No | Form field grouping | Wrapper for multiple inputs |
| **Image** | ❌ No | Next.js Image wrapper | Wraps next/image with type safety |
| **InputField** | ✅ Yes | Input wrapper with states | CVA for error states, prepend/append slots |
| **Label** | ❌ No | Form label | Simple text label component |
| **Link** | ❌ No | Next.js Link + React Aria | Combines Next.js routing with React Aria accessibility |
| **Modal** | ❌ No | Dialog overlay | React Aria Modal + ModalOverlay, close button |
| **NavMenu** | ❌ No | Navigation menu | Animated active indicator, refs for positioning |
| **Pagination** | ✅ Yes | Page navigation | CVA for variants, button generation logic |
| **Portal** | ❌ No | React Portal wrapper | Renders children into document.body |
| **RingLoader** | ❌ No | Loading spinner | Pure CSS animation, no JS |
| **SearchField** | ❌ No | Search input | React Aria TextField with search icon |
| **Select** | ❌ No | Dropdown select | React Aria Select + Popover + ListBox |
| **ShimmerLoader** | ❌ No | Skeleton loader | CSS shimmer animation |
| **Slider** | ❌ No | Range input | React Aria Slider with track visualization |
| **Tabs** | ❌ No | Tabbed interface | React Aria Tabs + TabList + TabPanel |
| **Text** | ❌ No | Typography component | Semantic text wrapper |
| **TextArea** | ❌ No | Multi-line input | React Aria TextArea in InputField |
| **TextField** | ❌ No | Single-line input | React Aria TextField + Input in InputField |

### All 3 Features (src/features/)
| Feature | Description | Key Patterns |
|---------|-------------|--------------|
| **Layout** | App shell | Header + main content, composes NavMenu + Logo + AlertsButton |
| **Logo** | Brand logo | Simple image/text display |
| **AlertsButton** | Notification button | Icon button for alerts |

### All 3 Services (src/services/)
| Service | Files | Purpose | Key Patterns |
|---------|-------|---------|--------------|
| **Routing** | `.context.tsx` | Next.js + React Aria router integration | RouterProvider wraps app, module declaration for TypeScript |
| **Responsive** | `.config.ts`, `.context.tsx`, `.utils.tsx`, `.types.ts` | Viewport tracking & breakpoints | Sets --vh and --vw CSS variables dynamically |
| **Share** | `.ts`, `.types.ts`, `hook/useShare.tsx` | Web Share API + social links | Static class with share methods, hook for modal integration |

### All Utilities (src/utils/)
| Utility | Purpose | Signature |
|---------|---------|-----------|
| **joinClassNames** | Combine CSS classes | `(...classes: (string \| number \| undefined \| boolean)[]) => string` |
| **isPathActive** | Check if route is active | `(itemPath: string, activePath: string) => boolean` |

---

## ✅ CODE QUALITY CHECKLIST

Before submitting ANY code change, verify:

### Structure
- [ ] Component follows exact folder structure (`.tsx`, `.types.ts`, `.module.css`, `index.ts`)
- [ ] All interfaces start with `I` prefix
- [ ] CSS classes use PascalCase
- [ ] Barrel exports in `index.ts`
- [ ] Imports ordered: external → utils → components → types → styles

### TypeScript
- [ ] Props interface named `IComponentNameProps`
- [ ] Children typed as `React.ReactNode`
- [ ] Props destructured in function parameters
- [ ] Types exported from `.types.ts` file

### Styling
- [ ] CSS Module file named `ComponentName.module.css`
- [ ] CSS classes use PascalCase (`.Button`, not `.button`)
- [ ] Colors use CSS variables: `rgb(var(--clr-primary-rgb))`
- [ ] Spacing uses rem units (`1rem`, `1.5rem`)
- [ ] CVA config only if multiple variants exist

### React Patterns
- [ ] `"use client"` directive if using hooks/state
- [ ] Default export for component
- [ ] Named exports for types
- [ ] No arrow functions for component definitions
- [ ] React Aria Components wrapped with custom styling

### Service/Utilities
- [ ] Services use static class pattern
- [ ] Hooks prefixed with `use`
- [ ] Event handlers prefixed with `on` (props) or `handle` (internal)
- [ ] Context providers have dedicated `.context.tsx` file

---

## 🚫 COMMON MISTAKES TO AVOID

| ❌ Wrong | ✅ Correct | Rule |
|---------|----------|------|
| `ButtonProps` | `IButtonProps` | All interfaces need `I` prefix |
| `.button-primary` | `.ButtonPrimary` | CSS classes are PascalCase |
| `Button.css` | `Button.module.css` | Use CSS Modules |
| `button.tsx` | `Button.tsx` | Files are PascalCase |
| `background: #000` | `rgb(var(--clr-primary-rgb))` | Use CSS variables |
| `children: JSX.Element` | `children?: React.ReactNode` | Use React.ReactNode |
| Arrow function export | Named function export | Use named functions |
| No barrel exports | Barrel exports in `index.ts` | Always export via index |
| `.config.ts` for simple components | Only for variant-heavy | CVA only when needed |

---

## 📚 KEY DEPENDENCIES

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^16.1.1 | React framework |
| `react` | ^19.2.3 | UI library |
| `react-aria-components` | ^1.14.0 | Accessible components |
| `class-variance-authority` | ^0.7.1 | Variant styling |
| `lodash` | ^4.17.21 | Utilities |
| `typescript` | ^5 | Type safety |

---

## 🎓 LEARNING FROM EXAMPLES

### Reference Components
Study these components as examples:

**Simple Component**: [Card](src/components/Card)
- Basic structure without CVA
- PascalCase CSS classes
- Clean prop destructuring

**Complex Component**: [Button](src/components/Button)
- CVA configuration for variants
- React Aria integration
- Multiple variant combinations

**Service**: [Share](src/services/Share)
- Static class pattern
- Custom hook integration
- Type definitions

**Context**: [Responsive](src/services/Responsive)
- Context provider pattern
- Custom hook for context access
- Configuration with enums

---

## 🚨 CRITICAL: REACT ARIA DOCUMENTATION WORKFLOW

### Before Creating ANY Component

**MANDATORY 3-STEP PROCESS**:

#### Step 1: Check Existing Components FIRST
```bash
# Check if component already exists in codebase
ls src/components/ | grep -i "ComponentName"
```

**Available React Aria Components in Codebase**:
- ✅ Button → Use `@/components/Button`
- ✅ Link → Use `@/components/Link`
- ✅ TextField → Use `@/components/TextField`
- ✅ TextArea → Use `@/components/TextArea`
- ✅ Select → Use `@/components/Select`
- ✅ Modal → Use `@/components/Modal`
- ✅ Tabs → Use `@/components/Tabs`
- ✅ Slider → Use `@/components/Slider`
- ✅ SearchField → Use `@/components/SearchField`

**🚨 IF COMPONENT EXISTS**: Use it. DO NOT create duplicate.

#### Step 2: Check React Aria Documentation
If component doesn't exist, search React Aria docs:
```
https://react-spectrum.adobe.com/react-aria/components.html
```

**Check if React Aria provides the component**:
- ✅ If YES → Use React Aria component as base
- ❌ If NO → Create custom component following codebase patterns

#### Step 3: Implementation Pattern
```typescript
// ✅ CORRECT: Use React Aria component + custom styling
"use client";

import { ComponentName as ReactAriaComponent } from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";

import { IComponentNameProps } from "./ComponentName.types";
import styles from "./ComponentName.module.css";

function ComponentName({ className, ...props }: IComponentNameProps) {
  return (
    <ReactAriaComponent
      className={joinClassNames(styles.ComponentName, className)}
      {...props}
    >
      {/* Content */}
    </ReactAriaComponent>
  );
}

export default ComponentName;
```

### React Aria Documentation URLs (REFERENCE)
| Component | React Aria Docs |
|-----------|----------------|
| Button | https://react-spectrum.adobe.com/react-aria/Button.html |
| TextField | https://react-spectrum.adobe.com/react-aria/TextField.html |
| Select | https://react-spectrum.adobe.com/react-aria/Select.html |
| Modal | https://react-spectrum.adobe.com/react-aria/Modal.html |
| Tabs | https://react-spectrum.adobe.com/react-aria/Tabs.html |
| Slider | https://react-spectrum.adobe.com/react-aria/Slider.html |
| Checkbox | https://react-spectrum.adobe.com/react-aria/Checkbox.html |
| RadioGroup | https://react-spectrum.adobe.com/react-aria/RadioGroup.html |
| ComboBox | https://react-spectrum.adobe.com/react-aria/ComboBox.html |
| DatePicker | https://react-spectrum.adobe.com/react-aria/DatePicker.html |

---

## 💡 BEST PRACTICES

1. **Check Existing Components FIRST**: NEVER duplicate. Check `src/components/` before creating
2. **Read React Aria Docs SECOND**: If component doesn't exist, check React Aria documentation
3. **Read Codebase THIRD**: Study similar existing components to match patterns
4. **Consistency First**: Match existing patterns exactly
5. **No Over-Engineering**: Keep solutions simple and focused
6. **Type Safety**: Leverage TypeScript fully with `I` prefix interfaces
7. **Accessibility**: ALWAYS use React Aria Components when available
8. **Responsive**: Test across breakpoints (mobile: 380px, tablet: 768px, desktop: 1023px)
9. **CSS Variables**: Use global color variables with rgb() composition
10. **Clean Imports**: Follow 5-step import ordering (external → utils → components → types → styles)
11. **Barrel Exports**: Always export through `index.ts` (component + types)
12. **No Backwards-Compat Hacks**: Remove unused code completely, no `_unused` variables

---

## 🔍 VALIDATION COMMANDS

```bash
# TypeScript check
npm run type-check

# Linting
npm run lint

# Build check
npm run build

# Development server
npm run dev
```

---

## 🎯 IMPLEMENTATION WORKFLOW (FOLLOW EXACTLY)

### When Asked to Create a Component

```
1. CHECK EXISTING COMPONENTS
   ├─ Search src/components/ for similar component
   ├─ If exists → USE IT (import and use, DO NOT recreate)
   └─ If doesn't exist → Proceed to step 2

2. CHECK REACT ARIA DOCUMENTATION
   ├─ Visit https://react-spectrum.adobe.com/react-aria/
   ├─ Search for component type
   ├─ If React Aria provides it → Use as base (go to step 3)
   └─ If React Aria doesn't provide → Create custom (go to step 3)

3. STUDY SIMILAR COMPONENTS IN CODEBASE
   ├─ Find component with similar complexity
   ├─ Read Button.tsx for CVA + React Aria pattern
   ├─ Read Card.tsx for simple component pattern
   ├─ Read Modal.tsx for React Aria wrapper pattern
   └─ Match patterns EXACTLY

4. CREATE FILE STRUCTURE
   /ComponentName/
   ├── ComponentName.tsx
   ├── ComponentName.types.ts
   ├── ComponentName.module.css
   ├── ComponentName.config.ts (ONLY if multiple variants)
   └── index.ts

5. IMPLEMENT FOLLOWING PATTERNS
   ├─ "use client" if using hooks
   ├─ Import order: external → utils → components → types → styles
   ├─ Props interface with 'I' prefix
   ├─ Named function component (NOT arrow function)
   ├─ PascalCase CSS classes
   ├─ CSS variables for colors
   └─ Barrel export in index.ts

6. VERIFY CHECKLIST (Below)
```

### When Asked to Modify Existing Code

```
1. READ THE FILE FIRST (MANDATORY)
   ├─ Use Read tool to view current implementation
   ├─ Study existing patterns
   └─ Understand current structure

2. CHECK RELATED FILES
   ├─ .types.ts for interfaces
   ├─ .module.css for styles
   ├─ .config.ts if exists
   └─ index.ts for exports

3. MAKE MINIMAL CHANGES
   ├─ Change ONLY what's requested
   ├─ Match existing style EXACTLY
   ├─ Don't refactor unrelated code
   └─ Don't add features not requested

4. VERIFY PATTERNS STILL MATCH
   └─ Check all rules in this document
```

---

## ✅ FINAL VERIFICATION CHECKLIST

Before considering ANY code complete, verify ALL items:

### File Structure ✓
- [ ] Component in correct folder (`components/`, `features/`, or `pages_lib/`)
- [ ] Has `.tsx` file (PascalCase name)
- [ ] Has `.types.ts` file
- [ ] Has `.module.css` file
- [ ] Has `index.ts` barrel export
- [ ] Has `.config.ts` ONLY if using CVA variants

### TypeScript ✓
- [ ] All interfaces have `I` prefix (IComponentNameProps)
- [ ] Props destructured in function parameters
- [ ] `children?: React.ReactNode` (NOT JSX.Element or ReactNode)
- [ ] Props extend correct base (React Aria component props if applicable)
- [ ] `VariantProps<typeof config>` if using CVA

### Component Code ✓
- [ ] `"use client"` directive if using hooks (FIRST line, no blanks before)
- [ ] Import order: external → utils → components → types → styles
- [ ] Named function export (NOT arrow function)
- [ ] `export default ComponentName` at bottom
- [ ] Uses `joinClassNames` for className merging
- [ ] React Aria component used if available

### CSS Module ✓
- [ ] File named `ComponentName.module.css`
- [ ] All classes PascalCase (.Container, .Title, .Active)
- [ ] Uses CSS variables for colors: `rgb(var(--clr-primary-rgb))`
- [ ] Local CSS variables declared first in rule
- [ ] rem units for spacing (1rem, 1.5rem, 0.75rem)
- [ ] Transitions use `240ms ease`
- [ ] Media queries at bottom

### Barrel Export ✓
- [ ] `index.ts` has exactly 2 lines
- [ ] Line 1: `export { default } from "./ComponentName";`
- [ ] Line 2: `export * from "./ComponentName.types";`

### React Aria Integration ✓
- [ ] Checked if React Aria provides this component type
- [ ] Used React Aria component if available
- [ ] Props use React Aria naming (`isDisabled` not `disabled`)
- [ ] Wrapped with custom styling via `className`

### Accessibility ✓
- [ ] Interactive elements use React Aria components
- [ ] Navigation uses `useLandmark` hook if applicable
- [ ] ARIA attributes provided by React Aria

### Code Quality ✓
- [ ] No duplicate components
- [ ] No unused imports
- [ ] No unused variables (remove completely, don't rename to `_unused`)
- [ ] No over-engineering (keep it simple)
- [ ] No mixing camelCase and PascalCase

---

## 📞 QUESTIONS?

If you're unsure about a pattern:
1. ✅ Check this document FIRST
2. ✅ Find similar existing component in codebase
3. ✅ Check React Aria documentation if applicable
4. ✅ Follow the established pattern EXACTLY
5. ❌ NEVER deviate without explicit approval

**Golden Rule**: Consistency is more valuable than innovation in this codebase.

---

## 🚀 QUICK REFERENCE

### Most Common Patterns
```typescript
// Import pattern
import { useState } from "react";
import { ComponentName } from "react-aria-components";
import { joinClassNames } from "@/utils/classNames";
import { IProps } from "./Component.types";
import styles from "./Component.module.css";

// Interface pattern
export interface IComponentProps {
  children?: React.ReactNode;
  className?: string;
}

// Component pattern
function Component({ children, className }: IComponentProps) {
  return (
    <div className={joinClassNames(styles.Container, className)}>
      {children}
    </div>
  );
}

export default Component;

// Barrel export pattern (index.ts)
export { default } from "./Component";
export * from "./Component.types";
```

### File Paths to Remember
- Components: `src/components/ComponentName/`
- Features: `src/features/FeatureName/`
- Services: `src/services/ServiceName/`
- Utils: `src/utils/utilName.ts`
- Global CSS: `src/styles/css/`
- Pages: `src/pages_lib/PageName/`

**Remember**: Every detail matters. Follow EVERY rule in this document.
