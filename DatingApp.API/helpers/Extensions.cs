using System;
using Microsoft.AspNetCore.Http;

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


        public static int calculateAge(this DateTime theDateTime)
        {

            var age = DateTime.Today.Year - theDateTime.Year;
            if(theDateTime.AddYears(age) > DateTime.Today)
                age--;

    return age;
        }

    }
}