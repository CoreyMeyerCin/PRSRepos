using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRSCAPSTONECORRECTFINAL.Models;

namespace PRSCAPSTONECORRECTFINAL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VendorsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("purchaseOrder/{vendorId}")]
        public async Task<ActionResult<PurchaseOrder>> CreatePurchaseOrder(int vendorId)
        {
            var vendor = await _context.Vendors.FindAsync(vendorId);

            var query = (from v in _context.Vendors
                         join p in _context.Products
                         on v.Id equals p.VendorId
                         join rl in _context.RequestLines
                         on p.Id equals rl.ProductId
                         join r in _context.Requests
                         on rl.RequestId equals r.Id
                         where r.Status == "APPROVED"
                         && v.Id == vendorId
                         select new
                         {
                             p.Id,
                             Product = p.Name,
                             rl.Quantity,
                             p.Price,
                             LineTotal = p.Price * rl.Quantity
                         });

            var sortedLines = new SortedList<int, PurchaseOrderLine>();
            foreach (var q in query)
            {
                if (!sortedLines.ContainsKey(q.Id))
                {
                    var purchaseOrderLine = new PurchaseOrderLine()
                    {
                        Product = q.Product,
                        Quantity = 0,
                        Price = (decimal)q.Price,
                        LineTotal = (decimal)q.LineTotal
                    };
                    sortedLines.Add(q.Id, purchaseOrderLine);
                }
                sortedLines[q.Id].Quantity += q.Quantity;
                sortedLines[q.Id].LineTotal = sortedLines[q.Id].Quantity * sortedLines[q.Id].Price;
            }



            var sumOfLines = sortedLines.Values.Sum(x => x.LineTotal);

            var returnThis = new PurchaseOrder()
            {
                Vendor = vendor,
                PurchaseOrderLines = (IEnumerable<PurchaseOrderLine>)sortedLines,
                PoTotal = sumOfLines
            };
            return returnThis;
        }

        // GET: api/Vendors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendors()
        {
            return await _context.Vendors.ToListAsync();
        }

        // GET: api/Vendors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vendor>> GetVendor(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);

            if (vendor == null)
            {
                return NotFound();
            }

            return vendor;
        }

        // PUT: api/Vendors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendor(int id, Vendor vendor)
        {
            if (id != vendor.Id)
            {
                return BadRequest();
            }

            _context.Entry(vendor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Vendors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vendor>> PostVendor(Vendor vendor)
        {
            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVendor", new { id = vendor.Id }, vendor);
        }

        // DELETE: api/Vendors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendor(int id)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
            {
                return NotFound();
            }

            _context.Vendors.Remove(vendor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendorExists(int id)
        {
            return _context.Vendors.Any(e => e.Id == id);
        }
    }
}
