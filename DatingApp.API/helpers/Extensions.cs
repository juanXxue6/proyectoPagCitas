using System;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.helpers
{
    public static class Extensions
    {
        
            public static void AddAplicationError(this HttpResponse response, string message)
            {

                response.Headers.Add("application-Error", message);
                response.Headers.Add("Access-control-Expose-Headers", "Aplication-Error");
                response.Headers.Add("Access-control-Allow-oRIGIN", "*");
                

            }

        public static void AddPagination (this HttpResponse response, int currentPage, int itemsPerPage, 
            int totalItems, int totalPages)
            {
        
                
                var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
                var camelCoseFormatter = new JsonSerializerSettings();
                camelCoseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();

                
                response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCoseFormatter));
                response.Headers.Add("Access-control-Expose-Headers", "Pagination");


            }



        public static int calculateAge(this DateTime theDateTime)
        {

            var age = DateTime.Today.Year - theDateTime.Year;
            if(theDateTime.AddYears(age) > DateTime.Today)
                age--;

    return age;
        }

    }
}