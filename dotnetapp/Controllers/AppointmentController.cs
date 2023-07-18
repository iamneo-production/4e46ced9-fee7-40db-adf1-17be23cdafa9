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
using Newtonsoft.Json.Linq;

namespace dotnetapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public AppointmentController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }

        [HttpPost("addproduct")]
        public async Task<IActionResult> AddProduct([FromBody] ProductModel product)
        {
            try
            {
                using SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));

                await connection.OpenAsync();

                {
                    string checkSlotQuery = "SELECT * FROM ProductModel WHERE availableSlots = @selectedSlot AND serviceCenterID = @serviceCenterID";
                    using (SqlCommand checkSlotCommand = new(checkSlotQuery, connection))
                    {
                        checkSlotCommand.Parameters.AddWithValue("@selectedSlot", product.selectedSlot);
                        checkSlotCommand.Parameters.AddWithValue("@serviceCenterID", product.serviceCenterID);

                        using (SqlDataReader checkSlotReader = await checkSlotCommand.ExecuteReaderAsync())
                        {
                            if (checkSlotReader.HasRows)
                            {
                                return BadRequest(new { error = "Slot already booked" });
                            }
                        }
                    }

                    string insertQuery = @"INSERT INTO ProductModel (productName,productModelNo,dateOfPurchase,contactNumber,problemDescription,availableSlots,serviceCenterID,userID)
                    VALUES (@productName,@productModelNo,@dateOfPurchase,@contactNumber,@problemDescription,@availableSlots,@serviceCenterID,@userID); ";

                    using (SqlCommand insertCommand = new SqlCommand(insertQuery, connection))
                    {
                        insertCommand.Parameters.AddWithValue("@productName", product.productName);
                        insertCommand.Parameters.AddWithValue("@productModelNo", product.productModelNo);
                        insertCommand.Parameters.AddWithValue("@dateOfPurchase", product.dateOfPurchase);
                        insertCommand.Parameters.AddWithValue("@contactNumber", product.contactNumber);
                        insertCommand.Parameters.AddWithValue("@problemDescription", product.problemDescription);
                        insertCommand.Parameters.AddWithValue("@availableSlots", product.selectedSlot);
                        insertCommand.Parameters.AddWithValue("@serviceCenterID", product.serviceCenterID);
                        insertCommand.Parameters.AddWithValue("@userID", product.userID);

                        await insertCommand.ExecuteNonQueryAsync();
                    }

                    return Ok(new { message = "Product and slot booked successfully" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal Server Error", message = ex.Message });
            }
        }


        [HttpGet("getdetails")]
        public async Task<IActionResult> GetProductDetails(string UserID)
        {
            try
            {
                // var authenticatedUserId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("myconnstring")))
                {
                    await connection.OpenAsync();

                    string selectQuery = @"
                SELECT p.ID, p.productName, p.productModelNo, p.dateOfPurchase, p.contactNumber, p.problemDescription, p.availableSlots, p.serviceCenterID,p.userID, s.serviceCenterName
                FROM ProductModel p
                JOIN ServiceCenterModel s ON p.serviceCenterID = s.serviceCenterID
                where userID=@UserID
            ";

                    using (SqlCommand command = new(selectQuery, connection))
                    {
                        command.Parameters.AddWithValue("@UserID", UserID);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            List<ProductModel> products = new List<ProductModel>();

                            while (reader.Read())
                            {
                                ProductModel product = new ProductModel
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("ID")),
                                    userID = reader.GetInt32(reader.GetOrdinal("userID")),

                                    productName = reader.GetString(reader.GetOrdinal("productName")),
                                    productModelNo = reader.GetString(reader.GetOrdinal("productModelNo")),
                                    dateOfPurchase = reader.GetString(reader.GetOrdinal("dateOfPurchase")),
                                    contactNumber = reader.GetString(reader.GetOrdinal("contactNumber")),
                                    problemDescription = reader.GetString(reader.GetOrdinal("problemDescription")),
                                    availableSlots = reader.GetString(reader.GetOrdinal("availableSlots")),
                                    serviceCenterID = reader.GetInt32(reader.GetOrdinal("serviceCenterID")),
                                    serviceCenterName = reader.GetString(reader.GetOrdinal("serviceCenterName"))
                                };

                                products.Add(product);
                            }

                            return Ok(new { Status = "Success", Result = products });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = "Failed to fetch product details.", Error = ex.Message });
            }
        }

        [HttpDelete("delete/{ID}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                using (SqlConnection connection = new(_configuration.GetConnectionString("myconnstring")))
                {
                    await connection.OpenAsync();

                    string deleteQuery = @"DELETE FROM ProductModel WHERE ID = @ID;";

                    using (SqlCommand command = new(deleteQuery, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);

                        await command.ExecuteNonQueryAsync();
                    }

                    return Ok(new { Status = "Success", Message = "Product deleted successfully." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = "Failed to delete product.", Error = ex.Message });
            }
        }


        [HttpGet("getdetails/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("myconnstring")))
                {
                    await connection.OpenAsync();

                    string selectQuery = @"
                SELECT p.ID, p.productName, p.productModelNo, p.dateOfPurchase, p.contactNumber, p.problemDescription, p.availableSlots, p.serviceCenterID, s.serviceCenterName
                FROM ProductModel p
                JOIN ServiceCenterModel s ON p.serviceCenterID = s.serviceCenterID
                WHERE p.ID = @id
            ";

                    using (SqlCommand command = new SqlCommand(selectQuery, connection))
                    {
                        command.Parameters.AddWithValue("@ID", id);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.Read())
                            {
                                ProductModel product = new ProductModel
                                {
                                    ID = reader.GetInt32(reader.GetOrdinal("Id")),
                                    productName = reader.GetString(reader.GetOrdinal("productName")),

                                    productModelNo = reader.GetString(reader.GetOrdinal("productModelNo")),
                                    dateOfPurchase = reader.GetString(reader.GetOrdinal("dateOfPurchase")),
                                    contactNumber = reader.GetString(reader.GetOrdinal("contactNumber")),
                                    problemDescription = reader.GetString(reader.GetOrdinal("problemDescription")),
                                    availableSlots = reader.GetString(reader.GetOrdinal("availableSlots")),
                                    // selectedSlot = reader.GetString(reader.GetOrdinal("selectedSlot")),
                                    serviceCenterID = reader.GetInt32(reader.GetOrdinal("serviceCenterID")),
                                    serviceCenterName = reader.GetString(reader.GetOrdinal("serviceCenterName"))

                                };

                                return Ok(new { Status = "Success", Result = product });
                            }
                            else
                            {
                                return NotFound(new { Status = "Error", Message = "Product not found" });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = "Failed to fetch product details.", Error = ex.Message });
            }
        }

        [HttpDelete("deleteMultiple")]
        public async Task<IActionResult> DeleteMultipleProducts([FromBody] JObject requestData)
        {
            try
            {
                if (requestData.TryGetValue("bookingIDs", out JToken bookingIDsToken))
                {
                    if (bookingIDsToken is JArray bookingIDsArray)
                    {
                        List<int> bookingIDs = bookingIDsArray.Select(id => id.Value<int>()).ToList();

                        using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("myconnstring")))
                        {
                            await connection.OpenAsync();

                            string deleteQuery = @"
                        DELETE FROM ProductModel WHERE ID IN ({@IDs});
                    ";

                            string idParams = string.Join(',', bookingIDs);

                            string formattedQuery = deleteQuery.Replace("{@IDs}", idParams);

                            using (SqlCommand command = new SqlCommand(formattedQuery, connection))
                            {
                                await command.ExecuteNonQueryAsync();
                            }

                            return Ok(new { Status = "Success", Message = "Products deleted successfully." });
                        }
                    }
                }

                return BadRequest(new { Status = "Error", Message = "Invalid bookingIDs format." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = "Failed to delete products.", Error = ex.Message });
            }
        }
        [HttpGet("checkSlotAvailability/{selectedSlot}/{id}")]
        public async Task<IActionResult> CheckSlotAvailability(string selectedSlot, int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("myconnstring")))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM ProductModel WHERE availableSlots = @selectedSlot AND ID != @id";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@selectedSlot", selectedSlot);
                        command.Parameters.AddWithValue("@id", id);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                return Ok(new { Status = "Error", Message = "Slot is already booked. Please select another slot." });
                            }
                            else
                            {
                                return Ok(new { Status = "Success" });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = "Error checking slot availability", Error = ex.Message });
            }
        }

        [HttpPut("updateBooking/{id}")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] ProductModel product)
        {
            try
            {
                using SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));

                await connection.OpenAsync();


                string updateQuery = @"UPDATE ProductModel SET
                            productName = @productName,
                            productModelNo = @productModelNo,
                            dateOfPurchase = @dateOfPurchase,
                            contactNumber = @contactNumber,
                            problemDescription = @problemDescription,
                            availableSlots = @availableSlots
                            WHERE id = @id ;";

                using (SqlCommand updateCommand = new SqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@productName", product.productName);
                    updateCommand.Parameters.AddWithValue("@productModelNo", product.productModelNo);
                    updateCommand.Parameters.AddWithValue("@dateOfPurchase", product.dateOfPurchase);
                    updateCommand.Parameters.AddWithValue("@contactNumber", product.contactNumber);
                    updateCommand.Parameters.AddWithValue("@problemDescription", product.problemDescription);
                    updateCommand.Parameters.AddWithValue("@availableSlots", product.selectedSlot);
                    updateCommand.Parameters.AddWithValue("@id", id);
                    updateCommand.Parameters.AddWithValue("@serviceCenterID", product.serviceCenterID);

                    int rowsAffected = await updateCommand.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { message = "Booking updated successfully" });
                    }
                    else
                    {
                        return NotFound(new { error = "Booking not found mcr " });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal Server Error", message = ex.Message });
            }
        }

        [HttpGet("generateBill/{id}")]
        public async Task<IActionResult> GenerateBill(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("myconnstring")))
                {
                    await connection.OpenAsync();

                    string selectQuery = @"
                SELECT p.ID as ProductID, p.productName, p.productModelNo, p.dateOfPurchase, p.contactNumber, p.problemDescription, p.availableSlots,p.userID, p.serviceCenterID, s.serviceCenterName,s.serviceCenterPhone, s.serviceCenterCost,s.serviceCenterAddress, u.Email as UserEmail
                FROM ProductModel p
                JOIN ServiceCenterModel s ON p.serviceCenterID = s.serviceCenterID
                JOIN Users u ON p.userID = u.Id
                WHERE p.ID = @id
            ";

                    using (SqlCommand command = new SqlCommand(selectQuery, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.Read())
                            {
                                // Extract the required fields from the SqlDataReader
                                int productID = reader.GetInt32(reader.GetOrdinal("ProductID"));
                                string productName = reader.GetString(reader.GetOrdinal("productName"));
                                string productModelNo = reader.GetString(reader.GetOrdinal("productModelNo"));
                                string dateOfPurchase = reader.GetString(reader.GetOrdinal("dateOfPurchase"));
                                string contactNumber = reader.GetString(reader.GetOrdinal("contactNumber"));
                                string problemDescription = reader.GetString(reader.GetOrdinal("problemDescription"));
                                string availableSlots = reader.GetString(reader.GetOrdinal("availableSlots"));
                                string serviceCenterName = reader.GetString(reader.GetOrdinal("serviceCenterName"));
                                string serviceCenterCost = reader.GetString(reader.GetOrdinal("serviceCenterCost"));
                                string serviceCenterAddress = reader.GetString(reader.GetOrdinal("serviceCenterAddress"));
                                string serviceCenterPhone = reader.GetString(reader.GetOrdinal("serviceCenterPhone"));

                                int userID = reader.GetInt32(reader.GetOrdinal("userID"));


                                string userEmail = reader.GetString(reader.GetOrdinal("UserEmail"));


                                // Create a bill object or format the data as needed
                                var bill = new BillModel
                                {
                                    BillID = productID,
                                    ProductName = productName,
                                    ProductModelNo = productModelNo,
                                    DateOfPurchase = dateOfPurchase,
                                    ContactNumber = contactNumber,
                                    ProblemDescription = problemDescription,
                                    AvailableSlots = availableSlots,
                                    ServiceCenterName = serviceCenterName,
                                    ServiceCenterCost = serviceCenterCost,
                                    UserEmail = userEmail,
                                    serviceCenterAddress = serviceCenterAddress,
                                    userID = userID,
                                    serviceCenterPhone = serviceCenterPhone

                                };

                                return Ok(bill);
                            }
                            else
                            {
                                return NotFound(new { error = "Product not found" });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal Server Error", message = ex.Message });
            }
        }



    }
}