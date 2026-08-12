
# Mass Assignment & Improper Object Property Authorization

> Technical security research conducted in an authorized laboratory environment.

## Overview

Mass assignment occurs when an application automatically maps client-controlled parameters to internal application objects without sufficiently restricting which properties the client is allowed to modify.

This becomes a security issue when sensitive properties are accepted from the client even though those properties should only be controlled by trusted server-side logic.

Examples of potentially sensitive properties include:

- `role`
- `isAdmin`
- `accountStatus`
- `verified`
- `permissions`
- `creditLimit`
- `userType`

The fundamental security problem is excessive trust in client-controlled object properties.

---

## Vulnerability Classification

| Attribute | Details |
|---|---|
| Vulnerability | Mass Assignment |
| Security Area | API Security |
| Attack Surface | JSON / object-based API endpoints |
| Primary Concern | Unauthorized property modification |
| Testing Environment | Authorized / Controlled Laboratory |

---

## Typical API Flow

A common API pattern looks like:

```text
Client
  ↓
JSON Request
  ↓
API Endpoint
  ↓
Request Binding
  ↓
Application Object
  ↓
Database

For example, a profile update endpoint may accept:

{
  "name": "Test User",
  "email": "user@example.test"
}

The intended behavior may be to allow the user to modify only their profile information.

The security problem appears when the application automatically accepts additional properties that were never intended to be controlled by the client.

Example

Consider an endpoint:

PATCH /api/profile HTTP/1.1
Content-Type: application/json
Authorization: Bearer <TEST_TOKEN>

A legitimate request might contain:

{
  "name": "Updated User"
}

However, an application with insufficient property restrictions might also process:

{
  "name": "Updated User",
  "role": "admin"
}

The important question is not whether the client can send the property.

The important question is:

Does the server allow the client to modify a security-sensitive property that should be controlled by trusted application logic?

Root Cause

A common root cause is automatically binding client-controlled request properties directly to an internal model.

Conceptually:

request.body
     ↓
application object
     ↓
database

without explicitly defining which properties are permitted.

This can unintentionally expose internal fields to the client.

Testing Methodology

Testing should only be performed against systems where explicit authorization has been provided.

A controlled assessment can follow these steps:

Identify API endpoints that create or modify objects.
Determine which properties are normally accepted.
Understand which properties should be controlled by the server.
Submit a normal request.
Introduce an additional non-sensitive property.
Observe whether the application accepts it.
In a controlled environment, test a security-sensitive property.
Determine whether the server ignores, rejects or processes the property.
Verify whether the property's value actually changes.
Assess the resulting security impact.

The assessment should distinguish between:

Property Accepted
        ≠
Property Security Impact

A field being accepted is not automatically a vulnerability.

The field must have meaningful security consequences.

Example Test

A controlled test might begin with:

{
  "name": "Test User"
}

The application may return:

{
  "id": 1001,
  "name": "Test User"
}

A security assessment could then determine how the application handles an additional property:

{
  "name": "Test User",
  "role": "admin"
}

Possible outcomes include:

Secure Behavior
Unknown / restricted property
        ↓
Ignored or rejected
        ↓
Role remains unchanged
Potentially Vulnerable Behavior
Client-controlled property
        ↓
Accepted by object binding
        ↓
Security-sensitive value changed
        ↓
Potential privilege impact
Why Input Validation Alone Is Not Enough

Input validation determines whether data conforms to expected requirements.

Mass assignment requires an additional security decision:

Is this particular requester allowed to modify this particular property?

For example:

name
    ↓
User may modify

email
    ↓
May require additional verification

role
    ↓
Should be controlled by privileged server-side logic

isAdmin
    ↓
Should not be client-controlled

Therefore, secure API design should combine validation with explicit authorization and property-level control.

Secure Implementation

A safer design uses an explicit allowlist of properties that the endpoint is permitted to modify.

Conceptually:

Request
   ↓
Extract permitted fields
   ↓
Validate fields
   ↓
Authorize operation
   ↓
Update object

For example:

Allowed fields:

name
phone
profile_image

rather than:

Accept every property supplied by the client

The server should determine which properties can be modified.

Allowlisting

Allowlisting provides a clear boundary between client-controlled data and security-sensitive application state.

Conceptually:

const allowedFields = [
    "name",
    "phone",
    "profile_image"
];

Only explicitly permitted fields should reach the update operation.

Sensitive properties should be handled through dedicated server-side workflows where appropriate.

For example:

User Profile Update
        ↓
name
phone
profile_image

Administrative Workflow
        ↓
role
permissions
accountStatus

This makes the security boundary easier to reason about.

Secure Coding Principles

Applications should:

Explicitly define writable properties.
Avoid blindly binding request bodies to internal models.
Keep security-sensitive properties outside normal user-controlled update paths.
Apply server-side authorization.
Validate property values.
Use separate request and persistence models where appropriate.
Test unexpected properties during security reviews.
Add regression tests for previously identified issues.
Impact

The impact depends heavily on which properties can be modified.

Potential consequences can include:

Privilege escalation
Unauthorized account changes
Modification of security settings
Bypass of application workflows
Unauthorized access to functionality
Data integrity issues
Abuse of business logic

A field such as nickname being modifiable may be expected.

A field such as role or permissions being modifiable by an ordinary user can have significantly greater security implications.

Verification

After remediation, repeat the original test.

Expected behavior:

Normal Property
      ↓
Allowed
      ↓
Updated Successfully

Security-sensitive property:

Security-Sensitive Property
      ↓
Server-Side Authorization
      ↓
Rejected / Ignored
      ↓
Original Security State Preserved

Verification should confirm not only that the API returns an appropriate response, but that the underlying object remains secure.

Root-Cause Perspective

The most important lesson from mass assignment is that the API should not allow the client to define the application's security state.

The client may request an operation.

The server must decide:

What can be changed?
        ↓
Who can change it?
        ↓
Under what conditions?

These decisions belong to trusted server-side logic.

Security Principle

Clients should control data that the application explicitly allows them to control — not the application's security state.

Explicit property allowlisting creates a stronger security boundary between user-controlled input and internal application state.

Lessons Learned

Mass assignment demonstrates why API security requires more than checking whether incoming JSON is syntactically valid.

A request can contain perfectly valid JSON and still attempt to manipulate properties that the requester should never control.

Effective API security therefore requires:

Input Validation
       +
Property-Level Control
       +
Authorization
       +
Secure Object Handling

The key question is:

Which properties can this requester legitimately change?

References
OWASP API Security guidance
OWASP Mass Assignment guidance
OWASP Authorization guidance
Disclaimer

This write-up is intended for authorized security testing, controlled laboratories and educational purposes.

No unauthorized systems should be tested using the techniques described here.


### Then preview it
