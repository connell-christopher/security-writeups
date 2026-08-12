

# SQL Injection

> Technical security research conducted in an authorized laboratory environment.

## Overview

SQL Injection (SQLi) occurs when untrusted application input is incorporated into a database query in a way that allows the input to influence the query's structure or execution.

The underlying security issue is a failure to maintain a clear separation between:

- Data supplied by the user
- SQL instructions interpreted by the database

SQL injection can affect applications that construct database queries dynamically using untrusted input.

---

## Vulnerability Classification

| Attribute | Details |
|---|---|
| Vulnerability | SQL Injection |
| Security Area | Web Application Security |
| OWASP Category | A03 — Injection |
| Attack Surface | Database-backed application functionality |
| Testing Environment | Authorized / Controlled Laboratory |

---

## Application Data Flow

A typical database-backed application can be represented as:

```text
User Input
    ↓
Web Application
    ↓
Query Construction
    ↓
Database
    ↓
Application Response

The security boundary becomes problematic when user-controlled input is incorporated directly into the SQL statement.

A safer architecture maintains a strict separation between SQL instructions and parameter values.

Example Vulnerable Pattern

A simplified vulnerable query might conceptually resemble:

const query =
    "SELECT * FROM users WHERE username = '" +
    username +
    "'";

Here, the application combines SQL syntax and user-controlled data into a single query string.

This creates an opportunity for specially crafted input to alter the intended query structure.

Parameterized Query

A safer implementation separates the SQL statement from its values.

For example:

const query =
    "SELECT * FROM users WHERE username = ?";

database.execute(query, [username]);

The exact syntax depends on the database driver, but the security principle remains the same:

SQL Structure
      +
Parameter Value
      ↓
Database Driver
      ↓
Database

The supplied value is treated as data rather than being interpreted as part of the SQL statement.

Testing Methodology

SQL injection testing should only be performed against applications where explicit authorization has been provided.

A controlled assessment can follow these steps:

Identify functionality that interacts with a database.
Identify parameters controlled by the user.
Determine how the application processes those parameters.
Establish normal application behavior.
Test whether special input changes the application's behavior.
Determine whether the behavior is consistent with database query manipulation.
Identify the injection context.
Assess the potential impact.
Review the application's query construction and database interaction.
Verify remediation after the issue is addressed.

The goal is not simply to make an application return an error.

The goal is to determine whether untrusted input can influence SQL execution.

Common Injection Contexts

SQL injection can occur in multiple parts of an application's database interaction.

Examples include:

Search functionality
Login functionality
Product filtering
Record lookup
Sorting / filtering parameters
API request parameters
Administrative interfaces
Reporting functionality

The presence of a database-backed parameter does not automatically mean SQL injection exists.

The application's actual query construction must be evaluated.

Error-Based Behavior

Some applications expose database errors when unexpected input reaches the database layer.

These errors may reveal information such as:

Database technology
Query structure
Table or column names
Application framework details
Database error messages

However, an error alone does not prove SQL injection.

It should be treated as an observation that warrants further controlled investigation.

Boolean-Based Behavior

Another testing approach is to determine whether logically different inputs produce distinguishable application behavior.

Conceptually:

Condition A
    ↓
Application Response A

Condition B
    ↓
Application Response B

Consistent differences may indicate that user-controlled input is influencing the underlying database query.

Testing should remain controlled and should avoid unnecessary data access.

Time-Based Behavior

Some database systems allow conditions that influence response timing.

A controlled assessment can sometimes use response timing as an inference mechanism when the application does not expose database errors or meaningful response differences.

Because timing-based techniques can place additional load on a database, they should be used conservatively and only within authorized testing boundaries.

Root Cause

The fundamental root cause is unsafe separation between application data and database instructions.

A vulnerable design may effectively follow:

User Input
    ↓
String Concatenation
    ↓
SQL Query
    ↓
Database

A safer design is:

SQL Statement
      +
Parameters
      ↓
Database Driver
      ↓
Database

This distinction is central to preventing SQL injection.

Secure Coding
Use Parameterized Queries

Prefer parameterized queries or prepared statements whenever supported by the database technology and driver.

Conceptually:

const query = `
    SELECT id, username
    FROM users
    WHERE username = ?
`;

database.execute(query, [username]);

The application controls the SQL structure while the user supplies only a parameter value.

Input Validation

Input validation remains useful as a secondary control.

For example, if an identifier is expected to be numeric, the application should validate that it conforms to the expected format.

However:

Input validation should not replace parameterized database queries.

A robust defense uses the appropriate control for the database interaction rather than relying on filtering potentially dangerous characters.

Least Privilege

Database accounts used by applications should have only the permissions required for the application's legitimate operations.

For example:

Application
    ↓
Database User
    ↓
Only required permissions

An application that only needs to read and update particular records should not necessarily have unrestricted administrative database privileges.

Least privilege can reduce the impact of a successful database-layer compromise.

Defense in Depth

A strong SQL injection defense can include:

Parameterized Queries
        +
Input Validation
        +
Least-Privilege Database Accounts
        +
Secure Error Handling
        +
Security Testing
        +
Monitoring

No single control should be treated as the entire security strategy.

Impact

The impact of SQL injection depends on:

The affected query
Database permissions
Data accessible to the application
Application functionality
Database configuration
Available database features

Potential consequences can include:

Unauthorized data access
Modification of application data
Deletion of records
Authentication bypass in vulnerable implementations
Exposure of sensitive information
Manipulation of application behavior
Potential compromise of connected systems in certain environments

Impact should always be demonstrated within the limits of the authorized testing environment.

Verification

After remediation, the original test cases should be repeated.

The expected security property is:

User Input
    ↓
Application
    ↓
Parameterized Query
    ↓
Database
    ↓
Input treated as DATA

The application should continue functioning normally while input that previously influenced query structure is handled as ordinary data.

Secure Design Review

When reviewing a database-backed application, useful questions include:

Input
Which parameters reach database queries?
Are those parameters controlled by users?
Are they validated according to their expected type?
Query Construction
Are SQL statements constructed through string concatenation?
Are prepared statements used?
Are parameterized queries consistently applied?
Database
Which database account does the application use?
Does it follow least privilege?
Are sensitive database errors exposed to users?
Verification
Are SQL injection tests included in security testing?
Are fixes covered by regression tests?
Are database interactions reviewed during code review?
Lessons Learned

SQL injection is fundamentally a trust-boundary problem.

The application should never allow untrusted input to become part of the SQL instruction itself.

The central security principle is:

SQL = Application-Controlled Structure

Input = Untrusted Data

Keeping these two elements separate is the foundation of SQL injection prevention.

Security Principle

Never allow untrusted input to define the structure of a database query.

Use parameterized queries or prepared statements to maintain a clear boundary between SQL instructions and user-controlled values.

OWASP Alignment

This research maps to:

OWASP Top 10 — A03: Injection

It also relates to broader secure-coding principles involving:

Input handling
Database security
Least privilege
Secure error handling
Defense in depth
References
OWASP SQL Injection Prevention Cheat Sheet
OWASP Top 10 — Injection
OWASP Web Security Testing Guide
OWASP Secure Coding Practices
Disclaimer

This write-up is intended for authorized security testing, controlled laboratories and educational purposes.

No unauthorized systems should be tested using the techniques described here.
