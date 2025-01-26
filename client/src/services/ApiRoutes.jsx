export const url = {
  baseApiUrl: "https://backend-apis-ashy.vercel.app/",
  stats: "https://backend-apis-ashy.vercel.app/api/admin/stats",
  downloadReports:
    "https://backend-apis-ashy.vercel.app/api/admin/stats-report",
  addUser: "https://backend-apis-ashy.vercel.app/api/admin/add-user",
  getUsers: "https://backend-apis-ashy.vercel.app/api/admin/users",

  //cityManagerRoutes
  // getting city stats
  getcityStats:
    "https://backend-apis-ashy.vercel.app/api/users/city-manager/stats",

  //create branch manager in the city
  createBranchManger:
    "https://backend-apis-ashy.vercel.app/api/city-manager/branch-managers",

  getAllBranchManagers:
    "https://backend-apis-ashy.vercel.app/api/city-manager/branch-managers",
  updatateBranchManager:
    "https://backend-apis-ashy.vercel.app/api/city-manager/branch-managers",

  //    Branch manager routes
  getBranchHistory:
    "https://backend-apis-ashy.vercel.app/api/branch-manager/branch-stats",
  PostRegulerUpdates:
    "https://backend-apis-ashy.vercel.app/api/branch-manager/add-food-log",
};
