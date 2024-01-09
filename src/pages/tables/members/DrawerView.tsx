import React from 'react';
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
      </Drawer.Body>
    </Drawer>
  );
};

export default DrawerView;
