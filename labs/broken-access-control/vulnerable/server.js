const express = require("express");

const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    username: "alice",
    email: "alice@example.test",
    role: "user"
  },
  {
    id: 2,
    username: "bob",
    email: "bob@example.test",
    role: "user"
  }
];

/*
 * LAB ONLY
 *
 * This endpoint intentionally contains a BOLA /
 * broken object-level authorization vulnerability.
 *
 * Authentication is simulated using the X-User-ID header.
 */

app.get("/api/users/:id", (req, res) => {
  const requestedUserId = Number(req.params.id);

  const user = users.find(
    (user) => user.id === requestedUserId
  );

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  // VULNERABILITY:
  // The application retrieves the requested object
  // without verifying that the authenticated user
  // is authorized to access it.

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Vulnerable API running on http://localhost:${PORT}`);
});
