# Student Management System

## Thông tin cá nhân
- Họ và Tên: Trịnh Trần Phúc Khang
- MSSV: 23713631

## Tech Stack
- FastAPI
- React JS
- SQLite

## Tools
- ChatGPT
- Visual Studio Code

## Log (Quá trình thực hiện dự án)

### Bước 1: Khởi tạo dự án
- Tạo cấu trúc project gồm **backend (FastAPI)** và **frontend (ReactJS)**.
- Cài đặt các thư viện cần thiết như FastAPI, Uvicorn, SQLAlchemy cho backend.
- Tạo project React để xây dựng giao diện người dùng.

### Bước 2: Thiết kế cơ sở dữ liệu
- Sử dụng **SQLite** làm database.
- Thiết kế hai bảng chính:
  - **Student**: lưu thông tin sinh viên (student_id, name, birth_year, major, gpa, class_id).
  - **Class**: lưu thông tin lớp (class_id, class_name, advisor).
- Thiết lập quan hệ giữa Student và Class thông qua **class_id**.

### Bước 3: Xây dựng API Backend
- Xây dựng các API CRUD bằng FastAPI:
  - Thêm sinh viên
  - Sửa sinh viên
  - Xóa sinh viên
  - Lấy danh sách sinh viên
- Xây dựng API quản lý lớp:
  - Thêm lớp
  - Sửa lớp
  - Lấy danh sách lớp
- Thêm chức năng **tìm kiếm sinh viên theo tên**.

### Bước 4: Xây dựng giao diện React
- Tạo các component chính:
  - **StudentForm**: thêm và chỉnh sửa sinh viên.
  - **StudentTable**: hiển thị danh sách sinh viên.
  - **ClassForm**: thêm và chỉnh sửa lớp.
  - **ClassTable**: hiển thị danh sách lớp.
- Kết nối frontend với backend thông qua **API fetch**.

### Bước 5: Thêm các chức năng mở rộng
- Thêm chức năng **export danh sách sinh viên ra file CSV**.
- Thêm chức năng **export danh sách lớp ra CSV**.
- Xây dựng **Dashboard thống kê** gồm:
  - Tổng số sinh viên
  - GPA trung bình
  - Số lượng sinh viên theo ngành.

### Bước 6: Kiểm tra và sửa lỗi
- Sửa lỗi tìm kiếm tên sinh viên (không phân biệt chữ hoa và chữ thường).
- Sửa lỗi export CSV bị **Internal Server Error**.
- Kiểm tra và xử lý lỗi khi **class_id không tồn tại** khi thêm hoặc sửa sinh viên.
- Sửa lỗi hiển thị dữ liệu trong **Dashboard**.

### Bước 7: Hoàn thiện dự án
- Tối ưu lại code backend và frontend.
- Kiểm tra toàn bộ chức năng:
  - Thêm / sửa sinh viên
  - Quản lý lớp
  - Tìm kiếm sinh viên
  - Export CSV
  - Dashboard thống kê.
- Hoàn thiện README và chuẩn bị nộp dự án.