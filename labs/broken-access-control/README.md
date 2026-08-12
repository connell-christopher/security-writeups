# Broken Access Control / BOLA Lab

A controlled security laboratory demonstrating **Broken Object Level Authorization (BOLA)** in a REST API and the corresponding secure implementation.

---

## Objective

This lab demonstrates how an application can authenticate a user correctly while still failing to verify whether that user is authorized to access a specific object.

The exercise compares:

- An intentionally vulnerable implementation
- A secure implementation
- The authorization control required to prevent unauthorized object access

---

## Vulnerability

### Broken Object Level Authorization

BOLA occurs when an application exposes an object through an API but fails to properly verify whether the requesting user is authorized to access that object.

A simplified vulnerable flow looks like:

```text
Authenticated User
        ↓
Request Object
        ↓
Object Exists?
        ↓
Return Object

The missing security decision is:

Is this user authorized to access this object?
Lab Scenario

The API contains two test users:

User 1 → Alice
User 2 → Bob

A user is simulated as authenticated through:

X-User-ID: 1

The application exposes:

GET /api/users/{id}

The vulnerable implementation retrieves the requested object without enforcing ownership or object-level authorization.

Vulnerable Implementation

Location:

vulnerable/server.js

The vulnerable flow is:

Request
   ↓
Read object ID
   ↓
Find object
   ↓
Return object

The application verifies that the requested object exists, but does not verify that the authenticated user is permitted to access it.

Security Impact

If this condition exists in a real application, an attacker may potentially access objects belonging to other users.

Depending on the affected resource, this could expose:

Personal information
Account information
Orders
Documents
API resources
Internal records
Other user-controlled data

The actual impact depends on the sensitivity of the affected object and the application's authorization model.

Root Cause

The underlying issue is an authorization failure.

The application performs object retrieval without coupling the requested object to the authorization context of the authenticated user.

Conceptually:

Object lookup
     +
Authentication
     ≠
Authorization

Authentication answers:

Who is the user?

Authorization answers:

What is that user allowed to access?

The vulnerable implementation does not adequately enforce the second question.

Secure Implementation

Location:

secure/server.js

The secure implementation introduces an explicit authorization decision:

Request
   ↓
Authenticate User
   ↓
Identify Requested Object
   ↓
Verify Authorization
   ↓
Allow / Deny

The implementation denies access when the authenticated user does not own the requested object.

Expected behavior:

Alice → /api/users/1
        ↓
      200 OK

Alice → /api/users/2
        ↓
   403 Forbidden
Remediation

BOLA should be addressed through server-side authorization controls.

Recommended practices include:

Enforce authorization on every object-level request
Never rely on client-side access controls
Associate resources with an authorization context
Verify resource ownership or permitted roles
Apply authorization consistently across API endpoints
Avoid assuming that authentication implies authorization
Test authorization boundaries during development and security testing
Verification

The security control should be verified by testing both authorized and unauthorized access.

Authorized access
Authenticated user
        ↓
Own resource
        ↓
Expected: 200 OK
Unauthorized access
Authenticated user
        ↓
Another user's resource
        ↓
Expected: 403 Forbidden

Retesting should confirm that the authorization control remains effective across equivalent endpoints and related object types.

Technology
Node.js
Express
REST API
JSON
HTTP
JavaScript
Repository Structure
broken-access-control/
│
├── README.md
│
├── vulnerable/
│   ├── server.js
│   └── package.json
│
└── secure/
    ├── server.js
    └── package.json
Security Classification

Category: Broken Access Control

API Security Classification: Broken Object Level Authorization (BOLA)

OWASP Alignment: Access Control / API Authorization

Ethics & Scope

This laboratory is intentionally vulnerable and designed exclusively for:

Local testing
Controlled security research
Educational purposes
Secure-coding demonstrations

No third-party systems or real user data are involved.

Key Takeaway

A secure API must not only determine who the requester is.

It must also determine whether that requester is authorized to access the specific object being requested.

Authentication
      ↓
Who are you?

Authorization
      ↓
What are you allowed to access?

BOLA occurs when the first question is answered but the second is improperly enforced.
