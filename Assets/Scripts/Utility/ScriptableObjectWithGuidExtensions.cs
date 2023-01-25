using System.Collections.Generic;
using System.Linq;

namespace Utility
{
    public static class ScriptableObjectWithGuidExtensions
    {
        public static T GetOneWithGuid<T>(this IEnumerable<T> source, string guid)
            where T: ScriptableObjectWithGuid
        {
            return source.FirstOrDefault(x => x.Guid == guid);
        }
    }
}