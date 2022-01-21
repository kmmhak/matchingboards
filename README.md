# Matching boards

An application to connect board game owners and those who wish to play, based on user preferences.
Users can create and join sessions for specific games, and they can search for sessions based
on distance.

## ENDPOINTS

### User

| Resource    | Endpoint                  | Method | Description                |
|-------------|---------------------------|--------|----------------------------|
| User        | /users                    | GET    | Get all users              |
| User        | /users                    | POST   | Add a new user             |
| User        | /users/{id}               | GET    | Get user                   |
| User        | /users/{id}               | DELETE | Delete user                |
| UserGame    | /users/{id}/games         | GET    | Get all user games         |
| UserGame    | /users/{id}/games         | POST   | Add a new game for user    |
| UserGame    | /users/{id}/games/{id}    | GET    | Get a users game           |
| UserGame    | /users/{id}/games/{id}    | DELETE | Delete a users game        |
| UserSession | /users/{id}/sessions      | GET    | Get all users sessions     |
| UserSession | /users/{id}/sessions      | POST   | Add a new session for user |
| UserSession | /users/{id}/sessions/{id} | POST   | Get a users session        |
| UserSession | /users/{id}/sessions/{id} | DELETE | Delete a session from user |
| UserMessage | /users/{id}/messages      | GET    | Get all users messages     |
| UserMessage | /users/{id}/messages      | POST   | Add a new message for user |
| UserMessage | /users/{id}/messages/{id} | GET    | Get a users message        |
| UserMessage | /users/{id}/messages/{id} | DELETE | Delete a users message     |

### Session

| Resource       | Endpoint                     | Method | Description                     |
|----------------|------------------------------|--------|---------------------------------|
| Session        | /sessions                    | GET    | Get all sessions                |
| Session        | /sessions                    | POST   | Add a new session               |
| Session        | /sessions/{id}               | GET    | Get a session                   |
| Session        | /sessions/{id}               | DELETE | Delete a session                |
| SessionUser    | /sessions/{id}/users         | GET    | Get all sessions users          |
| SessionUser    | /sessions/{id}/users         | POST   | Add a new user to session       |
| SessionUser    | /sessions/{id}/users/{id}    | GET    | Get a user from session         |
| SessionUser    | /sessions/{id}/users/{id}    | DELETE | Delete a user from session      |
| SessionMessage | /sessions/{id}/messages      | GET    | Get all sessions messages       |
| SessionMessage | /sessions/{id}/messages      | POST   | Add a new message to session    |
| SessionMessage | /sessions/{id}/messages/{id} | GET    | Get a message from a session    |
| SessionMessage | /sessions/{id}/messages/{id} | DELETE | Delete a message from a session |
