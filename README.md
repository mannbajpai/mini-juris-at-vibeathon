# StageSync App

## Overview
The **Speaker Persona App** simplifies and automates the speaker and content lifecycle for events such as SIT/Vibeathon. It enables **speakers** to manage session submissions, availability, and event-day activities seamlessly, while providing **event managers** a centralized platform to review, approve, and organize sessions, logistics, and communications. The app incorporates **AI-powered agents** to enhance efficiency by providing insights, feedback, and automation features that improve event planning and execution.

## Features

### Speaker Features
- **Session Management:** Submit and edit sessions (title, abstract, track, co-speaker).
- **Availability & Confirmations:** Confirm participation after selection.
- **Document Handling:** Upload presentations via secure links, access official templates.
- **Agenda Access:** View published agenda in real time.
- **Event Tools:** QR code for check-in and t-shirt collection (auto-disabled after use).
- **Post-Event Access:** Download certificates once published.

### Event Manager Features
- **Session Review & Selection:** Approve, reject, or hold session proposals; assign types, tracks, and timeslots.
- **Agenda Builder:** Dynamically create, edit, and publish the event agenda (color-coded by confirmations).
- **Communication Tools:** Manage automated emails, speaker briefings, and reminders.
- **Change Requests:** Accept/reject speaker-proposed changes pre-event.
- **Resource Management:** Manage certificate templates, QR-based resource distribution, and speaker materials.
- **Feedback System:** Create feedback forms, gather structured responses, and generate insights.

### AI-Agent Powered Enhancements
- **Proposal Review Automation:** NLP-based AI agent assists in reviewing proposals, highlighting quality, relevance, and alignment with event objectives.
- **Event Feedback Analysis:** AI analyzes post-event ratings and feedback to generate actionable suggestions for future improvements (e.g., session diversity, pacing, resource logistics).
- **Predictive Insights:** Highlights potential scheduling conflicts, predicts speaker availability risks, and recommends agenda optimizations.
- **Continuous Learning:** AI improves recommendations over time by learning speaker performance, attendee preferences, and session ratings.

## Tech Stack
- **Frontend:** [Next.js](https://nextjs.org/) – responsive, modern UI with shadcn integration.
- **Backend/APIs:** [Flask](https://flask.palletsprojects.com/) – lightweight, scalable REST APIs managing speaker and event data.
- **Database:** Flexible choice (PostgreSQL/MySQL/Firebase) for structured data storage.
- **AI Models:** Python-based AI services integrated with backend for proposal review, recommendation generation, and feedback analysis.
- **Deployment:** Azure.

## Scalability and Reliability

### Scalability
- Microservices-friendly architecture (Flask backend + Next.js frontend) to support thousands of concurrent users.
- Database optimized for hundreds of sessions and 1000+ speakers.
- AI pipelines designed for scaling with more event data, enhancing recommendations without performance bottlenecks.

### Reliability
- Role-based access control (RBAC) ensures data security and privilege separation.
- Session logs, audit trails, and secure QR codes provide transparency and operational reliability.
- Responsive, mobile-first UI for smooth use across devices during live events.
- Automated reminder and notification system with fallback email queues ensures timely delivery.

## Workflow
1. **Speaker Registration:** Speakers register and submit sessions.
2. **Session Review:** Event managers approve/reject sessions with automated email communications.
3. **Confirmation:** Speakers confirm participation and upload materials.
4. **Agenda Building:** Managers customize and publish agenda.
5. **Event Day:** QR codes manage check-ins, resources, and attendance.
6. **Post-Event:** Feedback collected → AI analyzes → insights generated → certificates issued.

## Deliverables
- Functional web app prototype (frontend: Next.js, backend: Flask APIs).
- AI-powered proposal review and post-event recommendation system.
- Clean, intuitive UI/UX with role-specific dashboards.
- Scalable design for real-world event deployment.


