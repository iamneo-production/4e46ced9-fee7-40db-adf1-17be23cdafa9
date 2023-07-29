using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ServiceCenterModel
    {
        public int serviceCenterID {get; set;}
        public string serviceCenterName {get; set;}
        public string serviceCenterPhone {get; set;}
        public string serviceCenterAddress {get; set;}
        public string serviceCenterImageUrl { get; set; }
        public string serviceCentermailId { get; set; }
        public string serviceCenterCost { get; set; }
        public string serviceCenterDescription { get; set; }
    }
}

