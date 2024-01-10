import React, { useState } from 'react';
import { Drawer, DrawerProps, Button, Form, Stack, DatePicker, Input, Toggle } from 'rsuite';
import axios from 'axios';

const DrawerView = (props: DrawerProps) => {
  const [formData, setFormData] = useState({
    user: {
      firstname: '',
      lastname: '',
      birthdata: null,
      phone1: '',
      phone2: '',
      email: '',
      description: '',
      status: false
    },
    department: {
      title: '',
      status: false
    },
    work: {
      title: '',
      manager_name: '',
      start_date: null,
      description: '',
      is_current: false
    },
    skill: {
      name: '',
      description: ''
    },
    education: {
      name: '',
      duration: '',
      description: ''
    }
  });

  const { onClose, ...rest } = props;

  const handleFormChange = (value: any, name: string, category: string) => {
    setFormData(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [name]: value
      }
    }));
  };
  const handleSubmit = () => {
    // Make an API call using Axios
    axios
      .post('http://localhost:3000/create-member', formData)
      .then(response => {
        // Handle the response from the backend if needed
        console.log('Data saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving data:', error);
        // Handle errors if needed
      });
  };
  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Add a new member</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={handleSubmit} appearance="primary">
            Confirm
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form fluid>
          <h4 style={{ marginBottom: 20 }}>Personal information</h4>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>First Name</Form.ControlLabel>
              <Form.Control
                name="firstname"
                style={{ width: 200 }}
                onChange={value => handleFormChange(value, 'firstname', 'user')}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Last Name</Form.ControlLabel>
              <Form.Control
                name="lastname"
                style={{ width: 200 }}
                onChange={value => handleFormChange(value, 'lastname', 'user')}
              />
            </Form.Group>
          </Stack>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Phone 1</Form.ControlLabel>
              <Form.Control
                name="phone1"
                style={{ width: 200 }}
                onChange={value => handleFormChange(value, 'phone1', 'user')}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Phone 2</Form.ControlLabel>
              <Form.Control
                name="phone2"
                style={{ width: 200 }}
                onChange={value => handleFormChange(value, 'phone2', 'user')}
              />
            </Form.Group>
          </Stack>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Birthday</Form.ControlLabel>
              <DatePicker showWeekNumbers style={{ width: 200 }} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control
                name="email"
                type="email"
                style={{ width: 200 }}
                onChange={value => handleFormChange(value, 'email', 'user')}
              />
            </Form.Group>
          </Stack>

          <h4 style={{ marginBottom: 20 }}>Work information</h4>
          <Form.Group>
            <Form.ControlLabel>Job title</Form.ControlLabel>
            <Form.Control
              name="jobname"
              onChange={value => handleFormChange(value, 'title', 'work')}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Department</Form.ControlLabel>
            <Form.Control
              name="department"
              onChange={value => handleFormChange(value, 'title', 'department')}
            />
          </Form.Group>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Manager name</Form.ControlLabel>
              <Form.Control
                name="managerName"
                style={{ width: 200 }}
                onChange={value => handleFormChange(value, 'manager_name', 'work')}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Start date</Form.ControlLabel>
              <DatePicker showWeekNumbers style={{ width: 200 }} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>status</Form.ControlLabel>
              <Toggle />
            </Form.Group>
          </Stack>

          <h4 style={{ marginBottom: 20 }}>Skills</h4>
          <Form.Group>
            <Form.ControlLabel>Skill's name</Form.ControlLabel>
            <Form.Control
              name="skillsname"
              onChange={value => handleFormChange(value, 'skill', 'skill')}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Input
              name="description"
              as="textarea"
              rows={3}
              placeholder="description"
              onChange={value => handleFormChange(value, 'description', 'skill')}
            />
          </Form.Group>

          <h4 style={{ marginBottom: 20 }}>Education</h4>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Education</Form.ControlLabel>
              <Form.Control
                name="educ"
                style={{ width: 300 }}
                onChange={value => handleFormChange(value, 'name', 'education')}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Duration</Form.ControlLabel>
              <Form.Control
                name="dura"
                style={{ width: 150 }}
                onChange={value => handleFormChange(value, 'duration', 'education')}
              />
            </Form.Group>
          </Stack>
          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control
              name="desc"
              onChange={value => handleFormChange(value, 'description', 'education')}
            />
          </Form.Group>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
