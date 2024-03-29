using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace RasketMaterial.Models.DTOs;

public class UserProfileDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }

    public string UserName { get; set; }
    public List<string> Roles { get; set; }
    public bool IsAdmin { get; set; }
    public string ProfileImage { get; set; }
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<Event> Events { get; set; }


}
