namespace PRSCAPSTONECORRECTFINAL.Models
{
    public class PurchaseOrderLine
    {

        public string Product { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal LineTotal { get; set; }

    }
}