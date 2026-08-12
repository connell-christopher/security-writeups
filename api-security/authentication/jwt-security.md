
# JWT Security & Token Validation

> Technical security research conducted in an authorized laboratory environment.

## Overview

JSON Web Tokens (JWTs) are commonly used by modern applications and APIs to represent authenticated sessions and transmit claims between parties.

JWT itself is not an authentication system. Its security depends on how the application:

- Creates tokens
- Signs tokens
- Validates signatures
- Processes claims
- Manages expiration
- Handles token storage
- Uses token-derived identity and authorization information

A JWT can therefore be correctly structured while the application's implementation around it remains insecure.

---

## Vulnerability Classification

| Attribute | Details |
|---|---|
| Technology | JSON Web Token (JWT) |
| Security Area | Authentication / Authorization |
| Attack Surface | API authentication |
| Primary Concern | Token validation and trust decisions |
| Testing Environment | Authorized / Controlled Laboratory |

---

## JWT Structure

A typical JWT consists of three Base64URL-encoded components:

```text
HEADER.PAYLOAD.SIGNATURE

For example:

eyJhbGciOiJIUzI1NiJ9
.
eyJzdWIiOiIxMjMiLCJleHAiOjE3MDAwMDAwMDB9
.
<signature>

The three components represent:

Header
  ↓
Signing algorithm and token metadata

Payload
  ↓
Claims

Signature
  ↓
Integrity / authenticity verification

The payload should not be treated as confidential merely because it is encoded.

Security Boundary

A secure API should treat a JWT as untrusted input until it has been properly validated.

A simplified validation process is:

Incoming Request
       ↓
Extract Token
       ↓
Validate Structure
       ↓
Validate Signature
       ↓
Validate Algorithm
       ↓
Validate Required Claims
       ↓
Validate Expiration
       ↓
Establish Authenticated Identity
       ↓
Apply Authorization
       ↓
Allow / Deny Request

Authentication and authorization remain separate decisions.

Testing Methodology

JWT security testing should only be performed against systems where explicit authorization has been provided.

A controlled assessment can examine:

How tokens are issued.
Which claims are included.
How signatures are generated.
Which algorithms the server accepts.
Whether signatures are actually verified.
Whether token expiration is enforced.
Whether required claims are validated.
Whether token-derived identity is trusted appropriately.
How invalid or modified tokens are handled.
Whether authorization is independently enforced after authentication.

The objective is to determine whether the server's JWT validation process matches its intended security model.

Signature Validation

The signature provides integrity protection for signed JWTs.

Conceptually:

JWT
 ↓
Signature Verification
 ↓
Valid?
 ├── NO  → Reject
 │
 └── YES
       ↓
   Continue validation

A server should never treat the claims in a token as trustworthy merely because the token is syntactically valid.

Algorithm Handling

Applications should explicitly define which signing algorithms are supported.

The server should not blindly trust an attacker-controlled algorithm declaration in the JWT header.

For example, the token header may contain:

{
  "alg": "HS256",
  "typ": "JWT"
}

The server should have a defined cryptographic policy specifying which algorithms are acceptable for that particular token type.

Algorithm selection should therefore be controlled by application configuration and validation logic rather than blindly accepted from untrusted input.

Claim Validation

A valid signature does not automatically mean that every claim is valid.

Depending on the application's requirements, important claims may include:

{
  "iss": "https://issuer.example",
  "sub": "user-123",
  "aud": "api.example",
  "exp": 1700000000,
  "iat": 1699996400
}

Applications should validate claims that are security-relevant to their trust model.

Issuer

The iss claim can identify the expected token issuer.

Audience

The aud claim can restrict which service or API the token is intended for.

Expiration

The exp claim can define when a token should no longer be accepted.

Subject

The sub claim commonly identifies the token subject, but the application must still determine what that identity is authorized to do.

Expiration Handling

A token that has passed its intended lifetime should not continue to provide access simply because its signature remains valid.

Conceptually:

Token Received
      ↓
Signature Valid
      ↓
Expiration Valid?
      ├── NO → Reject
      │
      └── YES
            ↓
        Continue

Applications should also consider clock-skew handling and appropriate token lifetimes.

Authentication vs Authorization

JWT validation establishes whether the application can trust the authenticated identity represented by the token.

It does not automatically establish permission to perform every action.

For example:

JWT
 ↓
Authenticated User = User A
 ↓
Authorization Check
 ↓
Can User A access Object B?
 ↓
YES / NO

This is closely related to the BOLA problem documented elsewhere in this repository.

Common Security Weaknesses

JWT implementations can become vulnerable when applications:

Fail to verify signatures
Accept unintended algorithms
Use weak signing secrets
Fail to validate expiration
Fail to validate issuer or audience where required
Trust security-sensitive claims without appropriate validation
Treat encoded claims as confidential
Store tokens insecurely
Use unnecessarily long-lived tokens
Confuse authentication with authorization

The existence of a JWT does not by itself guarantee that the surrounding authentication system is secure.

Secure Implementation Principles

A secure implementation should:

Explicitly define supported algorithms.
Verify token signatures.
Protect signing keys appropriately.
Validate security-relevant claims.
Enforce token expiration.
Use appropriate token lifetimes.
Protect tokens from unnecessary exposure.
Separate authentication from authorization.
Reject malformed or invalid tokens.
Log security-relevant authentication failures appropriately.
Conceptual Secure Flow
                 JWT
                  ↓
          Parse / Validate
                  ↓
        Verify Signature
                  ↓
       Validate Algorithm
                  ↓
        Validate Claims
                  ↓
       Validate Expiration
                  ↓
      Establish Identity
                  ↓
      Authorization Check
                  ↓
          ┌───────┴───────┐
          ↓               ↓
        ALLOW            DENY
Verification

After implementing or modifying JWT security controls, testing should verify both valid and invalid cases.

Valid Token
Valid signature
+
Valid claims
+
Valid lifetime
+
Expected issuer/audience
        ↓
      ALLOW
Invalid Token
Invalid signature
OR
Invalid claims
OR
Expired token
OR
Unsupported algorithm
        ↓
      DENY

Testing should also verify that authorization controls remain effective after successful authentication.

Root Cause Analysis

When a JWT security weakness is identified, the investigation should go beyond the token itself.

Questions should include:

Where is the token created?
Where is it validated?
Which component controls the accepted algorithms?
Which claims are trusted?
Where is the authenticated identity established?
Where is authorization enforced?
How are keys managed?
How are expired tokens handled?
What happens when validation fails?

Understanding the complete trust flow is often more valuable than focusing on a single malformed token.

Security Principle

A token should never become trusted merely because it looks valid.

Security-sensitive claims must be cryptographically and logically validated according to the application's intended trust model.

Lessons Learned

JWT security is primarily an implementation and trust-boundary problem.

A secure JWT deployment requires more than generating signed tokens. The application must correctly validate the token, enforce its lifetime, establish the intended identity and then independently enforce authorization.

The important security question is:

What exactly does the application trust, and what evidence does it require before granting access?

References
OWASP JSON Web Token Cheat Sheet
OWASP API Security guidance
RFC 7519 — JSON Web Token (JWT)
RFC 8725 — JSON Web Token Best Current Practices
Disclaimer

This write-up is intended for authorized security testing, controlled laboratories and educational purposes.

No unauthorized systems should be tested using the techniques described here.
