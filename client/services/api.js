import axios from 'axios';
import auth0Client from './auth';
import history from './history';

const API = axios.create({ baseURL: process.env.SERVER || '/api' });

export const Token = {
  set: (token) =>   {
    window.localStorage.setItem('token', token);
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  clear: () => {
    window.localStorage.removeItem('token');
    API.defaults.headers.common.Authorization = null;
  },
};

const api = {
  /**
   * Login
   * @public
   * @returns {Promise}
   */
  login: async () => {
    try {
      auth0Client.signIn();
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  /**
   * Logout
   * @public
   * @returns {Promise}
   */
  logout: async () => {
    try {
      auth0Client.logout();
      history.replace('/');
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  /**
   * Fetch categories
   * @public
   * @returns {Promise} Array of categories
   */
  getCategories: async () => {
    try {
      const res = await API.get('/resources/categories');
      return res.data;
    } catch (error) {
      return ({ categories: ['Fetch error'] });
    }
  },
  /**
   * Fetch resources
   * @public
   * @param {string} [category]
   * @returns {Promise} Array of resources
   */
  getResources: async (category) => {
    const cat = category || 'all';
    try {
      const res = await API.get(`/resources/c/${cat}`);
      return res.data;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * Fetch one resource
   * @public
   * @param {string} resourceId
   * @returns {Promise} resource object
   */
  getOneResource: async (resourceId) => {
    try {
      const res = await API.get(`/resources/${resourceId}`);
      return {
        success: true,
        resource: res.data.resource,
      };
    } catch (error) {
      return error.response.data;
    }
  },
  /**
   * Submit a new resource
   * @private
   * @param {object} resource
   * @param {string} resource.name
   * @param {string} resource.link
   * @param {string} resource.category
   * @param {string} [resource.desc]
   * @param {array} [resource.tags]
   * @returns {Promise}
   */
  submitResource: async ({ name, link, category, tags, desc = '' }) => {
    try {
      const res = await API.post('/resources', { name, link, category, desc, tags });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
  /**
   * Update a resource
   * @private
   * @param {object} resource
   * @param {string} resource.name
   * @param {string} resource.link
   * @param {string} resource.category
   * @param {string} [resource.desc]
   * @param {array} [resource.tags]
   * @returns {Promise}
   */
  updateResource: async (id, { name, link, category, tags, desc }) => {
    try {
      const res = await API.post(`/resources/edit/${id}`, { name, link, category, tags, desc });
      return res.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default api;
