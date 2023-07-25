using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using dotnetapp.Models;

namespace dotnetapp
{
    internal class DataAccessLayer
    {
        SqlConnection con = new SqlConnection("User ID =sa;password=examlyMssql@123;server=localhost;Database=cameraservice;trusted_connection=false;Persist Security Info =False;Encrypt=False");
        SqlCommand cmd = null;
        SqlDataAdapter adapter = null;
        SqlDataReader dr = null;
        internal string SaveUser(UserModel user)
        {
            cmd = new SqlCommand("select * from Users where Email = '" + user.Email + "'", con);
            con.Open();
            dr = cmd.ExecuteReader();

            if (dr.HasRows)
            {
                con.Close();
                return "false";
            }
            else
            {
                con.Close();
                cmd = new SqlCommand("insert into Users Values('" + user.Email + "','" + user.Password + "','" + user.Username + "'," +
                    "'" + user.MobileNumber + "','"+user.UserRole+"') ", con);
                con.Open();
                int rowsaffected = cmd.ExecuteNonQuery();
                con.Close();
                
                if (rowsaffected > 0)
                {
                    return "true";
                }
                else
                {
                    return "false";
                }
            }
        }
        internal string SaveAdmin(AdminModel admin)
        {
            cmd = new SqlCommand("select * from Users where Email = '" + admin.Email + "'", con);
            con.Open();
            dr = cmd.ExecuteReader();

            if (dr.HasRows)
            {
                con.Close();
                return "false";
            }
            else
            {
                con.Close();
                cmd = new SqlCommand("insert into Users Values('" + admin.Email + "','" + admin.Password + "','" + admin.Username + "', '" + admin.MobileNumber + "','"+admin.UserRole+"') ", con);
                con.Open();
                int rowsaffected = cmd.ExecuteNonQuery();
                con.Close();
                
                if (rowsaffected > 0)
                {
                    return "true";
                }
                else
                {
                    return "false";
                }
            }
        }
        public List<ServiceCenterModel> getServices()
        {
            List<ServiceCenterModel> services = new List<ServiceCenterModel>();

            using (SqlConnection con = new SqlConnection("User ID =sa;password=examlyMssql@123;server=localhost;Database=cameraservice;trusted_connection=false;Persist Security Info =False;Encrypt=False"))
            {
                con.Open();
                string query = "SELECT * FROM ServiceCenterModel";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            ServiceCenterModel service = new ServiceCenterModel
                            {
                                serviceCenterID = (int)reader["serviceCenterID"],
                                serviceCenterName = reader["serviceCenterName"].ToString(),
                                serviceCenterPhone = reader["serviceCenterPhone"].ToString(),
                                serviceCenterImageUrl = reader["serviceCenterImageUrl"].ToString(),
                                
                            };

                            services.Add(service);
                        }
                    }
                }
            }
            return services;
        }
         internal bool AuthenticateUser(string email, string password)
        {
            using (SqlConnection con = new SqlConnection("User ID =sa;password=examlyMssql@123;server=localhost;Database=cameraservice;trusted_connection=false;Persist Security Info =False;Encrypt=False"))
            {
                con.Open();

                string query = "SELECT * FROM Users WHERE Email = @Email AND Password = @Password";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@Password", password);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        return reader.HasRows;
                    }
                }
            }
        }
        internal bool AuthenticateAdmin(string email, string password)
        {
            using (SqlConnection con = new SqlConnection("User ID =sa;password=examlyMssql@123;server=localhost;Database=cameraservice;trusted_connection=false;Persist Security Info =False;Encrypt=False"))
            {
                con.Open();

                string query = "SELECT * FROM Users WHERE Email = @Email AND Password = @Password";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@Password", password);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        return reader.HasRows;
                    }
                }
            }
        }
    }
}
