//var REACT_APP_CLUSTER_NAME = 'beseeching73'
var projectConfig = {
  url: {
    data: "https://data." + process.env.REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1/query",
    auth: "https://auth." + process.env.REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1",
    filestore: "https://filestore." + process.env.REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1/file"
  }
}
console.log(projectConfig.url);
const saveOffline = (authToken) => {
  window.localStorage.setItem('authToken', authToken);
}

const getSavedToken = () => {
  return window.localStorage.getItem('authToken');
}

module.exports = {
  projectConfig,
  saveOffline,
  getSavedToken
};
