import React from 'react';
import { Button, Chip } from '@material-ui/core';

import './IndividualLink.scss';
import api from '../../api';

class ViewResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { resource: null };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await api.getOneResource(id);

    if (res.success) this.setState({ resource: res.resource });
  }

  render() {
    const { resource } = this.state;
    return resource ? (
      <div className="IndividualLink">
        <div className="container">
          <div className="titleLogoBox">
            <h1>{resource.name}</h1>
            <div>
              <a
                href={`https://${resource.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resource.link}
              </a>
            </div>
            <div>
              {resource.tags.map(tag => (
                <Chip
                  key={tag}
                  className="tag"
                  label={tag}
                />
              ))}
            </div>
            <Button variant="contained" color="primary">
              Votes: {resource.votes}
            </Button>
          </div>

          <div className="description">
            <h2>Site Description</h2>
            <p>{resource.desc}</p>
          </div>
          <div className="commentZone">
            <p>Where the comments will go</p>
          </div>
        </div>
      </div>
    ) : (
      <div>Resource not found</div>
    );
  }
}

export default ViewResource;
