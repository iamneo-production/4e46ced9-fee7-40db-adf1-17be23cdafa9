using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
<<<<<<< HEAD
=======
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
>>>>>>> b1643be60d2c9cbd1d89baa7c7f54974d63a119a

namespace dotnetapp.Controllers
{
    [ApiController]
    public class ServiceCenterController : ControllerBase
    {
<<<<<<< HEAD
=======
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public ServiceCenterController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }
        [HttpGet]
        [Route("getdetails")]
        public IActionResult GetServiceCenterDetails()
        {
            try
            {
                string query = "SELECT * FROM ServiceCenterModel";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    List<ServiceCenterModel> serviceCenters = new List<ServiceCenterModel>();

                    while (reader.Read())
                    {
                        ServiceCenterModel serviceCenter = new ServiceCenterModel
                        {
                            serviceCenterID = reader.GetInt32(reader.GetOrdinal("serviceCenterID")),
                            serviceCenterName = reader.GetString(reader.GetOrdinal("serviceCenterName")),
                            serviceCenterPhone = reader.GetString(reader.GetOrdinal("serviceCenterPhone")),
                            serviceCenterAddress = reader.GetString(reader.GetOrdinal("serviceCenterAddress")),
                            serviceCenterImageUrl = reader.GetString(reader.GetOrdinal("serviceCenterImageUrl")),
                            serviceCentermailId = reader.GetString(reader.GetOrdinal("serviceCentermailId")),
                            serviceCenterCost = reader.GetString(reader.GetOrdinal("serviceCenterCost")),
                            serviceCenterDescription = reader.GetString(reader.GetOrdinal("serviceCenterDescription"))
                        };

                        serviceCenters.Add(serviceCenter);
                    }

                    _connection.Close();
                    return Ok(new { Status = "Success", Result = serviceCenters });
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the service center details");
            }
        }
        [HttpPost]
        [Route("addServiceCenter")]
        public IActionResult AddServiceCenter(ServiceCenterModel serviceCenter)
        {
            try
            {
                string query = "INSERT INTO ServiceCenterModel (serviceCenterID, serviceCenterName, serviceCenterPhone, serviceCenterAddress, serviceCenterImageUrl, serviceCenterMailId, serviceCenterCost, serviceCenterDescription) VALUES (@serviceCenterID, @serviceCenterName, @serviceCenterPhone, @serviceCenterAddress, @serviceCenterImageUrl, @serviceCentermailId, @serviceCenterCost, @serviceCenterDescription)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@serviceCenterID", serviceCenter.serviceCenterID);
                    command.Parameters.AddWithValue("@serviceCenterName", serviceCenter.serviceCenterName);
                    command.Parameters.AddWithValue("@serviceCenterPhone", serviceCenter.serviceCenterPhone);
                    command.Parameters.AddWithValue("@serviceCenterAddress", serviceCenter.serviceCenterAddress);
                    command.Parameters.AddWithValue("@serviceCenterImageUrl", serviceCenter.serviceCenterImageUrl);
                    command.Parameters.AddWithValue("@serviceCentermailId", serviceCenter.serviceCentermailId);
                    command.Parameters.AddWithValue("@serviceCenterCost", serviceCenter.serviceCenterCost);
                    command.Parameters.AddWithValue("@serviceCenterDescription", serviceCenter.serviceCenterDescription);

                    _connection.Open();
                    command.ExecuteNonQuery();
                    _connection.Close();

                    return Ok("Service center added successfully");
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while adding the service center");
            }
        }
        [HttpGet]
        [Route("getdetails/{Id}")]
        public IActionResult GetServiceCentersById(int Id)
        {
            try
            {
                string query = "SELECT * FROM ServiceCenterModel WHERE serviceCenterID = @serviceCenterID";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@serviceCenterID", Id);

                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        ServiceCenterModel serviceCenter = new ServiceCenterModel
                        {
                            serviceCenterID = reader.GetInt32(reader.GetOrdinal("serviceCenterID")),
                            serviceCenterName = reader.GetString(reader.GetOrdinal("serviceCenterName")),
                            serviceCenterPhone = reader.GetString(reader.GetOrdinal("serviceCenterPhone")),
                            serviceCenterAddress = reader.GetString(reader.GetOrdinal("serviceCenterAddress")),
                            serviceCenterImageUrl = reader.GetString(reader.GetOrdinal("serviceCenterImageUrl")),
                            serviceCentermailId = reader.GetString(reader.GetOrdinal("serviceCentermailId")),
                            serviceCenterCost = reader.GetString(reader.GetOrdinal("serviceCenterCost")),
                            serviceCenterDescription = reader.GetString(reader.GetOrdinal("serviceCenterDescription"))
                        };

                        _connection.Close();
                        return Ok(new { Status = "Success", Result = serviceCenter });
                    }
                    else
                    {
                        _connection.Close();
                        return NotFound(new { Status = "Error", Error = "Service center not found" });
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the service center");
            }
        }
        [HttpGet]
        [Route("viewServiceCenter/{serviceCenterId}")]
        public IActionResult ViewServiceCenter(int serviceCenterId)
        {
            try
            {
                string query = "SELECT * FROM ServiceCenterModel WHERE serviceCenterID = @serviceCenterID";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@serviceCenterID", serviceCenterId);

                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        reader.Read();
                        var serviceCenter = new ServiceCenterModel
                        {
                            serviceCenterID = reader.GetInt32(reader.GetOrdinal("serviceCenterID")),
                            serviceCenterName = reader.GetString(reader.GetOrdinal("serviceCenterName")),
                            serviceCenterPhone = reader.GetString(reader.GetOrdinal("serviceCenterPhone")),
                            serviceCenterAddress = reader.GetString(reader.GetOrdinal("serviceCenterAddress")),
                            serviceCenterImageUrl = reader.GetString(reader.GetOrdinal("serviceCenterImageUrl")),
                            serviceCentermailId = reader.GetString(reader.GetOrdinal("serviceCentermailId")),
                            serviceCenterCost = reader.GetString(reader.GetOrdinal("serviceCenterCost")),
                            serviceCenterDescription = reader.GetString(reader.GetOrdinal("serviceCenterDescription"))
                        };

                        _connection.Close();
                        return Ok(serviceCenter);
                    }
                    else
                    {
                        _connection.Close();
                        return NotFound("Service center not found");
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the service center");
            }
        }

        [HttpDelete]
        [Route("deleteServiceCenter/{serviceCenterId}")]
        public IActionResult DeleteServiceCenter(int serviceCenterId)
        {
            try
            {
                string query = "DELETE FROM ServiceCenterModel WHERE serviceCenterID = @Id";

                using (SqlCommand command = new SqlCommand(query, _connection))
            {
                command.Parameters.AddWithValue("@Id", serviceCenterId);
                _connection.Open();
                int rowsAffected = command.ExecuteNonQuery();
                _connection.Close();

                if (rowsAffected > 0)
                {
                    return Ok("Service center deleted successfully");
                }
                else
                {
                    return NotFound("Service center not found");
                }
            }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the service center");
            }
        }
        [HttpPut]
        [Route("editServiceCenter/{id}")]
        public IActionResult EditServiceCenter(int id, [FromBody] ServiceCenterModel ServiceCenter)
        {
            try
            {
                string query = "UPDATE ServiceCenterModel SET " +
                               "serviceCenterName = @serviceCenterName, " +
                               "serviceCenterPhone = @serviceCenterPhone, " +
                               "serviceCenterAddress = @serviceCenterAddress, " +
                               "serviceCenterImageUrl = @serviceCenterImageUrl, " +
                               "serviceCentermailId = @serviceCentermailId, " +
                               "serviceCenterCost = @serviceCenterCost, " +
                               "serviceCenterDescription = @serviceCenterDescription " +
                               "WHERE serviceCenterID = @serviceCenterID";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@serviceCenterID", id);
                    command.Parameters.AddWithValue("@serviceCenterName", ServiceCenter.serviceCenterName);
                    command.Parameters.AddWithValue("@serviceCenterPhone", ServiceCenter.serviceCenterPhone);
                    command.Parameters.AddWithValue("@serviceCenterAddress", ServiceCenter.serviceCenterAddress);
                    command.Parameters.AddWithValue("@serviceCenterImageUrl", ServiceCenter.serviceCenterImageUrl);
                    command.Parameters.AddWithValue("@serviceCentermailId", ServiceCenter.serviceCentermailId);
                    command.Parameters.AddWithValue("@serviceCenterCost", ServiceCenter.serviceCenterCost);
                    command.Parameters.AddWithValue("@serviceCenterDescription", ServiceCenter.serviceCenterDescription);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                    {
                        return Ok("Service center updated successfully");
                    }
                    else
                    {
                        return NotFound("Service center not found");
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the service center");
            }
        }
>>>>>>> b1643be60d2c9cbd1d89baa7c7f54974d63a119a
        BusinessLayer dal = new BusinessLayer();
        [HttpGet]
        [Route("admin/getservicecenter")]
        public List<ServiceCenterModel> getServices()
        { 
            return(dal.getServices());
        }
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> b1643be60d2c9cbd1d89baa7c7f54974d63a119a
