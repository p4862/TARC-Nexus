<!-- @format -->

# Online Exhibition System Requirements Specification

## Collaborative Development – Visit Malaysia 2026 (VM2026)

---

# 1. Project Overview

## 1.1 Introduction

The Online Exhibition System is a web-based platform developed to showcase student projects produced for the **Collaborative Development** course.

Each project represents a software or digital solution that addresses the **Visit Malaysia 2026 (VM2026)** case study, which promotes sustainable tourism aligned with the United Nations Sustainable Development Goals (UNSDGs).

The exhibition serves as a virtual exhibition hall where visitors can explore innovative digital solutions designed by students. Students (Exhibitors) are able to submit and maintain their projects, while Guests can browse, search, and interact with the exhibition.

The system emphasizes accessibility, usability, and professional presentation of student innovations.

---

# 2. Project Objectives

The system aims to:

- Provide a centralized online platform for student project exhibitions.
- Showcase software and digital innovations developed for VM2026.
- Increase project visibility to lecturers, industry partners, and the public.
- Encourage collaboration and knowledge sharing.
- Promote sustainable tourism awareness through technology.
- Demonstrate how each project contributes towards the Sustainable Development Goals.

---

# 3. Sustainable Development Goals (SDGs)

Every project should support one or more of the following goals:

## SDG 8

**Decent Work and Economic Growth**

Projects that promote tourism businesses, local entrepreneurship, employment, digital marketplaces, economic opportunities, etc.

---

## SDG 11

**Sustainable Cities and Communities**

Projects focusing on smart tourism, cultural preservation, heritage conservation, transportation, accessibility, and community engagement.

---

## SDG 12

**Responsible Consumption and Production**

Projects encouraging sustainable tourism practices, environmental awareness, waste reduction, green tourism, and responsible travel.

---

# 4. User Roles

The system consists of three user roles.

## 1. Administrator

Responsible for managing the exhibition platform.

Responsibilities include:

- Managing users
- Reviewing project submissions
- Approving exhibition projects
- Managing categories
- Managing announcements
- Viewing reports
- Monitoring exhibition statistics

---

## 2. Exhibitor

Students participating in the exhibition.

Responsibilities include:

- Creating project submissions
- Uploading project media
- Updating project information
- Viewing project analytics
- Responding to visitor feedback

---

## 3. Guest

Visitors accessing the exhibition.

Guests can:

- Browse projects
- Search projects
- View project details
- Save favourite projects
- Vote for projects
- Leave comments
- Share projects

---

# 5. System Modules

---

# Module 1 — Authentication

## Purpose

Provides secure access to the system.

### Features

### Registration

Allows new users to create accounts.

Required information:

- Name
- Email
- Password
- Institution
- User Role

Public registration supports the **Exhibitor** and **Guest** roles only.
Administrator accounts must be created or promoted through a trusted
administrative process.

---

### Login

Allows users to authenticate using:

- Email
- Password
- Google OAuth

Google authentication is linked using Google's immutable account identifier
(`google_id`). An existing local account is never linked solely because the
Google email address matches.

---

### Forgot Password

Allows password reset through email verification.

---

### User Session

Maintains authenticated sessions.

Supports:

- Login persistence
- Logout
- Session timeout

---

# Module 2 — User Profile Management

## Purpose

Allows users to manage personal information.

### Features

### Personal Profile

Users can edit:

- Name
- Email
- Profile Picture
- Biography
- Institution

---

### Team Information (Exhibitors)

Each project may consist of multiple team members.

Information includes:

- Team Name
- Team Members
- Student IDs
- Programme
- Supervisor

---

# Module 3 — Project Management

## Purpose

Core module of the exhibition.

Allows exhibitors to create and manage exhibition projects.

---

## Project Information

Each project contains:

- Project Title
- Project Subtitle
- Abstract
- Problem Statement
- Proposed Solution
- Objectives
- Target Users
- Expected Impact

---

## Category

Each project belongs to one category describing the **type of digital solution**.

Tourism relevance is expressed through the project's content and its SDG alignment, not through the category.

Categories:

- Web Application
- Mobile Application
- Progressive Web App (PWA)
- Desktop Application
- Artificial Intelligence
- Internet of Things (IoT)
- Data Analytics
- AR / VR
- Game Development
- API / Backend Service
- Digital Platform
- Other

---

## SDG Alignment

Exhibitors select one or more SDGs.

Supported:

- SDG 8
- SDG 11
- SDG 12

Each SDG should include a short explanation describing how the project contributes.

---

## Technology Stack

Project technologies.

Examples:

- React
- Flutter
- Laravel
- Node.js
- Python
- Firebase
- MySQL
- PostgreSQL
- MongoDB

---

## Development Information

Includes:

- Development Methodology
- System Architecture
- Software Used
- APIs
- Frameworks

---

## Project Status

Possible statuses:

- Draft
- Submitted
- Under Review
- Approved
- Published

