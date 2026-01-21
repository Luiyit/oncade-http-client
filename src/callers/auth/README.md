# Auth API Callers

Test scripts for all Oncade Auth API endpoints. Each script can be run independently to test the auth functionality.

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Required for all auth operations
ONCADE_SDK_API_KEY=your-sdk-api-key
ONCADE_SERVER_API_KEY=your-server-api-key
ONCADE_GAME_ID=your-game-id

# User authentication
ONCADE_USER_EMAIL=user@example.com
ONCADE_USER_SESSION_KEY=session-key-from-initiate
ONCADE_USER_REF=your-user-reference
```

## Available Scripts

### 1. Initiate Account Link
Initiates a new account link for a user.

```bash
npx tsx src/callers/auth/initiateAccountLink.ts
```

**Environment Variables:**
- `ONCADE_USER_EMAIL` - User's email address (required)
- `ONCADE_USER_SESSION_KEY` - Optional existing session key

**Returns:**
- Success status
- Session key for link approval/decline
- Optional redirect URL

---

### 2. Get Link Status
Retrieves the current status of an account link.

```bash
npx tsx src/callers/auth/getLinkStatus.ts
```

**Environment Variables:**
- `ONCADE_USER_SESSION_KEY` - Session key from initiateAccountLink (required)

**Returns:**
- Link status
- User information if linked (ID, email, game ID, linked timestamp)

---

### 3. Approve Link
Approves a pending account link.

```bash
npx tsx src/callers/auth/approveLink.ts
```

**Environment Variables:**
- `ONCADE_USER_SESSION_KEY` - Session key from initiateAccountLink (required)

**Returns:**
- Success status
- User information (ID, email, game ID, linked timestamp)

---

### 4. Decline Link
Declines a pending account link.

```bash
npx tsx src/callers/auth/declineLink.ts
```

**Environment Variables:**
- `ONCADE_USER_SESSION_KEY` - Session key from initiateAccountLink (required)

**Returns:**
- Success status

---

### 5. Remove Link
Removes an existing account link.

```bash
npx tsx src/callers/auth/removeLink.ts
```

**Environment Variables:**
- `ONCADE_USER_REF` - User reference to remove (required)

**Returns:**
- Success status

---

## Typical Workflow

1. **Initiate a link:**
   ```bash
   npx tsx src/callers/auth/initiateAccountLink.ts
   ```
   Copy the session key from the output.

2. **Check link status:**
   ```bash
   export ONCADE_USER_SESSION_KEY="session-key-from-step-1"
   npx tsx src/callers/auth/getLinkStatus.ts
   ```

3. **Approve or decline:**
   ```bash
   # To approve:
   npx tsx src/callers/auth/approveLink.ts
   
   # Or to decline:
   npx tsx src/callers/auth/declineLink.ts
   ```

4. **Remove link (if needed):**
   ```bash
   export ONCADE_USER_REF="your-user-ref"
   npx tsx src/callers/auth/removeLink.ts
   ```

## Error Handling

All scripts include comprehensive error handling:
- Input validation
- API error messages
- Response status codes
- Detailed error data in development

## Notes

- All POST operations use automatic idempotency keys for safe retries
- Session keys are temporary and expire after a certain period
- Email addresses must be valid format
- The initiate endpoint can optionally accept an existing session key for re-attempts
