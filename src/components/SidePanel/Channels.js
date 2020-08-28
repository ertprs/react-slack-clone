import React from "react";
import firebase from '../../firebase'

import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
      user: this.props.currentUser,
    channels: [],
    modal: false,
    channelName: "",
    channelDetails: "",
    channelsRef: firebase.database().ref('channels')
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isFormValid = ({channelName, channelDetails}) =>   channelName && channelDetails;

  handleSubmit = event =>{

    event.preventDefault()

    if (this.isFormValid(this.state)){

        this.addChannel()

    }
  }

  addChannel = () =>{
    const { channelsRef, channelName, channelDetails, user } = this.state

    const key = channelsRef.push().key

    const newChannel ={
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy: {
            id: user.uid,
            name: user.displayName,
            avatar: user.photoURL
        }
    }

    channelsRef
        .child(key)
        .update(newChannel)
        .then(()=>{
            this.setState({ channelName: '', channelDetails: '' })
            this.closeModal()
            console.log("channel Added")
        })
        .catch(err =>{
            console.error(err)
        })

  }
  

  render() {
     
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS &nbsp;
            </span>
            ({channels.length}) <Icon name="add" onClick={this.openModal}/>
          </Menu.Item>

          {/* Channels */}
        </Menu.Menu>


        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  placeholder="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  placeholder="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>

            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