The authenticated Exhibitor project workspace lists and paginates only the
current Exhibitor's projects. It may filter that owned list by the documented
statuses above. Drafts can be edited or deleted; non-draft submissions are
read-only to the Exhibitor while they follow the review workflow.

Phase 6 implements the documented forward transitions `Submitted` → `Under
Review` → `Approved` → `Published`. Publication may be scheduled; a project is
public only after `published_at` arrives. Reject and Return for Revision remain
requirements, but no transition is implemented for them because this enum has
no rejected or revision state. Their outcomes must be approved before those
actions are added.

---

# Module 4 — Media Management

## Purpose

Stores project media.

---

### Screenshot Gallery

Upload multiple screenshots.

Supported formats:

- JPG
- PNG
- WEBP

---

### Video Demonstration

Supports:

- YouTube Link
- Vimeo Link
- Uploaded Video

---

### Poster

Upload project poster.

---

### Documents

Upload:

- Proposal
- Final Report
- User Manual
- Technical Documentation
- Presentation Slides

Supported:

- PDF
- DOCX
- PPT
- PPTX

---

### External Links

Supports:

- GitHub Repository
- Live Demo
- Figma Design

Presentation slides are uploaded as project document media. The approved
database schema does not contain an external slides URL.

---

# Module 5 — Exhibition Gallery

## Purpose

Displays all published projects.

Only projects with the `Published` status and a `published_at` value that has
arrived are visible through the public exhibition. Approved projects remain
private until the separate publication transition occurs.

---

### Project Cards

Each card displays:

- Thumbnail
- Project Title
- Team Name
- Category
- SDGs
- Institution

---

### Featured Projects

Administrator selects featured projects.

Displayed prominently on homepage.

---

### Newest Projects

Shows the latest published projects.

---

### Popular Projects

Sorted by:

- Views
- Favourites
- Votes

Phase 5 ranks popularity using the combined total of views, favorites, and
People's Choice votes. The separate "Most Viewed" sort continues to use only
the aggregate view count.

---

# Module 6 — Project Details

## Purpose

Displays complete project information.

---

Contains:

### Overview

- Description
- Objectives
- Problem
- Solution

---

### Media Gallery

- Images
- Videos
- Posters

---

### Team Information

Displays contributors.

---

### SDG Contributions

Explains sustainability impact.

---

### Technologies Used

Displays software stack.

---

### Documentation

Downloadable documents.

---

### External Resources

Buttons linking to:

- GitHub
- Live Demo

Uploaded presentation slides are displayed with the project's downloadable
documentation.

---

# Module 7 — Search & Discovery

## Purpose

Allows visitors to locate projects.

---

Supports searching by:

- Project Name
- Student Name
- Team Name
- Category
- Institution
- Technology
- SDG
- Keywords

---

Supports filtering by:

- Category
- SDG
- Technology
- Year
- Popularity

---

Supports sorting by:

- Most Recent
- Most Popular
- Alphabetical
- Most Viewed

Public search, filter, sort, and pagination parameters are validated by the
Laravel API. Category, SDG, and technology collections use the same published
project query contract as the main gallery.

---

# Module 8 — Favourite Projects

Guests can bookmark projects.

Functions:

- Add Favourite
- Remove Favourite
- Favourite List

Favorite actions require an authenticated account with the Guest role and are
available only for currently published projects. Adding the same favorite more
than once is idempotent and protected by the database's unique user/project
constraint. The authenticated list is available at `/favorites`.

---

# Module 9 — Voting System

Allows public participation.

Supports:

- People's Choice Award
- One vote per project
- One vote per user
- Vote statistics

People's Choice voting requires an authenticated Guest account and a currently
published project. The approved database contract is enforced as one vote per
user per project. Duplicate submissions return a conflict, and the current
workflow does not expose vote removal.

---

# Module 10 — Comments & Discussion

Guests can interact with exhibitors.

Supports:

- Leave comments
- Ask questions
- Exhibitor replies
- Threaded discussion

Administrator may moderate comments.

Authenticated Guests may create root comments and threaded replies. The owning
Exhibitor may respond on their published project; other Exhibitors cannot post
there. Administrators moderate from the public project discussion by removing
a comment and its reply branch. Comments are validated as plain text with a
2,000-character application limit.

Project cards and detail pages also expose a share action. Browsers with the Web
Share API use the native share sheet; other supported browsers copy the
canonical project link. Sharing does not create visitor-level analytics data.

---

# Module 11 — Analytics Dashboard

Available to Exhibitors.

Displays:

- Total Views
- Total Favourites
- Total Votes

Phase 6 provides aggregate totals and a paginated per-project comparison for
the authenticated Exhibitor's own projects. It does not identify individual
visitors.

The following require visitor-level analytics tracking and are planned enhancements (see _Future Expansion_ in `SYSTEM-DATABASE.md`):

- Visitor Trends
- Daily Visitors
- Referral Sources

