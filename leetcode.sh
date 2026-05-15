#!/bin/bash

# Resolve the directory of the script
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$APP_DIR/.vite.pid"
LOG_FILE="$APP_DIR/.vite.log"

start_app() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    # Check if process is still actively running
    if ps -p $PID > /dev/null; then
      echo "✅ LeetCode Tracker is already running (PID: $PID)."
      echo "👉 Access it at: http://localhost:5173"
      return
    else
      # Stale PID file
      rm "$PID_FILE"
    fi
  fi

  echo "🚀 Starting LeetCode Tracker..."
  cd "$APP_DIR" || exit
  
  # Run npm dev server in the background
  nohup npm run dev > "$LOG_FILE" 2>&1 &
  PID=$!
  echo $PID > "$PID_FILE"
  
  echo "✅ Application started! (PID: $PID)"
  echo "📝 Logs are being written to .vite.log"
  echo ""
  echo "👉 Access the app at: http://localhost:5173"
}

stop_app() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
      echo "🛑 Stopping LeetCode Tracker (PID: $PID)..."
      # Kill Vite process group by targeting the entire tree of the PID
      pkill -P $PID
      kill $PID 2>/dev/null
      rm "$PID_FILE"
      echo "✅ Application stopped."
    else
      echo "⚠️ Application is not currently running (stale PID file found and removed)."
      rm "$PID_FILE"
    fi
  else
    echo "⚠️ Application is not running. No PID file found."
  fi
}

status_app() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null; then
      echo "🟢 LeetCode Tracker is RUNNING (PID: $PID)."
      echo "👉 Access it at: http://localhost:5173"
    else
      echo "🔴 LeetCode Tracker is STOPPED (stale PID file)."
    fi
  else
    echo "🔴 LeetCode Tracker is STOPPED."
  fi
}

case "$1" in
  start)
    start_app
    ;;
  stop)
    stop_app
    ;;
  restart)
    stop_app
    sleep 2
    start_app
    ;;
  status)
    status_app
    ;;
  *)
    echo "Usage: ./leetcode.sh {start|stop|restart|status}"
    exit 1
esac
