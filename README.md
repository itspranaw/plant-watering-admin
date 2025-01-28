# Plant Watering Automation System

![System Architecture](https://via.placeholder.com/800x300.png?text=System+Architecture+Diagram)  
*Admin Dashboard + IoT Device Monitoring Solution*

## Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

**Admin Dashboard (React Frontend)**
- Real-time device status monitoring
- Battery level indicators with color coding
- Watering session progress tracking
- Automatic issue detection system
- Responsive design for all screen sizes
- Auto-refresh every 5 seconds

**Sensor API (Flask Backend)**
- Dynamic mock data generation
- RESTful API endpoints
- CORS-enabled for cross-origin requests
- Randomized device status simulation
- Error-resistant data parsing
- Scalable device management

## 🚀 Installation

### Prerequisites
- Node.js v16+ (Frontend)
- Python 3.8+ (Backend)
- npm (comes with Node.js)
- pip (Python package manager)

### Backend Setup
```bash
# Navigate to backend folder
cd flask-backend

# Create virtual environment
python -m venv venv

# Activate environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
