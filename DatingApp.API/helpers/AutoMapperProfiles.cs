using AutoMapper;
using DatingApp.API.models;

using DatingApp.API.Dtos;
using System.Linq;

namespace DatingApp.API.helpers
{
     public class AutoMapperProfiles: Profile
    {


        public AutoMapperProfiles()
        {

            CreateMap<User, UserForListDto>()
            .ForMember(dest=> dest.PhotoUrl, opt =>{
                opt.MapFrom(src=>src.Photos.FirstOrDefault(p=> p.IsMain).Url);
            })
            .ForMember(dest => dest.age, opt =>{
                opt.ResolveUsing(d => d.DateOfBirth.calculateAge());
            });


            CreateMap<User, UserForDetailsDto>().ForMember(dest=> dest.PhotoUrl, opt =>{
                opt.MapFrom(src=>src.Photos.FirstOrDefault(p=> p.IsMain).Url);
            }).ForMember(dest => dest.age, opt =>{
                opt.ResolveUsing(d => d.DateOfBirth.calculateAge());
            });;


            
            CreateMap<Photo, PhotosForDetailsDto>();
            CreateMap<UserForUpdateDto, User>();

            CreateMap<PhotoForReturnDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();

            CreateMap<Photo, PhotoForCreationDto>().ReverseMap();
            CreateMap<UserForRegisterDto, User>();
            
            CreateMap<MessageForCreationDto, Message>();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => 
                     opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt =>
                     opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));







        }


    }


}