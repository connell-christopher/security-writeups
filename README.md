# Security Writeups

Technical research and practical security analysis focused on **Web Application Security, API Security and Secure Software Engineering**.

This repository documents security concepts through authorized testing, controlled laboratories, intentionally vulnerable applications, independent research and secure-coding exercises.

---

## Focus Areas

### Web Application Security

- Cross-Site Scripting (XSS)
- Injection
- Authentication
- Authorization
- Access Control
- Security Misconfiguration
- Business Logic
- Session Security
- Input Validation

### API Security

- Authentication & Authorization
- BOLA / IDOR
- JWT Security
- Input Validation
- Excessive Data Exposure
- API Misconfiguration
- Rate Limiting
- Business Logic
- Error Handling

### Secure Software Engineering

- Vulnerable code analysis
- Root-cause analysis
- Secure implementation
- Security controls
- Remediation
- Retesting

---

## Methodology

My security research generally follows this workflow:

```text
Reconnaissance
      ↓
Attack Surface Identification
      ↓
Application / API Analysis
      ↓
Security Control Testing
      ↓
Vulnerability Identification
      ↓
Root Cause Analysis
      ↓
Impact Assessment
      ↓
Remediation
      ↓
Retesting

The objective is not simply to identify a vulnerability, but to understand the underlying condition that allowed it to exist and how that condition can be prevented.

Repository Structure
security-writeups/
│
├── web-application-security/
│   ├── xss/
│   ├── injection/
│   ├── authentication/
│   ├── authorization/
│   ├── security-misconfiguration/
│   └── business-logic/
│
├── api-security/
│   ├── authentication/
│   ├── authorization/
│   ├── data-exposure/
│   ├── input-validation/
│   └── business-logic/
│
├── secure-coding/
│
└── methodology/
Disclosure & Ethics

All testing documented in this repository is intended for:

Authorized security testing
Controlled laboratories
Intentionally vulnerable applications
Independently created research
Educational environments

I do not publish confidential information, private source code, customer information, undisclosed vulnerabilities or security findings covered by confidentiality agreements.

Professional security findings that are subject to NDA remain private.

Where appropriate, lessons from professional work may be represented through anonymized concepts or independently reproducible research without exposing the affected organization or sensitive technical data.

OWASP Alignment

Research is organized around application-security principles informed by the OWASP Top 10 and related application-security guidance.

Each relevant write-up aims to identify:

Vulnerability class
Attack surface
Root cause
Security impact
Testing methodology
Remediation
Verification
Relevant security classification
Status

This repository is actively being developed.

New research, laboratories and secure-coding examples will be added over time.

About

Connell Christopher

Web Application Security · API Security · Secure Coding
