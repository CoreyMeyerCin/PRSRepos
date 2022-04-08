using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PRSCAPSTONECORRECTFINAL.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(32)]
        public string PartNbr { get; set; }
        [Required]
        [StringLength(32)]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "decimal(9,2)")]
        public double Price { get; set; }
        [Required]
        [StringLength(32)]
        public string Unit { get; set; }
        [StringLength(255)]
        public string PhotoPath { get; set; }

        public int VendorId { get; set; }
        public virtual Vendor Vendor { get; set; }


        public Product()
        {
            
        }
    }
}