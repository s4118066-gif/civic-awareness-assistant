from flask import Flask, send_from_directory
import os

# Initialize Flask app, setting the static folder to the current directory
app = Flask(__name__, static_folder='.')

@app.route('/')
def serve_index():
    """Serve the main index.html dashboard."""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files like style.css, app.js, etc."""
    # Prevent directory traversal attacks
    if os.path.exists(os.path.join('.', path)):
        return send_from_directory('.', path)
    return "File not found", 404

if __name__ == '__main__':
    # Run the server on the port specified by the environment, defaulting to 8080
    port = int(os.environ.get("PORT", 8080))
    print(f"Starting Civic AI Dashboard on port {port}...")
    app.run(host='0.0.0.0', port=port)
