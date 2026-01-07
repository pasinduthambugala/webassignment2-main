@echo off
echo Starting Bookstore Project...

start "Backend Server" cmd /k "cd backend && npm run dev"
start "Frontend Client" cmd /k "cd frontend && npm run dev"

echo Project started! Check the other windows.
pause
