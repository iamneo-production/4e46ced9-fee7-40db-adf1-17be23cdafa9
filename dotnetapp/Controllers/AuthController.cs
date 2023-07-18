using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;


namespace dotnetapp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("user/signup")]
        public IActionResult SaveUser([FromBody] UserModel user)
        {
            BusinessLayer dal = new BusinessLayer();
            return Created("",dal.SaveUser(user));
        }
        [HttpPost]
        [Route("admin/signup")]
        public IActionResult SaveAdmin([FromBody] AdminModel admin)
        {
            BusinessLayer dal = new BusinessLayer();
            return Created("",dal.SaveAdmin(admin));
        }
        [HttpPost]
        [Route("user/login")]
        public IActionResult AuthenticateUser([FromBody] LoginModel login)
        {
            DataAccessLayer dal = new DataAccessLayer();
            bool isAuthenticated = dal.AuthenticateUser(login.Email, login.Password);
            if (isAuthenticated)
            {
                return StatusCode(201, new { Status = "Success" });
            }
            else
            {
                 return BadRequest(new { Status = "Error", Error = "Wrong Email or Password" });
            }
        }
        
    }
}

