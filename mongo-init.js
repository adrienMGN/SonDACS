// MongoDB initialization script to create user with proper permissions

// Read credentials from files (Docker secrets)
const username = cat('/run/secrets/mongo_user').trim();
const password = cat('/run/secrets/mongo_user_password').trim();

// Switch to the sondacs database
db = db.getSiblingDB('sondacs');

// Create user with read/write permissions on sondacs database
db.createUser({
  user: username,
  pwd: password,
  roles: [
    {
      role: "readWrite",
      db: "sondacs"
    }
  ]
});

console.log(`✅ User '${username}' created successfully for database 'sondacs'`);