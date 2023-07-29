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
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }
        [HttpPost]
        [Route("registration")]
        public IActionResult Register(UserModel userModel)
        {
            try
            {
                string query = "INSERT INTO Users (Email, Password, Username, MobileNumber, UserRole) " +
                               "VALUES (@Email, @Password, @Username, @MobileNumber, @UserRole)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@Email", userModel.Email);
                    command.Parameters.AddWithValue("@Password", userModel.Password);
                    command.Parameters.AddWithValue("@Username", userModel.Username);
                    command.Parameters.AddWithValue("@MobileNumber", userModel.MobileNumber);
                    command.Parameters.AddWithValue("@UserRole", userModel.UserRole);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok("User registered successfully");
                    else
                        return BadRequest("Failed to register user");
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while registering user");
            }
        }
        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginModel loginModel)
        {
            try
            {
                string query = "SELECT * FROM Users WHERE Email = @Email AND Password = @Password";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@Email", loginModel.Email);
                    command.Parameters.AddWithValue("@Password", loginModel.Password);

                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        reader.Read();
                        int userId = reader.GetInt32(reader.GetOrdinal("Id")); // Assuming the user ID is stored in a column called 'Id'
                        _connection.Close();
                        return Ok(new { Status = "Success", userId = userId });
                    }
                    else
                    {
                        _connection.Close();
                        return BadRequest(new { Status = "Error", Error = "Wrong Email or Password" });
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while logging in");
            }
        }
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
        [HttpPost]
        [Route("admin/login")]
        public IActionResult AuthenticateAdmin([FromBody] LoginModel login)
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
