
# Web Application Security Assessment Methodology

> A structured methodology for authorized Web Application Security assessments.

## Overview

A Web Application Security assessment is not simply a search for known vulnerabilities.

The objective is to understand how an application works, identify its security boundaries, evaluate how those boundaries are enforced, determine the impact of weaknesses and provide practical remediation guidance.

My assessment approach follows a structured lifecycle:

```text
Authorization & Scope
        ↓
Reconnaissance
        ↓
Attack Surface Mapping
        ↓
Application Analysis
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
Evidence & Reporting
        ↓
Remediation
        ↓
Retesting
1. Authorization & Scope

Security testing begins with clearly defined authorization.

Before testing, establish:

Target applications
Authorized domains and subdomains
APIs and endpoints within scope
Testing limitations
Permitted techniques
Testing windows
Data-handling requirements
Reporting contacts
Rules of engagement

The purpose is to ensure that security research remains controlled, lawful and non-destructive.

Authorization
      ↓
Defined Scope
      ↓
Rules of Engagement
      ↓
Security Testing
2. Reconnaissance

The objective of reconnaissance is to understand the application's external attack surface.

Areas of interest can include:

Domains and subdomains
Application technologies
API endpoints
Authentication interfaces
Publicly exposed functionality
Parameters
Forms
File-upload functionality
Client-side application behavior
Third-party integrations

Reconnaissance should remain within the authorized scope.

3. Attack Surface Mapping

After reconnaissance, identify how users and external systems interact with the application.

A simplified model is:

                    Application
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
    Web Pages           APIs          External Services
        │                │
        ↓                ↓
    Parameters       JSON / HTTP
        │                │
        └────────┬───────┘
                 ↓
            Application
               Logic
                 ↓
              Database

The objective is to understand where untrusted input enters the system and where security-sensitive decisions are made.

4. Application Analysis

Understanding the application's functionality is important before attempting to identify security weaknesses.

Areas to examine include:

User registration
Login
Password recovery
Account management
Profile management
Administrative functionality
Search
Filtering
File uploads
Data modification
Transactions
Notifications
API functionality

The goal is to understand the application's intended behavior.

Security testing becomes more effective when unexpected behavior can be compared against the application's intended behavior.

5. HTTP & API Analysis

Modern applications frequently rely heavily on HTTP APIs.

Review:

HTTP methods
Status codes
Request parameters
Request bodies
Response bodies
Headers
Cookies
Authentication tokens
Content types
CORS behavior
Error responses

For JSON APIs, understand how data flows between the client and server.

Example:

POST /api/profile
Content-Type: application/json
Authorization: Bearer <REDACTED>
{
  "name": "Test User",
  "email": "user@example.test"
}

The assessment should determine how the server validates and processes each security-relevant component.

6. Authentication Testing

Authentication testing evaluates how the application establishes and maintains user identity.

Areas of review can include:

Registration
Login
Password policies
Password reset
Session management
Token handling
JWT validation
Account recovery
Multi-factor authentication where applicable
Session expiration
Logout behavior

Important questions include:

How does the application establish identity?

How long does that identity remain trusted?

What happens when authentication material becomes invalid?

Authentication should be evaluated separately from authorization.

7. Authorization & Access Control

Authorization determines what an authenticated user is allowed to do.

Testing should consider:

User A
  ↓
Own resources
  ↓
Expected access

User A
  ↓
User B's resources
  ↓
Should access be denied?

Areas of interest include:

Horizontal access control
Vertical privilege escalation
Object-level authorization
Function-level authorization
Administrative functionality
Resource ownership
Role-based access

The presence of a valid authentication token should never automatically imply permission to access every resource.

8. Input & Injection Testing

Identify locations where user-controlled data reaches security-sensitive processing.

Potential areas include:

HTML
JavaScript
SQL queries
Command execution
Template engines
File processing
API parameters
JSON properties
HTTP headers

Testing should determine whether the application maintains an appropriate separation between data and executable instructions.

Examples of security areas include:

Cross-Site Scripting
SQL Injection
Command Injection
Template Injection
Path Traversal
Unsafe Deserialization

Testing should be controlled and focused on demonstrating the security condition rather than causing unnecessary impact.

9. Business Logic Testing

Not every vulnerability is caused by malformed input.

Business logic weaknesses can occur when an application correctly processes individual requests but fails to enforce the intended workflow.

Examples of questions include:

Can a workflow step be skipped?
Can an action be repeated unexpectedly?
Can a user perform an action outside their intended role?
Can security controls be bypassed by changing the order of operations?
Are important state transitions properly enforced?

A useful approach is:

Expected Workflow
       ↓
Actual Workflow
       ↓
Compare Security Assumptions
       ↓
Identify Broken Controls

Business logic testing requires understanding what the application is supposed to do.

10. Security Configuration Review

Review security-relevant configuration where it is within the assessment scope.

Areas can include:

Security headers
CORS
Cookie attributes
Error handling
Debug functionality
Exposed endpoints
Authentication configuration
TLS configuration
Unnecessary services
Default configurations

Security configuration should support the application's intended threat model.

11. Error Handling

Errors can reveal information about an application's internal behavior.

Review whether responses expose:

Stack traces
Database errors
Internal paths
Framework information
Debug information
Sensitive identifiers
Internal service details

A secure application should provide useful information to legitimate users while avoiding unnecessary disclosure of internal implementation details.

12. Impact Assessment

A vulnerability should not be evaluated solely by its technical classification.

Impact assessment considers:

Vulnerability
      ↓
Affected Component
      ↓
Security Boundary
      ↓
Attacker Capability
      ↓
Data / Functionality Affected
      ↓
Business Impact

Potential impact categories include:

Confidentiality
Integrity
Availability
Authentication
Authorization
Privacy
Business operations

The actual impact should be demonstrated or reasonably established within the authorized environment.

13. Evidence Collection

Security findings should contain enough evidence for another engineer or security professional to understand and reproduce the issue.

Useful evidence may include:

HTTP requests
HTTP responses
Relevant application behavior
Screenshots where appropriate
Sanitized logs
Code snippets
Reproduction steps
Security control observations

Sensitive information should be removed or redacted before inclusion in reports.

14. Finding Documentation

A security finding should clearly communicate:

Title

A concise description of the security issue.

Severity

An appropriate severity based on technical and business impact.

Description

What the issue is and where it occurs.

Preconditions

What conditions are required for exploitation.

Reproduction

A controlled sequence demonstrating the issue.

Impact

What an attacker could achieve.

Root Cause

Why the security weakness exists.

Remediation

How the underlying condition should be addressed.

Verification

How the fix can be tested after implementation.

A useful finding structure is:

Finding
   ↓
Evidence
   ↓
Impact
   ↓
Root Cause
   ↓
Remediation
   ↓
Retest
15. Remediation

The objective of remediation is not simply to make a proof of concept stop working.

The underlying security condition should be addressed.

For example:

Weakness
   ↓
Identify Root Cause
   ↓
Implement Security Control
   ↓
Review Related Components
   ↓
Regression Testing

Where possible, remediation should be implemented at the appropriate architectural or engineering layer rather than relying only on superficial filtering.

16. Retesting

After remediation, repeat the original test.

The retest should verify:

The original vulnerability is no longer exploitable.
The intended application functionality still works.
Related attack paths have been considered.
The security control cannot be trivially bypassed.
Appropriate regression tests have been introduced where practical.
Original Finding
      ↓
Developer Remediation
      ↓
Security Retest
      ↓
Pass / Further Remediation
17. Secure Coding Perspective

Security testing and secure software engineering should reinforce each other.

When analyzing a vulnerability, I aim to understand:

Input
  ↓
Application Logic
  ↓
Security Control
  ↓
Sensitive Operation
  ↓
Output / State Change

This helps identify the condition that created the vulnerability rather than focusing only on the observable symptom.

The same understanding can then be used to improve secure implementation and developer guidance.

18. OWASP Alignment

This methodology is informed by application-security principles represented in the OWASP ecosystem, including:

OWASP Top 10
OWASP Web Security Testing Guide
OWASP API Security guidance
Secure coding principles
Authentication and authorization guidance

The exact testing approach should be adapted to the application's architecture, technology stack and defined scope.

19. Professional Disclosure

Professional security findings may contain confidential information or be subject to contractual restrictions.

Such findings are not publicly disclosed when doing so would violate confidentiality obligations.

Public research may instead demonstrate:

Security methodology
Vulnerability classes
Secure coding principles
Controlled laboratory research
Independently reproducible testing
Anonymized security concepts where appropriate

Confidentiality is part of responsible security practice.

20. Assessment Principles

My approach is guided by several principles:

Understand before testing

Learn how the application is designed and how its workflows operate.

Test security boundaries

Focus on where trust changes between users, applications, APIs and data stores.

Validate impact

Demonstrate meaningful security consequences without unnecessary exploitation.

Find the root cause

Understand why the vulnerability exists.

Recommend practical remediation

Security recommendations should be implementable by engineering teams.

Retest

A finding is not complete until the remediation has been verified.

Assessment Lifecycle
┌─────────────────────────────┐
│     Authorization & Scope   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Reconnaissance        │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│     Attack Surface Map      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Application & API Analysis  │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Authentication & Access     │
│          Control            │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│ Input / Injection / Logic   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│    Impact & Root Cause      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Reporting             │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      Remediation            │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│         Retesting           │
└─────────────────────────────┘
Closing Principle

Good application security is not only about finding vulnerabilities. It is about understanding why they exist, demonstrating their impact, helping engineers fix the underlying condition and verifying that the fix works.

Disclaimer

This methodology is intended for authorized security assessments, controlled laboratories and educational research.

No unauthorized systems should be tested using the techniques described here.
