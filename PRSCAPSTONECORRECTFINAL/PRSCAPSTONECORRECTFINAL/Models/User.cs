using System.ComponentModel.DataAnnotations;

namespace PRSCAPSTONECORRECTFINAL.Models
{
    public class User
    {
        public int Id { get; set; }
        private static int NextId { get; set; }
        [Required]
        [StringLength(32)]
        public string Username { get; set; }
        [Required]
        [StringLength(32)]
        public string Password { get; set; }
        [Required]
        [StringLength(32)]
        public string Firstname { get; set; }
        [Required]
        [StringLength(32)]
        public string Lastname { get; set; }
        [Required]
        [StringLength(12)]
        public string Phone { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        public bool isReviewer { get; set; }
        public bool isAdmin { get; set; }


        public User()
        {
            Id = ++NextId;
        }
    }
}