using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class BillModel
    {
        public int BillID { get; set; }
        public string ProductName { get; set; }
        public string ProductModelNo { get; set; }
        public string DateOfPurchase { get; set; }
        public string ContactNumber { get; set; }
        public string ProblemDescription { get; set; }
        public string AvailableSlots { get; set; }
        public string ServiceCenterName { get; set; }
        public string ServiceCenterCost { get; set; }
        public string UserEmail { get; set; }

        public string serviceCenterAddress { get; set; }
        public string serviceCenterPhone { get; set; }
        public int userID { get; set; }

    }
}