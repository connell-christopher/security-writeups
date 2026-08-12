
# Security Writeups

Technical security research and practical application-security analysis by **Connell Christopher**, focused on Web Application Security, API Security and Secure Software Engineering.

This repository contains authorized security research, controlled laboratory exercises, vulnerability analysis, secure-coding studies and application-security methodology.

---

## About

I focus on understanding how modern web applications and APIs are designed, how security controls are implemented, where those controls can fail and how the underlying conditions can be remediated.

My technical foundation includes:

- JavaScript
- SQL
- HTML
- HTTP
- REST APIs
- JSON
- YAML
- Bash
- Linux
- Secure coding

My security research is primarily aligned with the **OWASP Top 10**, API security principles and secure software engineering practices.

---

## Security Focus

### Web Application Security

- Cross-Site Scripting (XSS)
- SQL Injection
- Authentication
- Authorization
- Access Control
- Security Misconfiguration
- Business Logic
- Input Validation
- Session Security

### API Security

- BOLA / IDOR
- Authentication
- JWT Security
- Authorization
- Input Validation
- Mass Assignment
- Data Exposure
- Rate Limiting
- Business Logic
- API Misconfiguration

### Secure Software Engineering

- Vulnerable code analysis
- Root-cause analysis
- Secure implementation
- Security controls
- Remediation
- Retesting
- Security-aware application design

---

# Technical Write-ups

## Web Application Security

### Cross-Site Scripting

**Stored XSS**

Demonstrates the security impact of unsafe handling and rendering of user-controlled data.

→ [`stored-xss.md`](web-application-security/xss/stored-xss.md)

---

### Injection

**SQL Injection**

Examines unsafe database query construction, parameterized queries, input handling and database security.

→ [`sql-injection.md`](web-application-security/injection/sql-injection.md)

---

## API Security

### Authorization

**BOLA / IDOR**

Examines object-level authorization and the security boundary between authenticated users and resources.

→ [`bola.md`](api-security/authorization/bola.md)

---

### Authentication

**JWT Security**

Examines token-based authentication, JWT validation and common implementation weaknesses.

→ [`jwt-security.md`](api-security/authentication/jwt-security.md)

---

### Input Validation

**Mass Assignment**

Examines excessive trust in client-controlled object properties and secure property-level authorization.

→ [`mass-assignment.md`](api-security/input-validation/mass-assignment.md)

---

# Security Assessment Methodology

My application-security assessment process follows a structured lifecycle:

```text
Authorization & Scope
        ↓
Reconnaissance
        ↓
Attack Surface Mapping
        ↓
Application / API Analysis
        ↓
Authentication Testing
        ↓
Authorization Testing
        ↓
Input & Injection Testing
        ↓
Business Logic Testing
        ↓
Configuration Review
        ↓
Impact Assessment
        ↓
Reporting
        ↓
Remediation
        ↓
Retesting

The objective is not simply to identify a vulnerability.

The objective is to understand:

What happened?
     ↓
Why did it happen?
     ↓
What can it affect?
     ↓
How should it be fixed?
     ↓
Does the fix actually work?

→ Web Application Security Assessment Methodology

OWASP Alignment

The research in this repository is informed by application-security principles from the OWASP ecosystem, including:

OWASP Top 10
OWASP Web Security Testing Guide
OWASP API Security guidance
Secure coding principles
Authentication and authorization guidance

Relevant write-ups identify:

Vulnerability class
Attack surface
Root cause
Security impact
Testing methodology
Remediation
Verification
Relevant security classification
Research Methodology

Security research generally follows:

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

Testing focuses on understanding application behavior and security boundaries rather than simply relying on automated vulnerability discovery.

Responsible Disclosure & Confidentiality

Security testing should always be performed with appropriate authorization.

Research documented here is intended for:

Authorized security testing
Controlled laboratories
Intentionally vulnerable applications
Independently created research
Educational environments
Secure-coding exercises

I do not publish:

Confidential information
Private source code
Customer information
Credentials or secrets
Undisclosed vulnerabilities
Security findings covered by confidentiality agreements

Professional security findings subject to NDA remain private.

Where appropriate, lessons from professional security work may be represented through independently reproducible research or anonymized security concepts without exposing the affected organization or sensitive technical information.

Engineering Perspective

Security is closely connected to software engineering.

Understanding the application beneath the attack surface makes it possible to reason about:

Client
  ↓
HTTP
  ↓
Application Logic
  ↓
Security Controls
  ↓
API
  ↓
Database

This engineering perspective helps identify root causes and develop remediation that addresses the underlying condition rather than simply suppressing the visible symptom.

Current Status

This repository is actively being developed.

Future research will expand into:

Additional Web Application Security research
API security
Authentication and authorization
Business logic
Secure coding
Security testing methodology
Controlled application-security laboratories
Author

Connell Christopher

Web Application Security · API Security · Secure Coding

Focused on building and securing modern web applications and APIs.

Disclaimer

All security research published in this repository is intended for authorized testing, controlled laboratories and educational purposes.

No unauthorized systems should be tested using techniques described in these materials.


## Commit it as

```text
Improve security writeups repository documentation
After this commit

Your repository will have a much cleaner progression:

security-writeups
│
├── README.md                    ← Recruiter entry point
│
├── web-application-security
│   ├── xss
│   │   └── stored-xss.md
│   └── injection
│       └── sql-injection.md
│
├── api-security
│   ├── authorization
│   │   └── bola.md
│   ├── authentication
│   │   └── jwt-security.md
│   └── input-validation
│       └── mass-assignment.md
│
└── methodology
    └── web-application-security-assessment.md
