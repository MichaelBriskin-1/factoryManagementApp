const fs = require('fs');
const path = require('path');


module.exports = (req, res, next) => {
// Log after response is sent to capture status
res.on('finish', () => {
try {
const dir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const dateStr = new Date().toISOString().slice(0, 10);
const file = path.join(dir, `actions-${dateStr}.jsonl`);


const record = {
ts: new Date().toISOString(),
userId: req.user?._id?.toString() || null,
fullName: req.user?.fullName || null,
method: req.method,
path: req.originalUrl,
status: res.statusCode,
query: req.query,
bodyKeys: Object.keys(req.body || {})
};


fs.appendFile(file, JSON.stringify(record) + '\n', () => {});
} catch (_e) { /* no-op */ }
});


next();
};