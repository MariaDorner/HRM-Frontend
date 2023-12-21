import React, { useState } from 'react';
import { Button, Input, Panel, PanelGroup } from 'rsuite';

interface ProfileProps {
  employeeId: any;
  isEditingProp: boolean;
  employees: any[];
}

const ProfileModal: React.FC<ProfileProps> = ({ employeeId, isEditingProp, employees }) => {
  // Customize this modal based on the structure of your employee data
  const selectedEmployee = employees.find(employee => employee.id === employeeId);
  const [editedFields, setEditedFields] = useState({
    name: selectedEmployee?.name || '',
    email: selectedEmployee?.email || '',
    phone1: selectedEmployee?.phone1 || '',
    phone2: selectedEmployee?.phone2 || '',
    Birthday: selectedEmployee?.Birthday || '',
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

  return (
    <>
      {selectedEmployee && (
        <>
          <PanelGroup className="modal">
            <Panel header={isEditingProp ? 'Edit Profile' : selectedEmployee.name}>
              <img src={selectedEmployee.avatar} alt={selectedEmployee.firstName} />
              <hr />
              <Input
                placeholder="Name"
                value={editedFields.name}
                onChange={value => handleFieldChange('name', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Email"
                value={editedFields.email}
                onChange={value => handleFieldChange('email', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Phone 1"
                value={editedFields.phone1}
                onChange={value => handleFieldChange('phone1', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Phone 2"
                value={editedFields.phone2}
                onChange={value => handleFieldChange('phone2', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Birthday"
                value={editedFields.Birthday}
                onChange={value => handleFieldChange('Birthday', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Address"
                value={editedFields.address}
                onChange={value => handleFieldChange('address', value)}
                disabled={!isEditing}
              />
            </Panel>{' '}
            <hr />
            <Panel header="Work ">
              <Input
                placeholder="Job Title"
                value={editedFields.jobTitle}
                onChange={value => handleFieldChange('jobTitle', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Department"
                value={editedFields.department}
                onChange={value => handleFieldChange('department', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Work Description"
                value={editedFields.workDescription}
                onChange={value => handleFieldChange('workDescription', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Manager Name"
                value={editedFields.managerName}
                onChange={value => handleFieldChange('managerName', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Start Date"
                value={editedFields.startDate}
                onChange={value => handleFieldChange('startDate', value)}
                disabled={!isEditingProp}
              />
            </Panel>
            <Panel header="Skills ">
              <Input
                placeholder="Skill Name"
                value={editedFields.skillName}
                onChange={value => handleFieldChange('skillName', value)}
                disabled={!isEditingProp}
              />
              <Input
                placeholder="Skill Description"
                value={editedFields.skillDescription}
                onChange={value => handleFieldChange('skillDescription', value)}
                disabled={!isEditing}
              />
            </Panel>
            <Panel header="Education ">
              <Input
                placeholder="Education Name"
                value={editedFields.educationName}
                onChange={value => handleFieldChange('educationName', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Duration"
                value={editedFields.duration}
                onChange={value => handleFieldChange('duration', value)}
                disabled={!isEditing}
              />
              <Input
                placeholder="Education Description"
                value={editedFields.educationsDescription}
                onChange={value => handleFieldChange('educationsDescription', value)}
                disabled={!isEditing}
              />

              {isEditing ? (
                <Button onClick={handleSaveClick} appearance="ghost">
                  Save
                </Button>
              ) : (
                <Button onClick={handleEditClick} appearance="default">
                  Edit
                </Button>
              )}
            </Panel>
          </PanelGroup>
        </>
      )}
    </>
  );
};

export default ProfileModal;
