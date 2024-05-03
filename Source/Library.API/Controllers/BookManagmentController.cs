using Library.API.Models;
using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.BookManagment.Requests;
using Library.Common.DTOs.Commons;
using Library.Core.Domain.Entities;
using Library.Core.Interfaces.Services;
using Library.Core.Services.BookManagment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BookManagmentController : BaseController
    {
        private IBookManagmentService _bookManagmentService { get; set; }

        public BookManagmentController(IBookManagmentService bookManagmentService)
        {
            _bookManagmentService = bookManagmentService;
        }

        [HttpPost]
        public async Task<ApiResult> InsertBook([FromBody] InsertBookRequest request)
        {
            await _bookManagmentService.InsertBook(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult> RemoveBook([FromBody] EntityIds request)
        {
            await _bookManagmentService.RemoveBook(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult> BorrowBook([FromBody] BorrowBookRequest request)
        {
            await _bookManagmentService.BorrowBook(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult> ReturnedBook([FromBody] ReturnBookRequest request)
        {
            await _bookManagmentService.ReturnedBook(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult> UpdateBook([FromBody] UpdateBookRequest request)
        {
            await _bookManagmentService.UpdateBook(request);
            return new ApiResult(null);
        }


        [HttpPost]
        public async Task<ApiResult> GetLoanList([FromBody] GetLoanList request)
        {
            await _bookManagmentService.GetLoanList(request);
            return new ApiResult(null);
        }

        [HttpPost]
        public async Task<ApiResult<Book>> GetBookList([FromBody] GetBooksList request)
        {
            var res = await _bookManagmentService.GetBookList(request);
            return new ApiResult<Book>(res);
        }
    }
}
