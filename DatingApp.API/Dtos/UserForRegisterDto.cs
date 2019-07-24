using System.ComponentModel.DataAnnotations;
using System;


namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        
        [Required]
        public string Username { get; set;}

        [Required]
        [StringLength(16, MinimumLength = 6, ErrorMessage ="La contraseña tiene que contener entre 6 y 16 caracteres")]
        public string Password { get; set;}

        [Required]
        public string Gender { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string KnowAs { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }
        
        
 
        public UserForRegisterDto(){

            Created = DateTime.Now;
            LastActive = DateTime.Now;

        }


    }
}