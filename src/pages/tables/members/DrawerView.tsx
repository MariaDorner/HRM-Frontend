import React, { useState } from 'react';
import {
  Drawer,
  DrawerProps,
  Button,
  Form,
  Stack,
  DatePicker,
  Input,
  Toggle,
  Uploader,
  Message,
  Loader,
  useToaster
} from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const DrawerView = (props: DrawerProps) => {
  const { onClose, ...rest } = props;
  const toaster = useToaster();
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);

  const [skills, setSkills] = useState<{ name: string; description: string }[]>([]);
  const [educations, setEducations] = useState<
    { name: string; duration: string; description: string }[]
  >([]);

  const handleAddSkill = () => {
    // Add a new skill to the skills array
    setSkills([...skills, { name: '', description: '' }]);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleAddEducation = () => {
    // Add a new education entry to the education array
    setEducations([...educations, { name: '', duration: '', description: '' }]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducations = [...educations];
    newEducations.splice(index, 1);
    setEducations(newEducations);
  };

  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Add a new member</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClose} appearance="primary">
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
            <Form layout="inline">
              <Form.Group>
                <Form.ControlLabel>Image</Form.ControlLabel>
                <Uploader
                  fileListVisible={false}
                  listType="picture"
                  action="//jsonplaceholder.typicode.com/posts/"
                  onUpload={file => {
                    setUploading(true);
                    previewFile(file.blobFile, value => {
                      setFileInfo(value);
                    });
                  }}
                  onSuccess={(response, file) => {
                    setUploading(false);
                    toaster.push(<Message type="success">Uploaded successfully</Message>);
                    console.log(response);
                  }}
                  onError={() => {
                    setFileInfo(null);
                    setUploading(false);
                    toaster.push(<Message type="error">Upload failed</Message>);
                  }}
                >
                  <button style={{ width: 150, height: 165 }}>
                    {uploading && <Loader backdrop center />}
                    {fileInfo ? (
                      <img src={fileInfo} width="100%" height="100%" />
                    ) : (
                      <AvatarIcon style={{ fontSize: 80 }} />
                    )}
                  </button>
                </Uploader>
              </Form.Group>
              <Form.Group style={{ marginLeft: 20, marginRight: 20 }}>
                <Form.ControlLabel>First Name</Form.ControlLabel>
                <Form.Control name="firstname" style={{ width: 200, marginTop: 5 }} />

                <Form.ControlLabel>Last Name</Form.ControlLabel>
                <Form.Control name="lastname" style={{ width: 200, marginTop: 5 }} />

                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" type="email" style={{ width: 200, marginTop: 5 }} />
              </Form.Group>
            </Form>
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
              <Form.ControlLabel>Address</Form.ControlLabel>
              <Form.Control name="address" style={{ width: 200 }} />
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
          {skills.map((skill, index) => (
            <div key={index}>
              <Form.Group>
                <Form.ControlLabel>Skill's name</Form.ControlLabel>
                <Form.Control
                  name={`skills[${index}].name`}
                  value={skill.name}
                  onChange={value => {
                    const updatedSkills = [...skills];
                    updatedSkills[index].name = value;
                    setSkills(updatedSkills);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Input
                  as="textarea"
                  rows={3}
                  placeholder="description"
                  name={`skills[${index}].description`}
                  value={skill.description}
                  onChange={value => {
                    const updatedSkills = [...skills];
                    updatedSkills[index].description = value;
                    setSkills(updatedSkills);
                  }}
                />
              </Form.Group>
            </div>
          ))}
          <Button onClick={handleAddSkill}>Add Skill</Button>
          <Button onClick={handleRemoveSkill}>Remove</Button>

          <h4 style={{ marginBottom: 20 }}>Education</h4>
          {educations.map((edu, index) => (
            <div key={index}>
              <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
                <Form.Group>
                  <Form.ControlLabel>Education</Form.ControlLabel>
                  <Form.Control
                    name={`education[${index}].name`}
                    value={edu.name}
                    onChange={value => {
                      const updatedEducation = [...educations];
                      updatedEducation[index].name = value;
                      setEducations(updatedEducation);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Duration</Form.ControlLabel>
                  <Form.Control
                    name={`education[${index}].duration`}
                    value={edu.duration}
                    onChange={value => {
                      const updatedEducation = [...educations];
                      updatedEducation[index].duration = value;
                      setEducations(updatedEducation);
                    }}
                  />
                </Form.Group>
              </Stack>
              <Form.Group>
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Form.Control
                  name={`education[${index}].description`}
                  value={edu.description}
                  onChange={value => {
                    const updatedEducation = [...educations];
                    updatedEducation[index].description = value;
                    setEducations(updatedEducation);
                  }}
                />
              </Form.Group>
            </div>
          ))}
          <Button onClick={handleAddEducation}>Add Education</Button>
          <Button onClick={handleRemoveEducation}>Remove</Button>
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
