### Change Password (while Logged In)

```sh
curl -X POST http://localhost:3001/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"currentPassword": "password123", "newPassword": "newpassword456"}'
```

### Update Profile (student)

```sh
curl -X PATCH http://localhost:3001/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "John Updated", "campus": "Universitas Udayana", "studyProgram": "Teknik Informatika", "education": "S1"}'
```

### Get Student Profile

```sh
curl -X GET http://localhost:3001/api/student/profile \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "name": "Ahmad Fauzi",
  "nim": "10115001",
  "email": "ahmad.fauzi@sibita.com",
  "education": "S1",
  "phoneNumber": "081234567890",
  "studyProgram": "Teknik Informatika",
  "campus": "Universitas Negeri",
  "advisor": {
    "name": "Dr. Ir. Budi Santoso, M.T.",
    "email": "budi.santoso@sibita.com"
  },
  "status": "active"
}