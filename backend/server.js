// backend/server.js
import app from './app.js';

const PORT = process.env.PORT || 5005;

// Only server.js calls listen!
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
