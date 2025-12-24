from flask import Flask, render_template, jsonify, request
import socket
import subprocess
import time
from project_config import projects

app = Flask(__name__, static_folder='static', template_folder='templates')

# 检查端口是否开放
def check_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    try:
        s.connect(("127.0.0.1", port))
        s.close()
        return True
    except Exception:
        return False

@app.route("/")
def index():
    status = []
    for p in projects:
        is_open = check_port(p["port"])
        status.append({"name": p["name"], "port": p["port"], "bat": p["bat"], "open": is_open})
    return render_template("index.html", projects=status)

@app.route("/start", methods=["POST"])
def start_project():
    bat = request.json.get("bat")
    start_time = time.time()
    try:
        subprocess.Popen([bat], shell=True)
        elapsed = int((time.time() - start_time) * 1000)
        return jsonify({"success": True, "elapsed": elapsed})
    except Exception as e:
        elapsed = int((time.time() - start_time) * 1000)
        return jsonify({"success": False, "error": str(e), "elapsed": elapsed})

# ...existing code...

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)
