using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PRSCAPSTONECORRECTFINAL.Models
{
    public class Request
    {
        public int Id { get; set; }
        private static int NextId { get; set; }
        [Required]
        [StringLength(100)]
        public string Description { get; set; }
        [Required]
        [StringLength(100)]
        public string Justification { get; set; }
        [Required]
        [StringLength(20)]
        public string DeliveryMode { get; set; } = "Pickup";
        [Required]
        [StringLength(10)]
        public string Status { get; set; } = "NEW";
        [Required]
        [Column(TypeName = "decimal(9,2)")]
        public double Total { get; set; } = 0;

        public int UserId { get; set; }
        
        public virtual User User { get; set; }

        public virtual IEnumerable<RequestLine> RequestLines { get; set; }


        public Request()
        {
            Id = ++NextId;
        }
    }
}