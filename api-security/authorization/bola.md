# Broken Object Level Authorization (BOLA)

> Technical security research conducted in an authorized laboratory environment.

## Overview

Broken Object Level Authorization (BOLA) occurs when an API fails to properly verify whether an authenticated user is authorized to access a specific object.

The API may correctly authenticate the requester while failing to verify whether that requester should be allowed to access the particular resource identified by the request.

This makes BOLA fundamentally an **authorization problem**, not an authentication problem.

---

## Vulnerability Classification

| Attribute | Details |
|---|---|
| Vulnerability | Broken Object Level Authorization |
| Category | Authorization |
| OWASP API Security | API authorization |
| Attack Type | Unauthorized object access |
| Testing Environment | Authorized / Controlled Laboratory |

---

## The Security Boundary

A secure API should evaluate two separate questions:

```text
Authentication
      ↓
"Who is the requester?"
      ↓
Authorization
      ↓
"Is this requester allowed to access this object?"

A valid session or token does not automatically grant access to every object exposed by an API.

Example API

Consider an authenticated API endpoint:

GET /api/orders/1001 HTTP/1.1
Host: example.test
Authorization: Bearer <REDACTED>
Accept: application/json

The API identifies the requester using the supplied authentication token.

The critical authorization decision is then:

Requester
    ↓
Authenticated?
    ↓
YES
    ↓
Requested object: Order 1001
    ↓
Does this requester have permission to access Order 1001?
    ↓
YES / NO
Vulnerable Behavior

A vulnerable implementation may rely only on authentication:

Request
  ↓
Validate token
  ↓
Token is valid
  ↓
Retrieve requested object
  ↓
Return object

For example:

GET /api/orders/1002
Authorization: Bearer <USER_A_TOKEN>

If 1002 belongs to another user but the API still returns the object, the authorization boundary has failed.

Testing Methodology

Testing should only be performed against systems where explicit authorization has been provided.

A controlled assessment can follow these steps:

Authenticate as a test user.
Identify API endpoints that reference object identifiers.
Record objects legitimately accessible to the test account.
Identify another test object within the authorized laboratory.
Modify the object identifier in the request.
Send the request using the original authenticated session.
Compare the response with the expected authorization behavior.
Determine whether the API enforces object-level authorization.

The important observation is not simply whether an identifier can be changed.

The important question is:

Does the server independently verify that the authenticated requester is authorized to access the requested object?

Example Request

A controlled test might involve:

GET /api/users/1001/profile
Authorization: Bearer <TEST_USER_A_TOKEN>

followed by:

GET /api/users/1002/profile
Authorization: Bearer <TEST_USER_A_TOKEN>

If User A receives User B's protected information in a controlled environment, the application may have an object-level authorization weakness.

Example Response

A vulnerable API might return:

{
  "id": 1002,
  "name": "Test User B",
  "email": "user-b@example.test"
}

when the authenticated requester should not have access to that object.

The response demonstrates that authentication succeeded but authorization was insufficient.

Root Cause

A common root cause is performing authentication without performing an appropriate authorization check against the requested object.

Conceptually, vulnerable server-side logic may resemble:

authenticate(requester)

object = database.get(request.object_id)

return object

The missing security decision is:

authorize(requester, object)

A secure implementation should establish whether the requester is permitted to access the specific object before returning it.

Secure Authorization Model

A safer flow is:

Request
   ↓
Authenticate requester
   ↓
Identify requested object
   ↓
Evaluate authorization
   ↓
Is requester permitted?
   ├── NO → Deny request
   │
   └── YES
         ↓
     Retrieve / return object

Authorization should be enforced server-side.

The client should never be trusted to decide which objects a user is allowed to access.

Secure Coding Considerations

Authorization decisions should be based on server-side security context.

Depending on the application's architecture, authorization can be enforced through:

Ownership checks
Role-based authorization
Attribute-based authorization
Relationship-based authorization
Policy-based authorization
Database-level access controls

The correct model depends on the application's requirements.

Example Secure Logic

Conceptually:

requester = authenticate(request)

object = find_object(request.object_id)

if not authorized(requester, object):
    return 403

return object

The important security property is that the authorization decision is made independently of user-controlled identifiers.

Impact

The impact of BOLA depends on the type of objects exposed and the operations available.

Potential consequences include:

Unauthorized access to personal information
Exposure of sensitive business data
Unauthorized modification of objects
Unauthorized deletion
Access to other users' resources
Privacy violations
Data integrity issues

The severity should be assessed according to the actual data and functionality affected.

Verification

After implementing the authorization control, repeat the original test.

Expected behavior:

Authenticated User
        ↓
Requests Own Object
        ↓
Authorization Check
        ↓
ALLOWED
        ↓
Object Returned

And:

Authenticated User
        ↓
Requests Unauthorized Object
        ↓
Authorization Check
        ↓
DENIED
        ↓
Appropriate Error Response

The important part is that the server makes the authorization decision.

Security Principle

Authentication establishes identity. Authorization establishes permission.

A valid authentication token should never be treated as proof that the requester is authorized to access every object exposed by an API.

Lessons Learned

BOLA demonstrates why API security cannot be reduced to authentication alone.

When reviewing an API, object-level authorization should be evaluated wherever user-controlled or externally supplied identifiers determine which resources are accessed.

The security question should always be:

Who is requesting this object, and why are they allowed to access it?

References
OWASP API Security guidance
OWASP Authorization guidance
OWASP Web Security Testing Guide
Disclaimer

This write-up is intended for authorized security testing, controlled laboratories and educational purposes.

No unauthorized systems should be tested using the techniques described here.


---

## 4.3 Preview before committing

Click **Preview**.
# Broken Object Level Authorization (BOLA)

> Technical security research conducted in an authorized laboratory environment.

## Overview

Broken Object Level Authorization (BOLA) occurs when an API fails to properly verify whether an authenticated user is authorized to access a specific object.

The API may correctly authenticate the requester while failing to verify whether that requester should be allowed to access the particular resource identified by the request.

This makes BOLA fundamentally an **authorization problem**, not an authentication problem.

---

## Vulnerability Classification

| Attribute | Details |
|---|---|
| Vulnerability | Broken Object Level Authorization |
| Category | Authorization |
| OWASP API Security | API authorization |
| Attack Type | Unauthorized object access |
| Testing Environment | Authorized / Controlled Laboratory |

---

## The Security Boundary

A secure API should evaluate two separate questions:

```text
Authentication
      ↓
