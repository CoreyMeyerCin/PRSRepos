using System.ComponentModel.DataAnnotations;

namespace PRSCAPSTONECORRECTFINAL.Models
{
    public class Vendor
    {
        public int Id { get; set; }
        private static int NextId { get; set; }
        [Required]
        [StringLength(32)]
        public string Code { get; set; }
        [Required]
        [StringLength(32)]
        public string Name { get; set; }
        [Required]
        [StringLength(64)]
        public string Address { get; set; }
        [Required]
        [StringLength(32)]
        public string City { get; set; }
        [Required]
        [StringLength(2)]
        public string State { get; set; }
        [Required]
        [StringLength(5)]
        public string Zip { get; set; }
        [Required]
        [StringLength(12)]
        public string Phone { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }


        public Vendor()
        {
            Id = ++NextId;
        }
    }
}