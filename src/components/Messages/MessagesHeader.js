import React from "react";

import { Segment, Input, Icon, Header } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    return (
      <Segment clearing>

          {/* Channel Title Header */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            Channel
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>
              2 Users
          </Header.Subheader>
        </Header>

        {/* Channel Search Input Header */}
        <Header floated="right">
            <input 
                icon="search"
                size="mini"
                name="searchTerm"
                placeholder="Search Messages"
            />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
