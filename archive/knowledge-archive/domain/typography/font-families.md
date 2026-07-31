# Font Families

## Overview

This document catalogs professional font families suitable for software interfaces.

---

## Sans-Serif Fonts

### Inter

**Purpose**: Modern UI font optimized for screens

**Characteristics**:
- Open, clear letterforms
- Excellent at small sizes
- Multiple weights
- Variable font support

**Details**:
| Property | Value |
|----------|-------|
| Designer | Rasmus Andersson |
| Publisher | Google Fonts (Open Source) |
| License | SIL Open Font License |
| Weights | 100-900 |

**Use Cases**:
- Primary UI font
- Dashboard text
- Labels
- Body text

**CSS**:
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

### Roboto

**Purpose**: Android and Material Design font

**Characteristics**:
- Geometric sans-serif
- Neutral appearance
- Excellent readability
- Wide language support

**Details**:
| Property | Value |
|----------|-------|
| Designer | Christian Robertson |
| Publisher | Google Fonts |
| License | Apache 2.0 |
| Weights | 100-900 |

**Use Cases**:
- Android apps
- Material Design interfaces
- Technical applications

---

### Segoe UI

**Purpose**: Windows system font

**Characteristics**:
- Windows native
- Excellent ClearType rendering
- Optimized for screens
- Platform consistency

**Details**:
| Property | Value |
|----------|-------|
| Designer | Steve Matteson |
| Publisher | Microsoft |
| License | Proprietary (system) |

**Use Cases**:
- Windows applications
- Desktop software
- System UI

---

### SF Pro

**Purpose**: Apple platform font

**Characteristics**:
- Apple platform native
- Variable font
- Excellent rendering
- SF Pro Display + Text

**Details**:
| Property | Value |
|----------|-------|
| Designer | Apple |
| Publisher | Apple |
| License | Proprietary (system) |

**Use Cases**:
- macOS/iOS applications
- Apple platform apps

---

### Helvetica Neue / Helvetica

**Purpose**: Professional sans-serif

**Characteristics**:
- Classic, neutral
- Excellent legibility
- Professional appearance
- Limited web availability

**Details**:
| Property | Value |
|----------|-------|
| Designer | Max Miedinger |
| Publisher | Linotype |
| License | Commercial |

**Use Cases**:
- Professional branding
- High-end web design
- Print/editorial

---

### IBM Plex Sans

**Purpose**: Technical and professional

**Characteristics**:
- IBM Design Language
- Excellent for data
- Strong technical feel
- Open source

**Details**:
| Property | Value |
|----------|-------|
| Designer | Mike Abbink |
| Publisher | IBM |
| License | SIL Open Font License |

**Use Cases**:
- Enterprise software
- Technical dashboards
- Data-heavy interfaces

---

### Open Sans

**Purpose**: Highly readable sans-serif

**Characteristics**:
- Humanist design
- Optimized for screens
- Excellent legibility
- Wide availability

**Details**:
| Property | Value |
|----------|-------|
| Designer | Steve Matteson |
| Publisher | Google Fonts |
| License | Apache 2.0 |

---

### Source Sans

**Purpose**: Adobe's open source sans-serif

**Characteristics**:
- Adobe open source
- Excellent legibility
- Wide weight range
- Technical documentation

**Details**:
| Property | Value |
|----------|-------|
| Designer | Paul Hunt |
| Publisher | Adobe |
| License | SIL Open Font License |

---

## Monospace Fonts

### JetBrains Mono

**Purpose**: Developer-focused monospace

**Characteristics**:
- Increased x-height
- Distinctive letterforms
- Ligatures (optional)
- Excellent rendering

**Details**:
| Property | Value |
|----------|-------|
| Designer | JetBrains |
| Publisher | JetBrains |
| License | SIL Open Font License |

**CSS**:
```css
font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

---

### Fira Code

**Purpose**: Code with ligatures

**Characteristics**:
- Programming ligatures
- Popular for developers
- Good readability
- Open source

**Details**:
| Property | Value |
|----------|-------|
| Designer | Nikita Prokopov |
| Publisher | Mozilla |
| License | SIL Open Font License |

---

### Cascadia Code

**Purpose**: Windows terminal font

**Characteristics**:
- Microsoft terminal font
- Code ligatures
- Windows native
- Variable font

**Details**:
| Property | Value |
|----------|-------|
| Designer | Microsoft |
| Publisher | Microsoft |
| License | SIL Open Font License |

---

### Source Code Pro

**Purpose**: Adobe's monospace font

**Characteristics**:
- Adobe quality
- Clear letterforms
- Multiple weights
- Open source

**Details**:
| Property | Value |
|----------|-------|
| Designer | Paul Hunt |
| Publisher | Adobe |
| License | SIL Open Font License |

---

### Consolas

**Purpose**: Windows system monospace

**Characteristics**:
- Windows native
- Clear for code
- Print-quality rendering
- System available

**Details**:
| Property | Value |
|----------|-------|
| Designer | Microsoft |
| Publisher | Microsoft |
| License | Proprietary (system) |

---

## Font Comparison Matrix

| Font | Type | License | Best For | Performance |
|------|------|---------|---------|-------------|
| Inter | Sans | OFL | UI | Excellent |
| Roboto | Sans | Apache | Android | Excellent |
| Segoe UI | Sans | System | Windows | Excellent |
| SF Pro | Sans | System | Apple | Excellent |
| Helvetica | Sans | Commercial | Professional | Good |
| IBM Plex Sans | Sans | OFL | Enterprise | Good |
| JetBrains Mono | Mono | OFL | Code/Data | Excellent |
| Fira Code | Mono | OFL | Code | Good |
| Cascadia | Mono | OFL | Windows | Excellent |
| Consolas | Mono | System | Windows | Excellent |

---

## System Font Stacks

### Modern Stack (Recommended)

```css
/* Sans-serif for UI */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Monospace for data */
font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'SF Mono', monospace;
```

### Windows Focus

```css
font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### macOS/iOS Focus

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
```

### Industrial/SCADA Stack

```css
/* High readability for technical interfaces */
font-family: 'Segoe UI', 'Roboto', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## Summary

| Category | Recommended | Alternative |
|----------|-------------|-------------|
| UI Sans-Serif | Inter | Roboto, Segoe UI |
| Platform Native | Segoe UI (Win), SF Pro (Apple) | System fonts |
| Monospace | JetBrains Mono | Fira Code, Consolas |
| Enterprise | IBM Plex Sans | Source Sans |

---

*Source: Google Fonts, Adobe Fonts, Microsoft, JetBrains*
