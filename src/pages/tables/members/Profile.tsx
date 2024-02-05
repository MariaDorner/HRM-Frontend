import React, { useState } from 'react';
import { Button, Input, Panel } from 'rsuite';
import './ProfileModal.css';
import EmailIcon from '@rsuite/icons/Email';
import PhoneIcon from '@rsuite/icons/Phone';

interface ProfileProps {
  employeeId: any;
  isEditingProp: boolean;
  employees: any[];
}

const ProfileModal: React.FC<ProfileProps> = ({ employeeId, isEditingProp, employees }) => {
  // Customize this modal based on the structure of your employee data
  const selectedEmployee = employees;

  console.log('employees:', employees);
  console.log('selectedEmployee:', selectedEmployee);

  if (!selectedEmployee || selectedEmployee === null) {
    return <div>No employee found</div>;
  }

  const [editedFields, setEditedFields] = useState({
    name: `${selectedEmployee?.firstname || ''} ${selectedEmployee?.lastname || ''}`,
    email: selectedEmployee?.email || '',
    phone1: selectedEmployee?.phone1 || '',
    phone2: selectedEmployee?.phone2 || '',
    Birthday: selectedEmployee?.birthdata || '',
    address: selectedEmployee?.address || '',
    jobTitle: selectedEmployee?.jobTitle || '',
    department: selectedEmployee?.department || '',
    workDescription: selectedEmployee?.workDescription || '',
    managerName: selectedEmployee?.managerName || '',
    startDate: selectedEmployee?.startDate || '',
    skillName: selectedEmployee?.skillName || '',
    skillDescription: selectedEmployee?.skillDescription || '',
    educationName: selectedEmployee?.educationName || '',
    duration: selectedEmployee?.duration || '',
    educationsDescription: selectedEmployee?.educationsDescription || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Implement the logic to save changes
    // For simplicity, let's just update the edited fields in the local state
    // You would typically make an API call to update the server data

    if (selectedEmployee) {
      selectedEmployee.name = editedFields.name;
      selectedEmployee.email = editedFields.email;
      selectedEmployee.phone1 = editedFields.phone1;
      selectedEmployee.phone2 = editedFields.phone2;
      selectedEmployee.Birthday = editedFields.Birthday;
      selectedEmployee.address = editedFields.address;
      selectedEmployee.jobTitle = editedFields.jobTitle;
      selectedEmployee.department = editedFields.department;
      selectedEmployee.workDescription = editedFields.workDescription;
      selectedEmployee.managerName = editedFields.managerName;
      selectedEmployee.startDate = editedFields.startDate;
      selectedEmployee.skillName = editedFields.skillName;
      selectedEmployee.skillDescription = editedFields.skillDescription;
      selectedEmployee.educationName = editedFields.educationName;
      selectedEmployee.duration = editedFields.duration;
      selectedEmployee.educationsDescription = editedFields.educationsDescription;
    }

    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setEditedFields(prevFields => ({
      ...prevFields,
      [field]: value
    }));
  };
  const [editedSkills, setEditedSkills] = useState(selectedEmployee?.Skills || []);

  const handleSkillFieldChange = (index, field, value) => {
    setEditedSkills(prevSkills =>
      prevSkills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill))
    );
  };
  const [editedWorks, setEditedWorks] = useState(selectedEmployee?.Works || []);

  const handleWorkFieldChange = (index, field, value) => {
    setEditedWorks(prevWorks =>
      prevWorks.map((work, i) => (i === index ? { ...work, [field]: value } : work))
    );
  };
  const [editedEducation, setEditedEducation] = useState(selectedEmployee?.Education || []);

  const handleEducationFieldChange = (index, field, value) => {
    setEditedEducation(prevEducation =>
      prevEducation.map((education, i) =>
        i === index ? { ...education, [field]: value } : education
      )
    );
  };
  return (
    <>
      {selectedEmployee && (
        <div className="profile-container">
          <div className="profile-content">
            <div
              className="profile-personal-info"
              style={{ backgroundColor: '#E0E0E0', padding: '10px' }}
            >
              <div
                className="profile-avatar"
                style={{ backgroundColor: '#E0E0E0', padding: '10px' }}
              >
                <img src={selectedEmployee.avatar} alt={selectedEmployee.firstName} />
              </div>
              <div className="profile-info">
                <h4
                  style={{ fontWeight: 'bold', color: '#72A0C1', fontSize: '15px', border: 'none' }}
                >
                  Personal Information
                </h4>
                <Input
                  className="inp"
                  placeholder="Name"
                  value={editedFields.name}
                  onChange={value => handleFieldChange('name', value)}
                  disabled={!isEditing}
                  style={{
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '14px',
                    backgroundColor: '#E0E0E0',
                    border: 'none'
                  }}
                />
                <div className="emil">
                  <EmailIcon style={{ padding: '1px', marginTop: '10px' }} />
                  <Input
                    placeholder="Email"
                    value={editedFields.email}
                    onChange={value => handleFieldChange('email', value)}
                    disabled={!isEditing}
                    style={{
                      fontWeight: 'bold',
                      color: '#333',
                      border: 'none',
                      fontSize: '12px',
                      backgroundColor: '#E0E0E0'
                    }}
                  />
                </div>
                <div className="ph">
                  <div className="iph">
                    <PhoneIcon
                      style={{ backgroundColor: '#E0E0E0', padding: '1px', marginTop: '5px' }}
                    />
                  </div>
                  <Input
                    placeholder="Phone 1"
                    value={editedFields.phone1}
                    onChange={value => handleFieldChange('phone1', value)}
                    disabled={!isEditing}
                    style={{
                      fontWeight: 'bold',
                      color: '#333',
                      border: 'none',
                      fontSize: '12px',
                      backgroundColor: '#E0E0E0'
                    }}
                  />
                </div>
                <div className="ph">
                  <div className="iph">
                    <PhoneIcon
                      style={{ backgroundColor: '#E0E0E0', padding: '1px', marginTop: '5px' }}
                    />
                  </div>
                  <Input
                    placeholder="Phone 2"
                    value={editedFields.phone2}
                    onChange={value => handleFieldChange('phone2', value)}
                    disabled={!isEditing}
                    style={{
                      fontWeight: 'bold',
                      color: '#333',
                      border: 'none',
                      fontSize: '12px',
                      backgroundColor: '#E0E0E0'
                    }}
                  />
                </div>
                <div className="birthday">
                  <Input
                    placeholder="Birthday"
                    value={editedFields.Birthday}
                    onChange={value => handleFieldChange('Birthday', value)}
                    disabled={!isEditing}
                    style={{
                      fontWeight: 'bold',
                      color: '#333',
                      border: 'none',
                      fontSize: '12px',
                      backgroundColor: '#E0E0E0'
                    }}
                  />
                </div>
              </div>

              <div className="profile-actions">
                <Button
                  className="btn"
                  onClick={handleEditClick}
                  appearance="default"
                  style={{ marginRight: '20px', backgroundColor: '#72A0C1', color: '#FFFFFF' }}
                >
                  Edit
                </Button>
                {isEditing && (
                  <Button onClick={handleSaveClick} appearance="primary">
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="profile-details">
            <Panel
              header={
                <span style={{ fontWeight: 'bold', color: '#72A0C1', fontSize: '15px' }}>Work</span>
              }
              bordered
            >
              <div>
                {selectedEmployee?.Works.map((work, index) => (
                  <div key={index}>
                    <Input
                      placeholder={`Job Title ${index + 1}`}
                      value={work.title}
                      onChange={value => handleWorkFieldChange(index, 'title', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                    <Input
                      placeholder="Work Description"
                      value={work.description}
                      onChange={value => handleFieldChange('description', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                    <Input
                      placeholder="Manager Name"
                      value={work.manager_name}
                      onChange={value => handleFieldChange('managerName', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                    <Input
                      placeholder="Start Date"
                      value={work.start_date}
                      onChange={value => handleFieldChange('startDate', value)}
                      disabled={!isEditingProp}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
              <Input
                placeholder="Department"
                value={editedFields.department}
                onChange={value => handleFieldChange('department', value)}
                disabled={!isEditing}
                style={{ fontWeight: 'bold', color: '#333', fontSize: '15px', border: 'none' }}
              />
            </Panel>
            <Panel
              header={
                <span style={{ fontWeight: 'bold', color: '#72A0C1', fontSize: '15px' }}>
                  Skills
                </span>
              }
              bordered
            >
              <div>
                {selectedEmployee?.Skills.map((skill, index) => (
                  <div key={index}>
                    <label>Name</label>
                    <Input
                      placeholder={`Skill Name ${index + 1}`}
                      value={skill.name}
                      onChange={value => handleSkillFieldChange(index, 'name', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                    <label>Description</label>
                    <Input
                      placeholder={`Skill Description ${index + 1}`}
                      value={skill.description}
                      onChange={value => handleSkillFieldChange(index, 'description', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </Panel>
            <Panel
              header={
                <span style={{ fontWeight: 'bold', color: '#72A0C1', fontSize: '15px' }}>
                  Education
                </span>
              }
              bordered
            >
              <div>
                {selectedEmployee?.Education.map((education, index) => (
                  <div key={index}>
                    <Input
                      placeholder={`Education Name ${index + 1}`}
                      value={education.name}
                      onChange={value => handleEducationFieldChange(index, 'name', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                    <Input
                      placeholder="Duration"
                      value={education.duration}
                      onChange={value => handleFieldChange('duration', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                    <Input
                      placeholder="Education Description"
                      value={education.description}
                      onChange={value => handleFieldChange('educationsDescription', value)}
                      disabled={!isEditing}
                      style={{
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: '15px',
                        border: 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
