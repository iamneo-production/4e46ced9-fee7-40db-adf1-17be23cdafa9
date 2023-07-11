using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class ServiceCenterController : ControllerBase
    {
        BusinessLayer dal = new BusinessLayer();
        [HttpGet]
        [Route("admin/getservicecenter")]
        public List<ServiceCenterModel> getServices()
        { 
            return(dal.getServices());
        }
    }
}
