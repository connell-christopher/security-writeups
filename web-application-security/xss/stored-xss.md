# Stored Cross-Site Scripting (XSS)

> Technical security research conducted in an authorized laboratory environment.

## Overview

Stored Cross-Site Scripting occurs when an application stores attacker-controlled input and later renders that input in a user's browser without applying appropriate output encoding or sanitization.

Unlike reflected XSS, the malicious input is persisted by the application before it is delivered to another user.

---

## Vulnerability Classification

| Attribute | Details |
|---|---|
| Vulnerability | Stored Cross-Site Scripting |
| Category | Injection |
| OWASP | A03 — Injection |
| Attack Type | Client-Side Code Execution |
| Testing Environment | Authorized / Controlled Laboratory |

---

## Attack Surface

A typical stored XSS flow can be represented as:

```text
Attacker-Controlled Input
          ↓
      Application
          ↓
        Storage
          ↓
     Application
          ↓
      HTML Response
          ↓
      Victim Browser

The security issue occurs when untrusted data is inserted into an executable browser context without appropriate protection.

Root Cause

The underlying problem is a failure to correctly handle untrusted input at the point where it is rendered.

An application may safely store user input as data, but security can fail when that data is subsequently inserted into an HTML, JavaScript, URL or other browser-interpreted context.

The appropriate defense depends on the output context.

Testing Methodology

The assessment follows a controlled process:

Identify fields accepting user-controlled input.
Determine whether submitted data is persisted.
Identify where the stored value is subsequently rendered.
Determine the rendering context.
Test whether the application treats the value as data or executable content.
Confirm behavior within the authorized laboratory.
Evaluate the potential impact.
Identify the appropriate remediation.
Proof of Concept

Testing should only be performed against an application where explicit authorization has been provided.

A controlled test can use a harmless XSS proof-of-concept such as:

<script>alert(document.domain)</script>

If the application stores the value and subsequently renders it as executable HTML/JavaScript, the behavior demonstrates the vulnerability.

No testing should be performed against systems without authorization.

Impact

The impact of stored XSS depends on the affected application, user privileges and execution context.

Potential consequences can include:

Execution of attacker-controlled JavaScript
Actions performed within a victim's authenticated browser context
Manipulation of application content
Phishing or interface manipulation
Exposure of information accessible to the affected browser context
Compromise of privileged application interfaces

The actual impact should be determined from the application's security context rather than assumed from the vulnerability class alone.

Secure Coding Considerations

A secure implementation should treat user-controlled data as untrusted throughout its lifecycle.

Important controls include:

Context-Aware Output Encoding

Encode data according to the context in which it is rendered.

For example:

HTML context
JavaScript context
URL context
CSS context

Each context requires appropriate handling.

Input Validation

Where appropriate, applications should enforce expected input formats and reject values that do not conform to the application's requirements.

Input validation should not be treated as the sole defense against XSS.

Safe DOM APIs

Client-side JavaScript should avoid unsafe HTML insertion patterns when processing untrusted data.

Prefer APIs that treat values as text rather than executable markup when HTML is not required.

Remediation

Recommended controls include:

Apply context-appropriate output encoding.
Avoid inserting untrusted data into executable browser contexts.
Use safe DOM APIs where possible.
Validate input according to expected business requirements.
Implement an appropriate Content Security Policy as an additional defense layer.
Review stored user-controlled data wherever it is subsequently rendered.
Add regression tests for previously identified injection points.
Verification

After remediation, the original test case should be repeated.

The expected secure behavior is that attacker-controlled input is rendered as inert data rather than being interpreted as executable JavaScript.

Security verification should include:

Original Test
     ↓
Fix Implemented
     ↓
Retest
     ↓
Payload Treated as Data
     ↓
Vulnerability Resolved
Security Principle

Untrusted data should remain data throughout the application lifecycle.

Security controls should be implemented according to the context in which data is ultimately consumed.

References
OWASP Cross Site Scripting Prevention Cheat Sheet
OWASP Top 10 — Injection
OWASP Web Security Testing Guide
Disclaimer

This write-up is intended for authorized security testing, controlled laboratories and educational purposes.

No unauthorized systems should be tested using the techniques described here.


---

