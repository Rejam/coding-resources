import axios from 'axios';

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
      const res = await axios.get('api/auth/login');
      return {
        success: true,
        data: res,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  /**
   * Register a new user
   * @public
   * @param {Object} user
   * @param {string} user.username
   * @param {string} user.email
   * @param {string} user.password
   * @returns {Promise}
   */
  register: async ({ username, email, password }) => {
    try {
      const res = await API.post('auth/register', {
        username,
        email,
        password,
      });
      return {
        success: true,
        data: res.data,
      };
    } catch (error) {
      return {
        success: false,
        errors: error.response.data,
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