---

# Module 12 — Administrator Dashboard

Provides exhibition overview.

Displays:

- Total Projects
- Total Exhibitors
- Total Guests
- Published Projects
- Pending Approvals
- Popular Categories

Metrics that depend on future visitor-analytics tracking:

- Total Visitors
- Active Users

The Phase 6 dashboard implements the five schema-backed totals above, the
pending queue (`Submitted` plus `Under Review`), recent submissions, and
popular categories based on currently published projects. It does not display
Total Visitors or Active Users.

---

# Module 13 — Project Review & Approval

Administrator reviews submissions.

Actions:

- Approve
- Reject
- Return for Revision

Review decisions and notes are recorded on the project (`review_notes`, `reviewed_by`, `reviewed_at`).

The implemented workflow lets an Administrator start review, record or update
notes, approve an `Under Review` project, select approved/published work as
featured, and schedule the separate publication transition. Reject and Return
for Revision are intentionally unavailable until their missing status outcomes
are added to the approved contract.

---

# Module 14 — Category Management

Administrator manages:

- Solution Categories
- Technology Tags
- SDG Tags

Supports:

- Create
- Edit
- Delete

Phase 6 validates unique taxonomy values and prevents deletion while a record
is assigned to a project. SDG management remains limited to the supported codes
8, 11, and 12.

---

# Module 15 — Announcement Management

Administrator publishes:

- News
- Exhibition Schedule
- Deadlines
- Maintenance Notices

Announcements appear on homepage.

The Phase 6 announcement workflow provides create, edit, schedule, list, and
delete operations. Up to three announcements whose `published_at` value has
arrived appear on the homepage; future announcements remain private until
their scheduled time.

---

# Module 16 — Reports

Administrator generates reports.

Examples:

## Project Report

- Total Projects
- Categories
- SDGs

---

## User Report

- Total Users
- Active Users
- Institutions

---

## Visitor Report

_Requires visitor-analytics tracking (planned enhancement — see `SYSTEM-DATABASE.md`)._

- Daily Visitors
- Monthly Visitors
- Page Views

---

## Voting Report

- Total Votes
- Popular Projects
- Award Winners

Phase 6 implements project totals by status, category, and SDG; user totals by
role and institution; total votes; top-voted published projects; and all
published projects tied for the current People's Choice lead. Active-user and
visitor reports remain excluded because the current schema cannot support
them.

---

# Module 17 — Homepage

Landing page for all visitors.

Sections include:

## Hero Banner

Visit Malaysia 2026 branding.

---

## About Exhibition

Overview of the exhibition.

---

## Statistics

Displays:

- Projects
- Students
- Institutions
- Visitors (requires future visitor-level analytics and is not displayed by the current implementation)

---

## Featured Projects

Highlighted innovations.

---

## Categories

Project categories.

---

## SDG Showcase

Explains sustainability goals.

---

## Latest Projects

Newest approved submissions.

---

## Popular Projects

Most viewed projects.

---

## Announcements

Recent updates.

---

## Footer

Contains:

- Contact
- Social Media
- Privacy Policy
- Terms of Use

---

# 6. Non-Functional Requirements

## Performance

- Fast page loading
- Responsive interface
- Optimized image loading

Phase 7 serves lazy-loaded project previews from bounded WebP thumbnails while
retaining the validated original media for full-size viewing. Eloquent strict
mode guards development and tests against accidental lazy loading.

---

## Security

- Password encryption
- Role-based authorization
- Secure file upload
- Input validation

Phase 7 adds raster width, height, and decoded-pixel ceilings on top of the
existing extension, MIME, size, and authorization checks. Sensitive mutations
are rate limited, private API responses are non-cacheable, and production
responses support CSP, HSTS, frame, MIME-sniffing, referrer, and browser
permissions protections.

---

## Usability

- Responsive design
- Mobile-friendly
- Accessible navigation
- Intuitive interface

---

## Scalability

The system should support:

- Hundreds of projects
- Thousands of visitors
- Future exhibition events

---

## Maintainability

- Modular architecture
- RESTful API
- Reusable components
- Well-documented codebase

---

# 7. Future Enhancements

Potential future modules include:

- AI-powered project recommendations
- AI chatbot exhibition guide
- Interactive Malaysia tourism map
- Live webinar sessions
- QR Code project access
- Digital certificates
- Virtual Reality exhibition hall
- 3D exhibition booths
- Leaderboards
- Gamification badges
- Multilingual support
- Industry judge evaluation system
- Sponsor showcase
- Internship matching
- Project commercialization portal

---

# 8. Success Criteria

The system will be considered successful if it:

- Successfully showcases all student projects.
- Provides a professional virtual exhibition experience.
- Encourages interaction between exhibitors and guests.
- Clearly demonstrates project contributions towards VM2026 and the SDGs.
- Is scalable for future semesters and exhibitions.
- Serves as a digital portfolio platform for student innovations.
