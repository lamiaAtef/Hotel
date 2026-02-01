import { Box, Button, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import type { CustomPaginationProps } from "../type";



export default function CustomPagination({
  page,
  rowsPerPage,
  rowCount,
  onPageChange,
  siblingCount = 1,
}: CustomPaginationProps) {
  const totalPages = Math.ceil(rowCount / rowsPerPage);
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  const firstPage = 0;
  const lastPage = totalPages - 1;

  const startPage = Math.max(page - siblingCount, firstPage + 1);
  const endPage = Math.min(page + siblingCount, lastPage - 1);

  // أول صفحة
  pages.push(firstPage);

  // نقاط قبل الوسطية
  if (startPage > firstPage + 1) pages.push("...");

  // الصفحات الوسطية
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // نقاط بعد الوسطية
  if (endPage < lastPage - 1) pages.push("...");

  // آخر صفحة
  if (lastPage !== firstPage) pages.push(lastPage);

  // إزالة أي تكرار (لو صار لأي سبب)
  const finalPages = Array.from(new Set(pages));

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={3}>
      <IconButton disabled={page === 0} onClick={() => onPageChange(page - 1)}>
        <KeyboardArrowLeft />
      </IconButton>

      {finalPages.map((p, idx) =>
        p === "..." ? (
          <Typography key={idx} sx={{ px: 1 }}>
            ...
          </Typography>
        ) : (
          <Button
            key={p}
            variant={p === page ? "contained" : "outlined"}
            size="small"
            onClick={() => onPageChange(p)}
            sx={{ minWidth: 36 }}
          >
            {p + 1}
          </Button>
        )
      )}

      <IconButton
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}