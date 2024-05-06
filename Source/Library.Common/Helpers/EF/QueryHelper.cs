using Library.Common.DTOs.AdminManagment.Requests;
using Library.Common.DTOs.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Library.Common.Helpers.EF
{
    public static class QueryHelper
    {
        /// <summary>
        /// Applies pagination dynamically to any queryable source.
        /// </summary>
        /// <typeparam name="T">The type of the queryable source.</typeparam>
        /// <param name="source">The source queryable to paginate.</param>
        /// <param name="pageIndex">1-based index of the page to retrieve.</param>
        /// <param name="pageSize">Number of items per page.</param>
        /// <returns>Paginated queryable source.</returns>
        public static IQueryable<T> Paginate<T>(this IQueryable<T> source, int? pageIndex, int? pageSize)
        {
            if (!pageIndex.HasValue || pageIndex.Value < 1)
                pageIndex = 1;  // Ensure page index is at least 1

            if (!pageSize.HasValue || pageSize.Value < 1)
                pageSize = 10;  // Default to 10 items per page if not specified or invalid

            int skipAmount = (pageIndex.Value - 1) * pageSize.Value;
            return source.Skip(skipAmount).Take(pageSize.Value);
        }
        public static IQueryable<T> AddSorting<T>(this IQueryable<T> query, EntityList request)
        {
            var propertyInfo = typeof(T).GetProperty(request.ColumnOrder, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (propertyInfo != null)
            {
                var parameter = Expression.Parameter(typeof(T), "b");
                var propertyAccess = Expression.MakeMemberAccess(parameter, propertyInfo);
                var orderByExp = Expression.Lambda(propertyAccess, parameter);

                query = request.SortOrder == SortOrder.Ascending ?
                        query.Provider.CreateQuery<T>(Expression.Call(typeof(Queryable), "OrderBy", [typeof(T), propertyInfo.PropertyType],
                            query.Expression, Expression.Quote(orderByExp))) :
                        query.Provider.CreateQuery<T>(Expression.Call(typeof(Queryable), "OrderByDescending", [typeof(T), propertyInfo.PropertyType],
                            query.Expression, Expression.Quote(orderByExp)));
            }

            return query;
        }
    }
}
