import React from 'react';
import { Form, Stack, DatePicker, Input, Toggle } from 'rsuite';
//import users from './users';
// import { useState } from 'react';

const EditProfile = () => {
  // const [usersState, setUsersStae] = useState(users);
  return (
    <Form fluid>
      <h4 style={{ marginBottom: 20 }}>Personal information</h4>
      <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
        <Form.Group>
          <Form.ControlLabel>First Name</Form.ControlLabel>
          <Form.Control name="firstname" style={{ width: 200 }} />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Last Name</Form.ControlLabel>
          <Form.Control name="lastname" style={{ width: 200 }} />
        </Form.Group>
      </Stack>
      <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
        <Form.Group>
          <Form.ControlLabel>Phone 1</Form.ControlLabel>
          <Form.Control name="phone1" style={{ width: 200 }} />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Phone 2</Form.ControlLabel>
          <Form.Control name="phone2" style={{ width: 200 }} />
        </Form.Group>
      </Stack>
      <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
        <Form.Group>
          <Form.ControlLabel>Birthday</Form.ControlLabel>
          <DatePicker showWeekNumbers style={{ width: 200 }} />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="email" style={{ width: 200 }} />
        </Form.Group>
      </Stack>

      <h4 style={{ marginBottom: 20 }}>Work information</h4>
      <Form.Group>
        <Form.ControlLabel>Job title</Form.ControlLabel>
        <Form.Control name="jobname" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Department</Form.ControlLabel>
        <Form.Control name="department" />
      </Form.Group>
      <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
        <Form.Group>
          <Form.ControlLabel>Manager name</Form.ControlLabel>
          <Form.Control name="managerName" style={{ width: 200 }} />
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
        <Form.Control name="skillsname" />
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Description</Form.ControlLabel>
        <Input as="textarea" rows={3} placeholder="description" />
      </Form.Group>

      <h4 style={{ marginBottom: 20 }}>Education</h4>
      <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
        <Form.Group>
          <Form.ControlLabel>Education</Form.ControlLabel>
          <Form.Control name="educ" style={{ width: 300 }} />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Duration</Form.ControlLabel>
          <Form.Control name="dura" style={{ width: 150 }} />
        </Form.Group>
      </Stack>
      <Form.Group>
        <Form.ControlLabel>Description</Form.ControlLabel>
        <Form.Control name="desc" />
      </Form.Group>
    </Form>
  );
};

export default EditProfile;
