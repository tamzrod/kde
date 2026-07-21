# Reusable Dashboard Components

## Overview

This document defines common dashboard components and their design specifications.

---

## KPI Card

### Structure

```jsx
┌────────────────────────────────┐
│ Label (secondary, 14px)       │
│                                │
│ Value (primary, 32px, bold)   │
│                                │
│ Change indicator + percentage  │
│                                │
│ ──────────────────────────── │
│ Sparkline or icon             │
└────────────────────────────────┘
```

### States

| State | Appearance |
|-------|------------|
| Default | Normal colors |
| Loading | Skeleton pulse |
| Error | Muted with error icon |
| Empty | Dashed border, "No data" |

### Variants

- **Compact**: Single line, smaller
- **Large**: More context, sparkline
- **Comparison**: vs. previous period

---

## Data Table

### Structure

```jsx
┌──────────────────────────────────────────────┐
│ Header Row                                   │
│ ┌────────┬─────────┬────────┬────────┐       │
│ │ Sort ▼ │ Sort    │ Sort ▲ │ Actions│       │
│ └────────┴─────────┴────────┴────────┘       │
├──────────────────────────────────────────────┤
│ Data Rows                                    │
│ ┌────────┬─────────┬────────┬────────┐       │
│ │ Cell   │ Cell    │ Cell   │ Icon  │       │
│ ├────────┼─────────┼────────┼────────┤       │
│ │ Cell   │ Cell    │ Cell   │ Icon  │       │
│ └────────┴─────────┴────────┴────────┘       │
├──────────────────────────────────────────────┤
│ Pagination                                   │
│ Showing 1-20 of 1,234    < 1 2 3 ... 62 >   │
└──────────────────────────────────────────────┘
```

### Features

- [ ] Column sorting
- [ ] Column resize
- [ ] Row selection
- [ ] Inline actions
- [ ] Expandable rows
- [ ] Sticky header
- [ ] Virtual scroll

---

## Chart Container

### Structure

```jsx
┌────────────────────────────────────────────┐
│ Chart Header                               │
│ ┌──────────────────────────────────────┐  │
│ │ Title                    [⋮] [↗]   │  │
│ └──────────────────────────────────────┘  │
├────────────────────────────────────────────┤
│ Chart Area                                 │
│                                            │
│                                            │
│                                            │
│                                            │
├────────────────────────────────────────────┤
│ Legend                                      │
│ ○ Series 1   ○ Series 2   ○ Series 3       │
└────────────────────────────────────────────┘
```

### Controls

| Control | Purpose |
|---------|---------|
| Menu (⋮) | Export, settings |
| Maximize (↗) | Full screen |
| Refresh | Reload data |
| Time range | Quick select |

---

## Filter Bar

### Structure

```jsx
┌──────────────────────────────────────────────────────────┐
│ [Date Range ▼] [Region ▼] [Status ▼] [Search...] [🔍] │
└──────────────────────────────────────────────────────────┘
```

### Filter Types

| Type | Component | Example |
|------|-----------|---------|
| Date | Date picker | Last 7 days |
| Select | Dropdown | Region |
| Multi-select | Multi-dropdown | Tags |
| Search | Text input | Name contains |
| Range | Slider or inputs | 100-500 |

---

## Sidebar Navigation

### Structure

```jsx
┌─────────────────┐
│ Logo            │
├─────────────────┤
│ Navigation       │
│ ├─ Dashboard    │
│ ├─ Reports    ▼ │
│ │  ├─ Daily    │
│ │  └─ Weekly  │
│ └─ Settings    │
├─────────────────┤
│ User             │
│ [Avatar] Name    │
│ [⚙] [🚪]         │
└─────────────────┘
```

### States

| State | Appearance |
|-------|------------|
| Default | Normal text |
| Hover | Background highlight |
| Active | Bold, accent border |
| Collapsed | Icons only |

---

## Alert/Notification

### Structure

```jsx
┌─────────────────────────────────────────────┐
│ ⚠ Title                              [✕]   │
│ Description message...                      │
│ Action 1    Action 2                       │
└─────────────────────────────────────────────┘
```

### Types

| Type | Color | Icon |
|------|-------|------|
| Error | Red | 🚨 |
| Warning | Amber | ⚠️ |
| Success | Green | ✅ |
| Info | Blue | ℹ️ |

---

## Tabs

### Structure

```jsx
┌──────────────────────────────────────────┐
│ [Overview] [Details] [History] [+New]   │
├──────────────────────────────────────────┤
│ Content area                              │
│                                           │
│                                           │
└──────────────────────────────────────────┘
```

### Patterns

- **Underline**: Bottom border on active
- **Pill**: Background fill on active
- **Vertical**: Side navigation

---

## Modal/Dialog

### Structure

```jsx
┌─────────────────────────────────────────┐
│ Header                          [✕]    │
├─────────────────────────────────────────┤
│                                         │
│ Content                                  │
│                                         │
├─────────────────────────────────────────┤
│ Footer                                   │
│ [Cancel]              [Confirm]          │
└─────────────────────────────────────────┘
```

### Sizes

| Size | Width | Use |
|------|-------|-----|
| Small | 400px | Forms |
| Medium | 600px | Tables |
| Large | 800px | Complex |
| Full | 100% | Rarely |

---

## Empty State

### Structure

```jsx
┌─────────────────────────────────────────┐
│                                         │
│              [Illustration]             │
│                                         │
│            No data yet                  │
│                                         │
│   Start by adding your first item       │
│                                         │
│          [+ Add Item]                    │
│                                         │
└─────────────────────────────────────────┘
```

### Purpose

- Explain empty state
- Guide user action
- Encourage engagement

---

## Loading States

### Skeleton

```jsx
┌─────────────────────────────────────────┐
│ ██████████████                          │
│ ████ ████████ ████████ ██████          │
│ ████████████████████████████           │
│ ████ ██████ ██████                    │
└─────────────────────────────────────────┘
```

### Spinner

```jsx
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│              ◌ Loading...              │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Progress

```jsx
┌─────────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░░  50%         │
│                                         │
└─────────────────────────────────────────┘
```

---

## Summary

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| KPI Card | Single metric | Value, trend, sparkline |
| Table | Data grid | Sort, filter, paginate |
| Chart | Visualization | Header, legend, controls |
| Filter | Data selection | Date, select, search |
| Sidebar | Navigation | Menu, user profile |
| Alert | Notifications | Type, actions |
| Tabs | View switching | Underline, pill |
| Modal | Focus dialog | Sizes, footer |
| Empty | No data state | Illustration, action |
| Loading | Progress | Skeleton, spinner |

---

*Source: Material Design, Carbon Design System, Ant Design*
