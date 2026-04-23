# Use the official Python lightweight image
FROM python:3.11-slim

# Set the working directory directly in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies (Flask)
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the remaining application files (HTML, CSS, JS, Python server)
COPY . .

# Expose port 8080 which the Flask app will run on
EXPOSE 8080

# Define the command to run the application
CMD ["python", "main.py"]
