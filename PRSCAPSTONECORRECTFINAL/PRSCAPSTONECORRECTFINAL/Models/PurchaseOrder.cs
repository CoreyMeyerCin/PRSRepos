using System.Collections.Generic;

namespace PRSCAPSTONECORRECTFINAL.Models
{
    public class PurchaseOrder
    {

        public Vendor Vendor { get; set; }
        public IEnumerable<PurchaseOrderLine> PurchaseOrderLines { get; set; }
        public decimal PoTotal { get; set; }

        public PurchaseOrder() { }
    }

}