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

  const [fileInfo, setFileInfo] = React.useState('');
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
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [imageId, setImageId] = useState('');
  const formData = new FormData();
  const handleSubmit = async () => {
    const userData = {
      firstname: firstname,
      lastname: lastname,
      birthdata: birthdate?.toISOString().split('T')[0] || '',
      phone1: phone1,
      phone2: phone2,
      password: password,
      address: address,
      email: email,
      description: description,
      profileImage: imageId,
      status: true,
      skills: skills.map((skill, index) => index + 1),
      work: works.map((work, index) => index + 1),
      education: educations.map((education, index) => index + 1)
    };

    try {
      // Make a POST request to your API endpoint
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      console.log(userData);
      if (response.ok) {
        // Handle success
        toaster.push(<Message type="success">User created successfully</Message>);
        // You may also want to reset the form or close the drawer here
      } else {
        // Handle error
        toaster.push(<Message type="error">Failed to create user</Message>);
      }
    } catch (error) {
      console.error('Error:', error);
      toaster.push(<Message type="error">An unexpected error occurred</Message>);
    }
  };

  const handleFileChange = files => {
    // Assuming only one file is allowed
    const file = files[0];

    // Append the file to the formData
    formData.append('file', file.blobFile);

    // You can also update the fileInfo state if needed
    setFileInfo(file.name);
    console.log(file.id);
  };

  const handleInputChange = (index: number, field: string, value: string | boolean) => {
    // Create a copy of the current state
    const updatedWorks = [...works];
    // Update the specific field for the given work entry
    updatedWorks[index][field] = value as string | boolean; // Type assertion to string | boolean
    // Update the state with the modified array
    setWorks(updatedWorks);
  };

  const handleInputChangeSkillEducation = (
    index: number,
    field: string,
    value: string | boolean,
    type: 'skills' | 'educations'
  ) => {
    if (type === 'skills') {
      const updatedSkills = [...skills];
      updatedSkills[index][field] = value as string;
      setSkills(updatedSkills);
    } else if (type === 'educations') {
      const updatedEducations = [...educations];
      updatedEducations[index][field] = value as string;
      setEducations(updatedEducations);
    }
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
          <Stack justifyContent="space-between" style={{ marginBottom: 20, marginRight: 0 }}>
            <Form layout="inline">
              <Form.Group>
                <Form.ControlLabel>Image</Form.ControlLabel>
                <Uploader
                  fileListVisible={false}
                  listType="picture"
                  action="http://localhost:3000/files"
                  onChange={handleFileChange}
                  onSuccess={(response, file) => {
                    previewFile(file.blobFile, value => {
                      setFileInfo(value);
                    });
                    // Handle successful file upload
                    console.log('File uploaded successfully:', response?.data?.file?.id);
                    setImageId(response?.data?.file?.id);
                    // Append the file data to the formData here
                    formData.append('file', file.blobFile);

                    // Update the fileInfo state or handle the response data as needed
                    setFileInfo(file.blobFile.name);
                    console.log(formData);
                  }}
                  onError={() => {
                    setFileInfo(null);

                    toaster.push(<Message type="error">Upload failed</Message>);
                  }}
                >
                  <div style={{ width: 150, height: 150 }}>
                    {fileInfo ? (
                      <img src={fileInfo} width="100%" height="100%" />
                    ) : (
                      <AvatarIcon style={{ fontSize: 80 }} />
                    )}
                  </div>
                </Uploader>
              </Form.Group>
              <Form.Group style={{ marginLeft: 20, marginRight: 0 }}>
                <Form.ControlLabel>First Name</Form.ControlLabel>
                <Form.Control
                  name="firstname"
                  value={firstname}
                  onChange={value => setFirstname(value)}
                  style={{ width: 275, marginTop: 5 }}
                />

                <Form.ControlLabel>Last Name</Form.ControlLabel>
                <Form.Control
                  name="lastname"
                  value={lastname}
                  onChange={value => setLastname(value)}
                  style={{ width: 275, marginTop: 5 }}
                />

                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  type="email"
                  value={email}
                  onChange={value => setEmail(value)}
                  style={{ width: 275, marginTop: 5 }}
                />
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  name="password"
                  type="password"
                  value={password}
                  onChange={value => setPassword(value)}
                  style={{ width: 275, marginTop: 5 }}
                />
              </Form.Group>
            </Form>
          </Stack>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Phone 1</Form.ControlLabel>
              <Form.Control
                name="phone1"
                value={phone1}
                onChange={value => setPhone1(value)}
                style={{ width: 200 }}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Phone 2</Form.ControlLabel>
              <Form.Control
                name="phone2"
                value={phone2}
                onChange={value => setPhone2(value)}
                style={{ width: 200 }}
              />
            </Form.Group>
          </Stack>
          <Stack justifyContent="space-between" style={{ marginBottom: 20 }}>
            <Form.Group>
              <Form.ControlLabel>Birthday</Form.ControlLabel>
              <DatePicker
                showWeekNumbers
                style={{ width: 200 }}
                value={birthdate}
                onChange={value => setBirthdate(value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Address</Form.ControlLabel>
              <Form.Control
                name="address"
                value={address}
                onChange={value => setAddress(value)}
                style={{ width: 200 }}
              />
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
                <Form.Control
                  name={`skillsname-${index}`}
                  value={skill.name}
                  onChange={value =>
                    handleInputChangeSkillEducation(index, 'name', value, 'skills')
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Input
                  as="textarea"
                  rows={3}
                  placeholder="description"
                  value={skill.description}
                  onChange={value =>
                    handleInputChangeSkillEducation(index, 'description', value, 'skills')
                  }
                />
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
                <Form.Control
                  name={`educ-${index}`}
                  value={education.name}
                  onChange={value =>
                    handleInputChangeSkillEducation(index, 'name', value, 'educations')
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Duration</Form.ControlLabel>
                <Form.Control
                  name={`dura-${index}`}
                  value={education.duration}
                  onChange={value =>
                    handleInputChangeSkillEducation(index, 'duration', value, 'educations')
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Form.Control
                  name={`desc-${index}`}
                  value={education.description}
                  onChange={value =>
                    handleInputChangeSkillEducation(index, 'description', value, 'educations')
                  }
                />
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
