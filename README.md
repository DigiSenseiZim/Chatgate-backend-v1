# Chatgate-backend-v1

## Readme: Chatgate Backend

### Project Overview
Chatgate is a CRM backend built on Node.js and Express.js, designed to connect human agents to a Botpress Server V12 chatbot, Botpress Cloud, Facebook Pages API and other additional channels as microservices. 

It integrates seamlessly with a PostgreSQL database to store conversation data, agent profiles, and other relevant information. The backend provides endpoints for managing conversations, comments, agent profiles, and handoffs, which are consumed by the CRM frontend to enable agents to effectively manage chats while adhering to SLAs and utilizing helpful tools.

### Dependencies
- Node.js (v16 or later)
- Express.js
- PostgreSQL
- Botpress Server V12
- Other relevant libraries from the NPM suite.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chatgate-backend.git
   ```

2. Install dependencies:
   ```bash
   cd chatgate-backend
   npm install
   ```

3. Set up environment variables: Create a `.env` file and add the following variables:
   ```
   DATABASE_URL: Your PostgreSQL connection URL
   BOTPRESS_URL: The URL of your Botpress Server
   BOTPRESS_API_KEY: Your Botpress API key
   PORT: The port on which the backend will listen (default: 3000)
   ```

### Configuration
- **Database**: Ensure your PostgreSQL database is set up and accessible.
- **Botpress**: Configure your Botpress Server to interact with the backend.
- **Endpoints**: Define the endpoints for managing conversations, comments, agent profiles, and handoffs in your routes directory.

### Usage
1. Start the backend:
   ```bash
   npm start
   ```

2. Access the backend endpoints using your preferred HTTP client (e.g., Postman, curl).

### API Endpoints
- **Conversations**:
  - `GET /conversations`: Get a list of all conversations.
  - `GET /conversations/:id`: Get a specific conversation by ID.
  - `POST /conversations`: Create a new conversation.
  - `PUT /conversations/:id`: Update a conversation.
  - `DELETE /conversations/:id`: Delete a conversation.

- **Comments**:
  - `GET /conversations/:conversationId/comments`: Get a list of comments for a specific conversation.
  - `POST /conversations/:conversationId/comments`: Create a new comment.
  - `PUT /conversations/:conversationId/comments/:commentId`: Update a comment.
  - `DELETE /conversations/:conversationId/comments/:commentId`: Delete a comment.

- **Agent Profiles**:
  - `GET /agent-profiles`: Get a list of all agent profiles.
  - `GET /agent-profiles/:id`: Get a specific agent profile by ID.
  - `POST /agent-profiles`: Create a new agent profile.
  - `PUT /agent-profiles/:id`: Update an agent profile.
  - `DELETE /agent-profiles/:id`: Delete an agent profile.

- **Handoffs**:
  - `POST /conversations/:conversationId/handoffs`: Hand off a conversation to a human agent.

### Frontend Integration
The backend provides the necessary endpoints for the CRM frontend to manage chats, handle handoffs, and display relevant information. The frontend can consume these endpoints using APIs like Fetch or Axios.

### Additional Features
- **Sentiment Analysis**: Implement sentiment analysis to gauge customer satisfaction.
- **SLA Tracking**: Monitor and enforce SLAs for conversation response times and resolution rates.
- **Reporting**: Generate reports on agent performance, conversation volume, and other metrics.
- **Integration with Other Systems**: Integrate with other systems, such as ticketing systems or CRM platforms.
```
