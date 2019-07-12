using System;

namespace DatingApp.API.Dtos
{
    public class PhotosForDetailsDto
    {

        public int id { get; set; }
        public string PhotoUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
 

        
    }
}