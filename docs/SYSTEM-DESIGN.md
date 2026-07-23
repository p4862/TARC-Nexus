<!-- @format -->

# DESIGN.md

# Jalin Design System

## Online Exhibition System

### Collaborative Development – Visit Malaysia 2026 (VM2026)

Version: 1.0

---

# 1. Introduction

The **Jalin Design System** is the official design language for the Online Exhibition System developed under the Collaborative Development course.

The design system aims to provide a consistent visual identity, reusable UI patterns, and implementation guidelines that enable developers and AI coding agents to build interfaces that are beautiful, accessible, scalable, and unmistakably Malaysian.

The system should evoke pride in Malaysia while showcasing student innovation through a clean, modern digital exhibition experience.

---

# 2. Design Philosophy

## Vision

Create a digital exhibition that celebrates Malaysia's innovation, culture, tourism, and diversity while maintaining modern software design standards.

---

## Design Goals

The interface should feel:

- Modern
- Friendly
- Premium
- Professional
- Welcoming
- Clean
- Vibrant
- Inspiring

---

## Core Principles

### Celebrate Malaysia

Every page should subtly communicate Malaysian identity without becoming visually overwhelming.

The design should remind users of:

- Nature
- Culture
- Heritage
- Innovation
- Hospitality

Avoid excessive patriotic symbolism.

Instead, use subtle visual cues.

---

### Content First

Projects are the primary focus.

The interface should never compete with project content.

Use whitespace generously.

---

### Simplicity

Prefer:

- fewer colours
- fewer shadows
- fewer decorations

Avoid clutter.

---

### Consistency

Every page should feel like part of the same product.

Spacing, colours, typography, animations and components must remain consistent.

---

### Accessibility

Accessibility is mandatory.

Follow WCAG AA standards.

---

### Responsive First

Every screen must work well on:

- Desktop
- Tablet
- Mobile

---

# 3. Brand Identity

## Brand Name

Online Exhibition

---

## Design Language Name

**Jalin**

"Jalin" represents weaving together:

- innovation
- collaboration
- tourism
- culture
- technology

---

## Brand Personality

The system should feel:

- Warm
- Inclusive
- Trustworthy
- Innovative
- Educational
- Elegant
- Contemporary

---

## Emotional Keywords

Users should feel:

- Proud
- Curious
- Inspired
- Connected
- Welcome

---

# 4. Color Palette

The palette is inspired by Malaysia's natural landscapes instead of merely reproducing the national flag.

---

## Primary

Malaysia Emerald

Purpose

Primary actions

Buttons

Links

Active navigation

```
#0F766E
```

---

## Secondary

Rainforest Green

```
#166534
```

---

## Accent

Hibiscus Red

```
#DC2626
```

Inspired by Malaysia's national flower.

Use sparingly.

---

## Highlight

Royal Songket Gold

```
#D4A017
```

Used for:

- awards
- featured projects
- premium badges

---

## Ocean Blue

```
#0284C7
```

Inspired by Malaysian islands.

---

## Sunset Orange

```
#EA580C
```

Call-to-actions

Highlights

---

## Neutral

Background

```
#FAFAF9
```

---

Surface

```
#FFFFFF
```

---

Border

```
#E5E7EB
```

---

Text Primary

```
#111827
```

---

Text Secondary

```
#6B7280
```

---

## Semantic Colors

### Success

```
#16A34A
```

---

### Warning

```
#F59E0B
```

---

### Error

```
#DC2626
```

---

### Info

```
#2563EB
```

---

# 5. Typography

## Font Family

Primary

```
Geist Sans
```

Fallback

```
Inter
```

System

```
sans-serif
```

---

## Heading

Weight

700

---

## Body

Weight

400

---

## UI Labels

Weight

500

---

## Monospace

```
Geist Mono
```

---

## Typography Scale

Display

48px

---

H1

36px

---

H2

30px

---

H3

24px

---

H4

20px

---

H5

18px

---

Body Large

18px

---

Body

16px

---

Small

14px

---

Caption

12px

---

## Line Height

Headings

120%

Body

160%

---

# 6. Tourism Visual Identity

The interface should communicate Malaysian tourism without overwhelming users.

---

## Photography

Use authentic Malaysian destinations.

Examples

- Langkawi
- Tioman
- Sabah
- Sarawak
- Cameron Highlands
- Kuala Lumpur
- Putrajaya
- Melaka
- Penang
- Taman Negara

Avoid stock photos featuring foreign landmarks.

---

## Cultural Inspiration

Subtle decorative inspiration may be drawn from:

- Batik
- Songket
- Wau Bulan
- Islamic geometric motifs
- Hibiscus flower

Do NOT use these as repeating page backgrounds.

Instead:

- corner decorations
- section dividers
- hero illustrations

---

## Hero Images

Large immersive photography.

Rounded corners.

Dark gradient overlay.

Readable typography.

---

## Illustration Style

Flat illustration.

Minimal gradients.

Rounded shapes.

Friendly.

---

## Icons

Use

Lucide Icons

Only.

Never mix icon libraries.

---

# 7. Layout System

## Maximum Width

```
1440px
```

---

## Content Width

```
1280px
```

---

## Grid

12 Columns

---

## Gutter

24px

---

## Container Padding

Desktop

32px

