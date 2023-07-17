using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp
{
    internal class BusinessLayer
    {
        DataAccessLayer dal = new DataAccessLayer();
        public string SaveUser(UserModel user)
        {
            return (dal.SaveUser(user));
        }
        public string SaveAdmin(AdminModel admin)
        {
            return (dal.SaveAdmin(admin));
        }
        public List<ServiceCenterModel> getServices()
        {
            return dal.getServices();
        }
        public bool AuthenticateUser(LoginModel login)
        {
            return dal.AuthenticateUser(login.Email, login.Password);
        }
    }
}
