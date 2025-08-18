/* eslint-disable import/extensions */
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import { randomUUID } from "node:crypto";
import { server } from "./server.js";
import { initializeTools } from "./tools/index.js";

const app = express();
app.use(express.json());

// Store transports for each session type
const transports = {
  sse: {} as Record<string, SSEServerTransport>,
  streamable: {} as Record<string, StreamableHTTPServerTransport>,
};

// Modern Streamable HTTP endpoint
app.post("/mcp", async (req, res) => {
  // Check for existing session ID
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports.streamable[sessionId]) {
    // Reuse existing transport
    transport = transports.streamable[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // New initialization request
    transport = new StreamableHTTPServerTransport({
      onsessioninitialized: (newSessionId) => {
        // Store the transport by session ID
        transports.streamable[newSessionId] = transport;
      },
      sessionIdGenerator: () => randomUUID(),
    });

    // Clean up transport when closed
    transport.onclose = () => {
      if (transport.sessionId) {
        delete transports.streamable[transport.sessionId];
      }
    };

    await initializeTools(server, {});

    // Connect to the MCP server
    await server.connect(transport);
  } else {
    // Invalid request
    console.error(
      "Invalid Streamable HTTP request: ",
      JSON.stringify(req.body, null, 2)
    );
    res.status(400).json({
      error: {
        code: -32000,
        message: "Bad Request: No valid session ID provided",
      },
      id: null,
      jsonrpc: "2.0",
    });
    return;
  }

  // Handle the request
  await transport.handleRequest(req, res, req.body);
});

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (
  req: express.Request,
  res: express.Response
) => {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transports.streamable[sessionId]) {
    console.error(
      "Invalid Streamable HTTP request (invalid/missing session ID): ",
      JSON.stringify(req.body, null, 2)
    );
    res.status(400).send("Invalid or missing session ID");
    return;
  }

  console.log("Handling session request for ID:", sessionId);

  const transport = transports.streamable[sessionId];
  await transport.handleRequest(req, res);
};

app.get("/mcp", handleSessionRequest);
app.delete("/mcp", handleSessionRequest);

// Legacy SSE endpoint for older clients
app.get("/sse", async (req, res) => {
  // Create SSE transport for legacy clients
  const transport = new SSEServerTransport("/messages", res);
  transports.sse[transport.sessionId] = transport;

  res.on("close", () => {
    delete transports.sse[transport.sessionId];
  });

  await initializeTools(server, {});
  await server.connect(transport);
});

// Legacy message endpoint for older clients
app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.sse[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    console.error("No transport found for sessionId", sessionId);
    res.status(400).send("No transport found for sessionId");
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    description: "The official MCP server for SDS",
    endpoints: {
      "/health": "Health check endpoint",
      "/mcp": "Modern Streamable HTTP endpoint",
      "/messages": "Legacy message endpoint",
      "/sse": "Legacy SSE endpoint",
    },
    name: "SDS MCP Server",
    version: "0.1.0",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.info(`SDS MCP SSE Server running on http://localhost:${port}`);
  });
}

// For Vercel deployment, export the app as default
export default app;
