using Microsoft.EntityFrameworkCore.Migrations;

namespace PRSCAPSTONECORRECTFINAL.Migrations
{
    public partial class testing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Vendor_VendorId",
                table: "Product");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestLines_Product_ProductId",
                table: "RequestLines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendor",
                table: "Vendor");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.RenameTable(
                name: "Vendor",
                newName: "Vendors");

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "Products");

            migrationBuilder.RenameIndex(
                name: "IX_Vendor_Id",
                table: "Vendors",
                newName: "IX_Vendors_Id");

            migrationBuilder.RenameIndex(
                name: "IX_Vendor_Code",
                table: "Vendors",
                newName: "IX_Vendors_Code");

            migrationBuilder.RenameIndex(
                name: "IX_Product_VendorId",
                table: "Products",
                newName: "IX_Products_VendorId");

            migrationBuilder.RenameIndex(
                name: "IX_Product_PartNbr",
                table: "Products",
                newName: "IX_Products_PartNbr");

            migrationBuilder.RenameIndex(
                name: "IX_Product_Id",
                table: "Products",
                newName: "IX_Products_Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Vendors_VendorId",
                table: "Products",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RequestLines_Products_ProductId",
                table: "RequestLines",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Vendors_VendorId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestLines_Products_ProductId",
                table: "RequestLines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "Vendors",
                newName: "Vendor");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Product");

            migrationBuilder.RenameIndex(
                name: "IX_Vendors_Id",
                table: "Vendor",
                newName: "IX_Vendor_Id");

            migrationBuilder.RenameIndex(
                name: "IX_Vendors_Code",
                table: "Vendor",
                newName: "IX_Vendor_Code");

            migrationBuilder.RenameIndex(
                name: "IX_Products_VendorId",
                table: "Product",
                newName: "IX_Product_VendorId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_PartNbr",
                table: "Product",
                newName: "IX_Product_PartNbr");

            migrationBuilder.RenameIndex(
                name: "IX_Products_Id",
                table: "Product",
                newName: "IX_Product_Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendor",
                table: "Vendor",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Vendor_VendorId",
                table: "Product",
                column: "VendorId",
                principalTable: "Vendor",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RequestLines_Product_ProductId",
                table: "RequestLines",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
