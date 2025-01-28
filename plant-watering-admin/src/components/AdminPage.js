// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'react-bootstrap';
import axios from 'axios';

// Data parsing utility function
const parseSensorData = (dataString) => {
  const parts = dataString.split('~').filter(p => p);
  let lastWateringEvent = null;
  let batteryVoltage = null;

  parts.forEach(part => {
    const [epoch, type, ...rest] = part.split(':');
    if (type === 'w1' || type === 'w0') {
      lastWateringEvent = {
        epoch: parseInt(epoch),
        type,
        data: rest.join(':')
      };
    } else if (type === 'Battery voltage') {
      batteryVoltage = parseFloat(rest[0]);
    }
  });

  return { lastWateringEvent, batteryVoltage };
};

// Watering status determination
const getWateringStatus = (event) => {
  if (!event) return { status: 'Not Started', variant: 'secondary' };
  
  const now = Date.now();
  const elapsed = now - event.epoch;
  
  if (event.type === 'w1') {
    return elapsed > 3600000 // 1 hour timeout
      ? { status: 'Issue - Watering too long', variant: 'danger' }
      : { status: 'Watering', variant: 'warning' };
  }
  
  return { status: 'Completed', variant: 'success' };
};

// Battery status calculation
const getBatteryStatus = (voltage) => {
  if (!voltage) return { level: 'Unknown', variant: 'secondary' };
  
  if (voltage >= 3.7) return { level: 'Good', variant: 'success' };
  if (voltage >= 3.3) return { level: 'Low', variant: 'warning' };
  return { level: 'Critical', variant: 'danger' };
};

// Individual device row component
const DeviceRow = ({ device }) => {
  const { lastWateringEvent, batteryVoltage } = parseSensorData(device.data);
  const wateringStatus = getWateringStatus(lastWateringEvent);
  const batteryStatus = getBatteryStatus(batteryVoltage);

  const issues = [];
  if (wateringStatus.variant === 'danger') issues.push(wateringStatus.status);
  if (batteryStatus.variant === 'danger') issues.push('Low Battery');
  if (!lastWateringEvent) issues.push('No Data Received');

  return (
    <tr>
      <td>{device.user_id}</td>
      <td>{device.name}</td>
      <td>
        <Badge bg={wateringStatus.variant}>
          {wateringStatus.status}
        </Badge>
      </td>
      <td>
        {batteryVoltage && `${batteryVoltage.toFixed(2)}V `}
        <Badge bg={batteryStatus.variant}>
          {batteryStatus.level}
        </Badge>
      </td>
      <td>{issues.join(', ') || 'None'}</td>
    </tr>
  );
};

// Main admin page component
const AdminPage = () => {
  const [devices, setDevices] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/devices');
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Plant Watering System Admin Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Device Name</th>
            <th>Watering Status</th>
            <th>Battery Status</th>
            <th>Detected Issues</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <DeviceRow key={device.user_id} device={device} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;