using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos;

public class BoardDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public List<string> ColumnIds { get; set; }
}
