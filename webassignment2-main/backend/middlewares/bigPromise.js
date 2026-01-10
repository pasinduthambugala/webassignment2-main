module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            if (typeof next === 'function') return next(err);
            // fallback: log and send 500 if next is not available
            console.error('bigPromise error (no next):', err);
            if (!res.headersSent) {
                res.status(500).json({ success: false, message: err.message || 'Server Error' });
            }
        });
    };
};

// alternate option for async-await with try/catch inside controllers