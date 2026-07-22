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

---

### Login

Allows users to authenticate using:

- Email
- Password

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
- Contact Information

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

## Tourism Category

Each project belongs to one category.

Examples:

- Smart Tourism
- Eco Tourism
- Cultural Heritage
- Hospitality
- Food Tourism
- Transportation
- Community Tourism
- Accessibility
- Mobile Application
- Web Application
- AI Solution
- IoT Solution
- AR/VR Experience

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

Supported:

- PDF
- DOCX

---

### External Links

Supports:

- GitHub Repository
- Live Demo
- Figma Design
- Presentation Slides

---

# Module 5 — Exhibition Gallery

## Purpose

Displays all approved projects.

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

Shows latest approved submissions.

---

### Popular Projects

Sorted by:

- Views
- Likes
- Votes

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
- Slides

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

---

# Module 8 — Favourite Projects

Guests can bookmark projects.

Functions:

- Add Favourite
- Remove Favourite
- Favourite List

---

# Module 9 — Voting System

Allows public participation.

Supports:

- People's Choice Award
- One vote per project
- One vote per user
- Vote statistics

---

# Module 10 — Comments & Discussion

Guests can interact with exhibitors.

Supports:

- Leave comments
- Ask questions
- Exhibitor replies
- Threaded discussion

Administrator may moderate comments.

---

# Module 11 — Analytics Dashboard

Available to Exhibitors.

Displays:

- Total Views
- Total Likes
- Total Votes
- Visitor Trends
- Daily Visitors
- Referral Sources

---

# Module 12 — Administrator Dashboard

Provides exhibition overview.

Displays:

- Total Projects
- Total Visitors
- Total Exhibitors
- Total Guests
- Published Projects
- Pending Approvals
- Popular Categories
- Active Users

---

# Module 13 — Project Review & Approval

Administrator reviews submissions.

Actions:

- Approve
- Reject
- Return for Revision

Review notes are recorded.

---

# Module 14 — Category Management

Administrator manages:

- Tourism Categories
- Technology Tags
- SDG Tags

Supports:

- Create
- Edit
- Delete

---

# Module 15 — Announcement Management

Administrator publishes:

- News
- Exhibition Schedule
- Deadlines
- Maintenance Notices

Announcements appear on homepage.

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

- Daily Visitors
- Monthly Visitors
- Page Views

---

## Voting Report

- Total Votes
- Popular Projects
- Award Winners

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
- Visitors

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

---

## Security

- Password encryption
- Role-based authorization
- Secure file upload
- Input validation

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