"Who is the requester?"
      ↓
Authorization
      ↓
"Is this requester allowed to access this object?"

A valid session or token does not automatically grant access to every object exposed by an API.

Example API

Consider an authenticated API endpoint:

GET /api/orders/1001 HTTP/1.1
Host: example.test
Authorization: Bearer <REDACTED>
Accept: application/json

The API identifies the requester using the supplied authentication token.

The critical authorization decision is then:

Requester
    ↓
Authenticated?
    ↓
YES
    ↓
Requested object: Order 1001
    ↓
Does this requester have permission to access Order 1001?
    ↓
YES / NO
Vulnerable Behavior

A vulnerable implementation may rely only on authentication:

Request
  ↓
Validate token
  ↓
Token is valid
  ↓
Retrieve requested object
  ↓
Return object

For example:

GET /api/orders/1002
Authorization: Bearer <USER_A_TOKEN>

If 1002 belongs to another user but the API still returns the object, the authorization boundary has failed.

Testing Methodology

Testing should only be performed against systems where explicit authorization has been provided.

A controlled assessment can follow these steps:

Authenticate as a test user.
Identify API endpoints that reference object identifiers.
Record objects legitimately accessible to the test account.
Identify another test object within the authorized laboratory.
Modify the object identifier in the request.
Send the request using the original authenticated session.
Compare the response with the expected authorization behavior.
Determine whether the API enforces object-level authorization.

The important observation is not simply whether an identifier can be changed.

The important question is:

Does the server independently verify that the authenticated requester is authorized to access the requested object?

Example Request

A controlled test might involve:

GET /api/users/1001/profile
Authorization: Bearer <TEST_USER_A_TOKEN>

followed by:

GET /api/users/1002/profile
Authorization: Bearer <TEST_USER_A_TOKEN>

If User A receives User B's protected information in a controlled environment, the application may have an object-level authorization weakness.

Example Response

A vulnerable API might return:

{
  "id": 1002,
  "name": "Test User B",
  "email": "user-b@example.test"
}

when the authenticated requester should not have access to that object.

The response demonstrates that authentication succeeded but authorization was insufficient.

Root Cause

A common root cause is performing authentication without performing an appropriate authorization check against the requested object.

Conceptually, vulnerable server-side logic may resemble:

authenticate(requester)

object = database.get(request.object_id)

return object

The missing security decision is:

authorize(requester, object)

A secure implementation should establish whether the requester is permitted to access the specific object before returning it.

Secure Authorization Model

A safer flow is:

Request
   ↓
Authenticate requester
   ↓
Identify requested object
   ↓
Evaluate authorization
   ↓
Is requester permitted?
   ├── NO → Deny request
   │
   └── YES
         ↓
     Retrieve / return object

Authorization should be enforced server-side.

The client should never be trusted to decide which objects a user is allowed to access.

Secure Coding Considerations

Authorization decisions should be based on server-side security context.

Depending on the application's architecture, authorization can be enforced through:

Ownership checks
Role-based authorization
Attribute-based authorization
Relationship-based authorization
Policy-based authorization
Database-level access controls

The correct model depends on the application's requirements.

Example Secure Logic

Conceptually:

requester = authenticate(request)

object = find_object(request.object_id)

if not authorized(requester, object):
    return 403

return object

The important security property is that the authorization decision is made independently of user-controlled identifiers.

Impact

The impact of BOLA depends on the type of objects exposed and the operations available.

Potential consequences include:

Unauthorized access to personal information
Exposure of sensitive business data
Unauthorized modification of objects
Unauthorized deletion
Access to other users' resources
Privacy violations
Data integrity issues

The severity should be assessed according to the actual data and functionality affected.

Verification

After implementing the authorization control, repeat the original test.

Expected behavior:

Authenticated User
        ↓
Requests Own Object
        ↓
Authorization Check
        ↓
ALLOWED
        ↓
Object Returned

And:

Authenticated User
        ↓
Requests Unauthorized Object
        ↓
Authorization Check
        ↓
DENIED
        ↓
Appropriate Error Response

The important part is that the server makes the authorization decision.

Security Principle

Authentication establishes identity. Authorization establishes permission.

A valid authentication token should never be treated as proof that the requester is authorized to access every object exposed by an API.

Lessons Learned

BOLA demonstrates why API security cannot be reduced to authentication alone.

When reviewing an API, object-level authorization should be evaluated wherever user-controlled or externally supplied identifiers determine which resources are accessed.

The security question should always be:

Who is requesting this object, and why are they allowed to access it?

References
OWASP API Security guidance
OWASP Authorization guidance
OWASP Web Security Testing Guide
Disclaimer

This write-up is intended for authorized security testing, controlled laboratories and educational purposes.

No unauthorized systems should be tested using the techniques described here.


---

