import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResourceForm } from '../Resources';
import api from '../../services/api';
import history from '../../services/history';

class EditResourceC extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    defaultTags: PropTypes.array.isRequired,
  };

  state = {
    loading: true,
    resource: null,
    error: null,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const res = await api.getOneResource(id);
    if (res.success) {
      this.setState({
        resource: res.resource,
        loading: false,
      });
    } else {
      this.setState({
        error: 'Could not fetch',
        loading: false,
      });
    }
  }

  submit = async (resource) => {
    const { match: { params: { id } } } = this.props;
    const res = await api.updateResource(id, resource);
    if (res.success) {
      history.push(`/resources/${id}`);
    } else {
      this.setState({ error: 'Could not update. Unauthorized.' });
    }
  }

  render() {
    const { categories, defaultTags } = this.props;
    const { resource, error, loading } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
      <ResourceForm
        resource={resource}
        categories={categories}
        defaultTags={defaultTags}
        submit={this.submit}
      />
    );
  }
}

export default EditResourceC;
