const BASE_URL = "https://footstall-api.vercel.app/";
export const url = {
  baseApiUrl: BASE_URL,
  stats: `${BASE_URL}api/admin/stats`,
  downloadReports: `${BASE_URL}api/admin/stats-report`,
  addUser: `${BASE_URL}api/admin/add-user`,
  getUsers: `${BASE_URL}api/admin/users`,
  // cityManagerRoutes
  // getting city stats
  getcityStats: `${BASE_URL}api/users/city-manager/stats`,

  // create branch manager in the city
  createBranchManger: `${BASE_URL}api/city-manager/branch-managers`,

  getAllBranchManagers: `${BASE_URL}api/city-manager/branch-managers`,
  updatateBranchManager: `${BASE_URL}api/city-manager/branch-managers`,

  // Branch manager routes
  getBranchHistory: `${BASE_URL}api/branch-manager/branch-stats`,
  PostRegulerUpdates: `${BASE_URL}api/branch-manager/add-food-log`,


  sendEmail : `${BASE_URL}api/email/send`
};
