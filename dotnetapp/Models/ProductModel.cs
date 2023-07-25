using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ProductModel
    {
        public string? selectedSlot { get; set; }
        internal int serviceCenterId;
        public int ID { get; set; }
        public string? productName { get; set; }
        public int serviceCenterID { get; set; }
        public string? productModelNo { get; set; }
        public string? dateOfPurchase { get; set; }
        public string? contactNumber { get; set; }
        public string? problemDescription { get; set; }
        public string? availableSlots { get; set; }
        public string? serviceCenterName { get; set; }
        public int userID { get; set; }

    }
}