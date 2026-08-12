# Security Labs

Hands-on security laboratories demonstrating vulnerability analysis, exploitation in controlled environments, secure implementation and remediation.

These labs are designed to demonstrate how security weaknesses arise in applications and APIs, how they can be identified, and how the underlying security control can be implemented correctly.

---

## Lab Directory

| Lab | Category | Focus | Status |
|---|---|---|---|
| [Broken Access Control / BOLA](broken-access-control/) | API Security | Object-level authorization | In Progress |

---

## Lab Methodology

Each laboratory follows a consistent security-engineering approach:

```text
Vulnerable Application
        ↓
Understand Application Behavior
        ↓
Identify Security Boundary
        ↓
Demonstrate Vulnerability
        ↓
Analyze Root Cause
        ↓
Implement Security Control
        ↓
Retest
        ↓
Document Findings

The objective is not simply to demonstrate an exploit.

The objective is to understand why the vulnerability exists and how the application can be engineered to prevent it.

Laboratory Principles

All laboratories are designed around:

Controlled environments
Intentionally vulnerable applications
Dummy data
Local testing
Reproducible research
Secure-coding principles
Responsible security testing

No unauthorized systems or real customer data are used.

Security Areas

Future laboratories may cover:

Web Application Security
Cross-Site Scripting
Injection
Authentication
Authorization
Session Security
Security Misconfiguration
Business Logic
File Upload Security
API Security
BOLA / IDOR
Broken Authentication
JWT Security
Mass Assignment
Excessive Data Exposure
Rate Limiting
API Misconfiguration
Business Logic
Secure Engineering
Vulnerable vs secure implementations
Input validation
Output encoding
Authorization controls
Secure API design
Security regression testing
Current Laboratory
Broken Access Control / BOLA

A controlled REST API demonstrating how missing object-level authorization can allow an authenticated user to access another user's resource.

Components:

broken-access-control/
│
├── README.md
├── vulnerable/
│   ├── server.js
│   └── package.json
│
└── secure/
    ├── server.js
    └── package.json

The laboratory demonstrates:

Authentication
      ↓
Object Request
      ↓
Authorization Decision
      ↓
Allow / Deny

It compares an intentionally vulnerable implementation with a secure implementation that enforces object-level authorization.

→ Open the BOLA Lab

Future Research

This laboratory collection will expand as additional controlled security research is completed.

The emphasis will remain on:

Understand → Test → Analyze → Remediate → Verify
