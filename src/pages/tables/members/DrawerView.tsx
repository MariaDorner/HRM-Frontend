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
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import MinusIcon from '@rsuite/icons/Minus';

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
  const [isHovered, setIsHovered] = useState(false);

  const [skills, setSkills] = useState<{ name: string; description: string }[]>([]);
  const [educations, setEducations] = useState<
    { name: string; duration: string; description: string }[]
  >([]);

  const [works, setWorks] = useState<
    {
      jobTitle: string;
      department: string;
      managerName: string;
      startDate: Date | null;
      status: boolean;
    }[]
  >([]);

  const handleInputChange = (index: number, field: string, value: string | boolean) => {
    // Create a copy of the current state
    const updatedWorks = [...works];
    // Update the specific field for the given work entry
    updatedWorks[index][field] = value as string | boolean; // Type assertion to string | boolean
    // Update the state with the modified array
    setWorks(updatedWorks);
  };

  const handleAddWork = () => {
    // Add a new work entry to the works array with status as false and startDate as null
    setWorks([
      ...works,
      { jobTitle: '', department: '', managerName: '', startDate: null, status: false }
    ]);
  };

  const handleDateChange = (index: number, value: Date | null) => {
    // Create a copy of the current state
    const updatedWorks = [...works];
    // Update the startDate field for the given work entry
    updatedWorks[index].startDate = value || null; // Set null if value is null
    // Update the state with the modified array
    setWorks(updatedWorks);
  };

  const handleRemoveWork = (index: number) => {
    // Remove the work entry at the specified index
    const updatedWorks = works.filter((_, i) => i !== index);
    // Update the state with the modified array
    setWorks(updatedWorks);
  };
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
          <Stack justifyContent="space-between" style={{ marginBottom: 20, marginRight: 0 }}>
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
              <Form.Group style={{ marginLeft: 20, marginRight: 0 }}>
                <Form.ControlLabel>First Name</Form.ControlLabel>
                <Form.Control name="firstname" style={{ width: 275, marginTop: 5 }} />

                <Form.ControlLabel>Last Name</Form.ControlLabel>
                <Form.Control name="lastname" style={{ width: 275, marginTop: 5 }} />

                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="email" type="email" style={{ width: 275, marginTop: 5 }} />
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

          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ marginBottom: 30 }}>Work information</h4>
            <AddOutlineIcon
              onClick={handleAddWork}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: 30,
                height: 30,
                color: isHovered ? '#4682b4' : '#b0c4de',
                cursor: 'pointer',
                transition: 'color 0.3s ease-in-out'
              }}
            />
          </div>
          {works.map((workEntry, index) => (
            <div key={index}>
              <h5 style={{ marginBottom: 20, textAlign: 'center' }}>- - Work {index + 1}- - </h5>
              <Form.Group>
                <Form.ControlLabel>Job Title</Form.ControlLabel>
                <Form.Control
                  name={`jobTitle-${index}`}
                  value={workEntry.jobTitle}
                  onChange={value => handleInputChange(index, 'jobTitle', value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Department</Form.ControlLabel>
                <Form.Control
                  name={`department-${index}`}
                  value={workEntry.department}
                  onChange={value => handleInputChange(index, 'department', value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Manager Name</Form.ControlLabel>
                <Form.Control
                  name={`managerName-${index}`}
                  value={workEntry.managerName}
                  onChange={value => handleInputChange(index, 'managerName', value)}
                />
              </Form.Group>
              <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
                <Form.Group>
                  <Form.ControlLabel>Start Date</Form.ControlLabel>
                  <DatePicker
                    showWeekNumbers
                    style={{ width: 300 }}
                    value={workEntry.startDate}
                    onChange={value => handleDateChange(index, value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Status</Form.ControlLabel>
                  <Toggle
                    checked={workEntry.status}
                    onChange={value => handleInputChange(index, 'status', value)}
                    style={{ marginRight: 30 }}
                  />
                </Form.Group>
              </Stack>
              <MinusIcon
                onClick={() => handleRemoveWork(index)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  width: 30,
                  height: 30,
                  color: isHovered ? '#fa8072' : '#b0c4de',
                  cursor: 'pointer',
                  border: `1px solid ${isHovered ? '#fa8072' : 'transparent'}`,
                  borderRadius: '50%',
                  transition: 'color 0.3s ease-in-out, border 0.3s ease-in-out',
                  marginBottom: 10
                }}
              />
            </div>
          ))}
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ marginBottom: 30 }}>Skills information</h4>
            <AddOutlineIcon
              onClick={handleAddSkill}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: 30,
                height: 30,
                color: isHovered ? '#4682b4' : '#b0c4de',
                cursor: 'pointer',
                transition: 'color 0.3s ease-in-out'
              }}
            />
          </div>
          {skills.map((skill, index) => (
            <div key={index}>
              <h5 style={{ marginBottom: 20, textAlign: 'center' }}>- - Skill {index + 1} - - </h5>
              <Form.Group>
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Form.Control name={`skillsname-${index}`} value={skill.name} />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Input as="textarea" rows={3} placeholder="description" value={skill.description} />
              </Form.Group>
              <MinusIcon
                onClick={() => handleRemoveSkill(index)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  width: 30,
                  height: 30,
                  color: isHovered ? '#fa8072' : '#b0c4de',
                  cursor: 'pointer',
                  border: `1px solid ${isHovered ? '#fa8072' : 'transparent'}`,
                  borderRadius: '50%',
                  transition: 'color 0.3s ease-in-out, border 0.3s ease-in-out',
                  marginBottom: 10
                }}
              />
            </div>
          ))}
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ marginBottom: 30 }}>Education information</h4>
            <AddOutlineIcon
              onClick={handleAddEducation}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: 30,
                height: 30,
                color: isHovered ? '#4682b4' : '#b0c4de',
                cursor: 'pointer',
                transition: 'color 0.3s ease-in-out'
              }}
            />
          </div>
          {educations.map((education, index) => (
            <div key={index}>
              <h5 style={{ marginBottom: 20, textAlign: 'center' }}>
                - - Education {index + 1}- -{' '}
              </h5>
              <Form.Group>
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Form.Control name={`educ-${index}`} value={education.name} />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Duration</Form.ControlLabel>
                <Form.Control name={`dura-${index}`} value={education.duration} />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Form.Control name={`desc-${index}`} value={education.description} />
              </Form.Group>
              <MinusIcon
                onClick={() => handleRemoveEducation(index)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  width: 30,
                  height: 30,
                  color: isHovered ? '#fa8072' : '#b0c4de',
                  cursor: 'pointer',
                  border: `1px solid ${isHovered ? '#fa8072' : 'transparent'}`,
                  borderRadius: '50%',
                  transition: 'color 0.3s ease-in-out, border 0.3s ease-in-out',
                  marginBottom: 10
                }}
              />
            </div>
          ))}
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