Tablet

24px

Mobile

16px

---

## Border Radius

Small

8px

Medium

12px

Large

16px

Extra Large

24px

Cards

20px

Hero

28px

---

## Shadows

Small

```
shadow-sm
```

---

Medium

```
shadow-md
```

---

Large

```
shadow-lg
```

Avoid heavy shadows.

---

## Spacing Scale

4

8

12

16

20

24

32

40

48

64

96

128

Only use multiples of 4.

---

# 8. Motion

Animations should be subtle.

Never distract users.

---

## Duration

Fast

150ms

Normal

250ms

Slow

350ms

---

## Easing

```
ease-in-out
```

---

## Hover

Cards

Lift 2px

Shadow increases slightly

---

Buttons

Scale

```
1.02
```

---

Images

Zoom

```
1.03
```

---

Modal

Fade

Scale

---

Drawer

Slide

---

Accordion

Height transition

---

Skeleton

Shimmer animation

---

Loading

Spinner

Skeleton

Progress Bar

---

Never

Bounce

Flash

Shake

Rotate continuously

---

# 9. Components

## Component Library

The project adopts **shadcn/ui** as the primary component library.

Components should not be recreated unless customization is required.

Install only the components needed by the application.

---

## Required Components

### Navigation

- Navigation Menu
- Breadcrumb
- Menubar
- Sidebar
- Dropdown Menu

---

### Buttons

- Button

Variants

- Default
- Secondary
- Outline
- Ghost
- Link
- Destructive

---

### Forms

- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Label
- Form
- Calendar
- Date Picker

---

### Data Display

- Card
- Badge
- Avatar
- Separator
- Table
- Tabs
- Accordion
- Carousel

---

### Feedback

- Alert
- Alert Dialog
- Toast
- Progress
- Skeleton
- Tooltip

---

### Overlay

- Dialog
- Drawer
- Sheet
- Popover

---

### Navigation

- Pagination

---

### Search

- Command
- Combobox

---

### Others

- Scroll Area
- Resizable
- Hover Card

---

## Custom Components

The following components should be developed specifically for the exhibition.

- Hero Banner
- Project Card
- Featured Project Card
- SDG Badge
- Technology Chip
- Category Badge
- Gallery Grid
- Image Viewer
- Team Member Card
- Statistics Card
- Tourism Destination Banner
- Announcement Card
- Comment Card
- Vote Button
- Favourite Button
- Share Button
- Exhibition Timeline

---

# 10. Do's and Don'ts

## Do

Use generous whitespace.

Use Malaysian photography.

Use consistent spacing.

Use rounded corners.

Use subtle animations.

Use accessible colours.

Maintain high contrast.

Use one primary colour per page.

Use semantic colours correctly.

Follow typography hierarchy.

Reuse components.

Use Lucide icons.

Keep interfaces uncluttered.

---

## Don't

Do not use more than three accent colours.

Do not use excessive gradients.

Do not use skeuomorphic design.

Do not use heavy shadows.

Do not use multiple icon libraries.

Do not stretch images.

Do not use inconsistent border radius.

Do not mix font families.

Do not use flashing animations.

Do not place text directly on busy images.

Do not overuse patriotic symbols.

Do not use low-resolution tourism images.

---

# 11. Component Naming Convention

All React components should use **PascalCase**.

Examples

```
HeroBanner.jsx

ProjectCard.jsx

FeaturedProjectCard.jsx

ProjectGallery.jsx

GalleryGrid.jsx

StatisticsCard.jsx

CommentCard.jsx

AnnouncementCard.jsx

TechnologyChip.jsx

CategoryBadge.jsx

SDGBadge.jsx

VoteButton.jsx

FavouriteButton.jsx

ShareButton.jsx

SearchBar.jsx

ProjectFilter.jsx

ProjectForm.jsx

ProjectDetails.jsx

MediaUploader.jsx

TeamMemberCard.jsx

ProfileDropdown.jsx

Navbar.jsx

Footer.jsx

Sidebar.jsx
```

---

## Hooks

Use camelCase beginning with `use`.

Examples

```
useProjects()

useComments()

useVotes()

useFavorites()

useMedia()

useAuth()

useCategories()
```

---

## API Services

Use the suffix `Api`.

Examples

```
projectApi.js

authApi.js

mediaApi.js

commentApi.js

voteApi.js
```

---

## Context Providers

Use the suffix `Context`.

Examples

```
AuthContext.jsx

ThemeContext.jsx

ProjectContext.jsx
```

---

## Pages

Pages should end with `Page`.

Examples

```
HomePage.jsx

ProjectPage.jsx

GalleryPage.jsx

ProfilePage.jsx

DashboardPage.jsx

LoginPage.jsx
```

---

## File Naming

React Components

PascalCase

Hooks

camelCase

Utilities

camelCase

Constants

UPPER_SNAKE_CASE

Assets

kebab-case

---

# Final Design Principles

Before implementing any new screen, verify the following:

- Does the interface reflect Malaysian identity?
- Is the content the primary focus?
- Is the page visually clean?
- Is the spacing consistent?
- Are colours used according to the design system?
- Are only approved components used?
- Is the page accessible?
- Is the page responsive?
- Does it follow the Jalin Design System?

If any answer is **No**, the design should be revised before implementation.
