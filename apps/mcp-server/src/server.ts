import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

export const getServer = (): McpServer => {
  const server = new McpServer(
    {
      name: 'mcp-server-template',
      version: '0.0.1',
    },
    { capabilities: {} }
  );

  // Register a simple prompt
  server.registerPrompt(
    'greeting-template',
    {
      title: 'Greeting template',
      description: 'A simple greeting prompt template',
      argsSchema: {
        name: z.string().describe('Name to include in greeting'),
      },
    },
    ({ name }) => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please greet ${name} in a friendly manner.`,
            },
          },
        ],
      };
    }
  );

  server.registerTool(
    'greet',
    {
      title: 'Greet',
      description: 'A simple greeting tool',
      inputSchema: {
        name: z.string().describe('Name to greet'),
      },
    },
    ({ name }) => {
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${name}!`,
          },
        ],
      };
    }
  );

  server.registerResource(
    'greeting-resource',
    'https://example.com/greetings/default',
    { mimeType: 'text/plain' },
    () => {
      return {
        contents: [
          {
            uri: 'https://example.com/greetings/default',
            text: 'Hello, world!',
          },
        ],
      };
    }
  );

  return server;
};
