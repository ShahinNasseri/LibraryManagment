using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatepermissionsrelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_PermissionID",
                table: "UserPermissions",
                column: "PermissionID");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPermissions_Permissions_PermissionID",
                table: "UserPermissions",
                column: "PermissionID",
                principalTable: "Permissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserPermissions_Users_UserID",
                table: "UserPermissions",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPermissions_Permissions_PermissionID",
                table: "UserPermissions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserPermissions_Users_UserID",
                table: "UserPermissions");

            migrationBuilder.DropIndex(
                name: "IX_UserPermissions_PermissionID",
                table: "UserPermissions");
        }
    }
}
